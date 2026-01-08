"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { cn } from "@/lib/utils"
import { useQuery, useMutation, useLazyQuery, useSubscription } from "@apollo/client/react"
import { MessageCircle, X, Send, Smile, ArrowLeft, Loader2, Image as ImageIcon, Loader, Check, CheckCheck } from "lucide-react"
import { useShopStore } from "@/store/shop-store"
import { uploadToCloudinary } from "@/lib/cloudinary-upload"
import {
   QUERY_GET_CONVERSATION,
   QUERY_GET_CHAT_MESSAGES,
   MUTATION_CREATE_CONVERSATION,
   MUTATION_SEND_MESSAGES,
   MUTATION_MARK_MESSAGES_READ,
   MESSAGE_SUBSCRIPTION,
} from "@/app/api/shop/chat"

interface ChatMessage {
   id: string
   conversation_id: string
   sender_id: string
   reply_to_id: string | null
   replyTo: {
      id: string
      attachment: string | null
      text: string
   } | null
   text: string
   sender_type: "SHOP" | "ADMIN"
   attachment: string | null
   is_read: boolean
   is_deleted: boolean
   created_at: string
   type: string
}

interface ConversationResponse {
   getShopConversation: {
      success: boolean
      data: {
         id: string
      } | null
      error: {
         message: string
         code: string
         details: string | null
      } | null
   }
}

interface MessagesResponse {
   getMessages: {
      success: boolean
      total: number
      data: ChatMessage[]
      error: {
         message: string
         code: string
         details: string | null
      } | null
   }
}

interface CreateConversationResponse {
   createConversation: {
      success: boolean
      error: {
         message: string
         code: string
         details: string | null
      } | null
   }
}

interface SendMessageResponse {
   sendMessage: {
      success: boolean
      error: {
         message: string
         code: string
         details: string | null
      } | null
   }
}

// Common emojis for the picker
const EMOJI_LIST = [
   "😀", "😃", "😄", "😁", "😅", "😂", "🤣", "😊",
   "😇", "🙂", "😉", "😍", "🥰", "😘", "😋", "😎",
   "🤔", "🤗", "🤩", "🥳", "😏", "😢", "😭", "😤",
   "😡", "🤯", "😱", "😴", "🤮", "🤧", "😷", "🤒",
   "👍", "👎", "👏", "🙌", "🤝", "👋", "✌️", "🤞",
   "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "💔",
   "⭐", "🌟", "✨", "💫", "🔥", "💯", "✅", "❌",
   "📦", "🛒", "💰", "💵", "🎁", "📱", "💻", "📧",
]

export function ShopLiveChat() {
   const { shop } = useShopStore()
   const [isOpen, setIsOpen] = useState(false)
   const [isMinimized, setIsMinimized] = useState(false)
   const [message, setMessage] = useState("")
   const [conversationId, setConversationId] = useState<string | null>(null)
   const [isSending, setIsSending] = useState(false)
   const [isUploading, setIsUploading] = useState(false)
   const [selectedImage, setSelectedImage] = useState<File | null>(null)
   const [imagePreview, setImagePreview] = useState<string | null>(null)
   const [showEmojiPicker, setShowEmojiPicker] = useState(false)
   const messagesEndRef = useRef<HTMLDivElement>(null)
   const fileInputRef = useRef<HTMLInputElement>(null)
   const inputRef = useRef<HTMLInputElement>(null)
   const isMarkingReadRef = useRef(false)
   const prevMessageCountRef = useRef(0)

   // Query conversation
   const { data: conversationData, loading: conversationLoading, refetch: refetchConversation } = useQuery<ConversationResponse>(
      QUERY_GET_CONVERSATION,
      {
         skip: !isOpen || !shop?.id,
         fetchPolicy: "network-only",
      }
   )

   // Lazy query for messages
   const [fetchMessages, { data: messagesData, loading: messagesLoading, refetch: refetchMessages }] =
      useLazyQuery<MessagesResponse>(QUERY_GET_CHAT_MESSAGES, {
         fetchPolicy: "network-only",
      })

   // Mutations
   const [createConversation] = useMutation<CreateConversationResponse>(MUTATION_CREATE_CONVERSATION)
   const [sendMessage] = useMutation<SendMessageResponse>(MUTATION_SEND_MESSAGES)
   const [markMessagesRead] = useMutation(MUTATION_MARK_MESSAGES_READ)

   // State to store subscription messages
   const [subscriptionMessages, setSubscriptionMessages] = useState<ChatMessage[]>([])

   // Subscription for real-time messages
   const { data: subscriptionData } = useSubscription<{ sendMessage: ChatMessage }>(
      MESSAGE_SUBSCRIPTION,
      {
         variables: { conversationId: conversationId },
         skip: !conversationId || !isOpen,
      }
   )

   // Handle new message from subscription
   useEffect(() => {
      if (subscriptionData?.sendMessage) {
         const newMessage = subscriptionData.sendMessage
         // Check if message already exists to avoid duplicates
         setSubscriptionMessages((prev) => {
            const exists = prev.some((msg) => msg.id === newMessage.id)
            if (exists) return prev
            return [...prev, newMessage]
         })
      }
   }, [subscriptionData])

   // Reset subscription messages when conversation changes or chat closes
   useEffect(() => {
      if (!isOpen) {
         setSubscriptionMessages([])
      }
   }, [isOpen])

   // Set conversation ID when data is fetched
   useEffect(() => {
      if (conversationData?.getShopConversation?.success && conversationData.getShopConversation.data) {
         setConversationId(conversationData.getShopConversation.data.id)
      }
   }, [conversationData])

   // Fetch messages when conversation ID is available
   useEffect(() => {
      if (conversationId) {
         fetchMessages({
            variables: {
               page: 1,
               limit: 100,
               sortedBy: "created_at_ASC",
               where: { conversation_id: conversationId },
            },
         })
      }
   }, [conversationId, fetchMessages])

   // Scroll to bottom when new messages arrive
   useEffect(() => {
      const queryMsgs = messagesData?.getMessages?.data || []
      const totalCount = queryMsgs.length + subscriptionMessages.length

      // Only scroll if message count increased (new message arrived)
      if (totalCount > prevMessageCountRef.current) {
         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
      prevMessageCountRef.current = totalCount
   }, [messagesData?.getMessages?.data, subscriptionMessages])

   // Mark messages as read when chat is open and there are unread ADMIN messages
   useEffect(() => {
      // Skip if already marking or chat is closed or no conversation
      if (!isOpen || !conversationId || isMarkingReadRef.current) return

      const queryMsgs = messagesData?.getMessages?.data || []
      const allMessages = [...queryMsgs, ...subscriptionMessages]
      const hasUnreadAdminMessages = allMessages.some(
         (msg) => msg.sender_type === "ADMIN" && !msg.is_read
      )

      if (hasUnreadAdminMessages) {
         isMarkingReadRef.current = true
         markMessagesRead({
            variables: { conversationId: conversationId },
         })
            .then(() => {
               // Small delay before allowing next mark read call
               setTimeout(() => {
                  isMarkingReadRef.current = false
               }, 1000)
            })
            .catch(() => {
               isMarkingReadRef.current = false
            })
      }
   }, [isOpen, conversationId, messagesData?.getMessages?.data, subscriptionMessages, markMessagesRead])

   // Handle image selection
   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
         setSelectedImage(file)
         // Use URL.createObjectURL for better mobile compatibility
         const previewUrl = URL.createObjectURL(file)
         setImagePreview(previewUrl)
      }
   }

   // Remove selected image
   const removeSelectedImage = () => {
      // Revoke the object URL to free memory
      if (imagePreview) {
         URL.revokeObjectURL(imagePreview)
      }
      setSelectedImage(null)
      setImagePreview(null)
      if (fileInputRef.current) {
         fileInputRef.current.value = ""
      }
   }

   // Handle emoji selection
   const handleEmojiSelect = (emoji: string) => {
      setMessage((prev) => prev + emoji)
      setShowEmojiPicker(false)
      inputRef.current?.focus()
   }

   // Handle send message
   const handleSendMessage = async () => {
      if ((!message.trim() && !selectedImage) || isSending) return

      setIsSending(true)

      try {
         let currentConversationId = conversationId

         // If no conversation exists, create one first
         if (!currentConversationId) {
            const title = `${shop?.id} - ${shop?.store_name}`
            const createResult = await createConversation({
               variables: {
                  data: { title },
               },
            })

            if (!createResult.data?.createConversation?.success) {
               console.error("Failed to create conversation")
               setIsSending(false)
               return
            }

            // Refetch conversation to get the new ID
            const { data: refetchedData } = await refetchConversation()
            if (refetchedData?.getShopConversation?.success && refetchedData.getShopConversation.data) {
               currentConversationId = refetchedData.getShopConversation.data.id
               setConversationId(currentConversationId)
            } else {
               console.error("Failed to get conversation after creation")
               setIsSending(false)
               return
            }
         }

         // Upload image to Cloudinary if selected
         let attachmentUrl: string | null = null
         if (selectedImage) {
            setIsUploading(true)
            const uploadResult = await uploadToCloudinary(selectedImage, "chat-attachments")
            setIsUploading(false)

            if (uploadResult.success && uploadResult.url) {
               attachmentUrl = uploadResult.url
            } else {
               console.error("Failed to upload image:", uploadResult.error)
               setIsSending(false)
               return
            }
         }

         // Send message
         const sendResult = await sendMessage({
            variables: {
               data: {
                  conversation_id: currentConversationId,
                  text: message.trim() || null,
                  attachment: attachmentUrl,
               },
            },
         })

         if (sendResult.data?.sendMessage?.success) {
            setMessage("")
            removeSelectedImage()
            // Refetch messages
            if (refetchMessages) {
               refetchMessages()
            }
         } else {
            console.error("Failed to send message")
         }
      } catch (error) {
         console.error("Error sending message:", error)
      } finally {
         setIsSending(false)
      }
   }

   const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault()
         handleSendMessage()
      }
   }

   // Format timestamp
   const formatTime = (dateString: string) => {
      const date = new Date(dateString)
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
   }

   // Combine query messages with subscription messages (avoid duplicates) - memoized for performance
   const messages = useMemo(() => {
      const queryMessages = messagesData?.getMessages?.data || []
      const combinedMessages = [...queryMessages]

      // Add subscription messages that don't exist in query messages
      subscriptionMessages.forEach((subMsg) => {
         const exists = combinedMessages.some((msg) => msg.id === subMsg.id)
         if (!exists) {
            combinedMessages.push(subMsg)
         }
      })

      // Sort by created_at
      return combinedMessages.sort(
         (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
   }, [messagesData?.getMessages?.data, subscriptionMessages])

   const isLoading = conversationLoading || messagesLoading

   return (
      <>
         {/* Floating Chat Button */}
         {!isOpen && (
            <button
               onClick={() => setIsOpen(true)}
               className="fixed bottom-20 sm:bottom-6 right-6 z-50 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
               <MessageCircle className="h-4 w-4 animate-bounce" />
               <span className="font-medium">Chat</span>
            </button>
         )}

         {/* Chat Modal */}
         {isOpen && (
            <div
               className={cn(
                  "fixed z-50 bg-white overflow-hidden transition-all duration-300",
                  // Mobile: full screen
                  "inset-0 rounded-none",
                  // Desktop: floating modal
                  "sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:rounded-xl sm:shadow-2xl",
                  isMinimized ? "sm:h-[60px]" : "sm:h-[500px]"
               )}
            >
               {/* Header */}
               <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
                  <div className="flex items-start justify-start gap-1">
                     <div className="flex items-center gap-3">
                        <button
                           onClick={() => setIsOpen(false)}
                           className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                           <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </button>
                     </div>

                     <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-white border rounded-full px-3 py-1.5">
                           <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                              <MessageCircle className="h-3 w-3 text-white" />
                           </div>
                           <span className="text-sm font-semibold text-gray-800">Temu Support</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-1">
                     <button
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                     >
                        <X className="h-4 w-4 text-gray-600" />
                     </button>
                  </div>
               </div>

               {!isMinimized && (
                  <div className="flex flex-col h-[calc(100%-60px)] sm:h-[440px]">
                     {/* Messages Area */}
                     <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {isLoading ? (
                           <div className="flex items-center justify-center h-full">
                              <Loader className="h-8 w-8 animate-spin text-orange-500" />
                           </div>
                        ) : messages.length === 0 ? (
                           <div className="flex flex-col items-center justify-center h-full text-gray-500">
                              <MessageCircle className="h-12 w-12 mb-2 text-gray-300" />
                              <p className="text-sm">No messages yet</p>
                              <p className="text-xs">Start a conversation with support</p>
                           </div>
                        ) : (
                           <>
                              {messages.map((msg: ChatMessage) => (
                                 <div key={msg.id}>
                                    {msg.sender_type === "ADMIN" ? (
                                       <div className="flex flex-col gap-1">
                                          <span className="text-xs text-gray-500 ml-1">
                                             Temu Support {formatTime(msg.created_at)}
                                          </span>
                                          <div className="flex items-start gap-2">
                                             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                                <MessageCircle className="h-4 w-4 text-white" />
                                             </div>
                                             <div className="bg-white border rounded-2xl rounded-tl-sm px-4 py-3 max-w-[280px] shadow-sm">
                                                {msg.attachment && (
                                                   <img
                                                      src={msg.attachment}
                                                      alt="Attachment"
                                                      className="rounded-lg mb-2 max-w-full"
                                                   />
                                                )}
                                                {msg.text && (
                                                   <p className="text-sm text-gray-700 leading-relaxed">
                                                      {msg.text}
                                                   </p>
                                                )}
                                             </div>
                                          </div>
                                       </div>
                                    ) : (
                                       <div className="flex flex-col items-end gap-1">
                                          <div className="bg-amber-400 text-gray-900 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[280px]">
                                             {msg.attachment && (
                                                <img
                                                   src={msg.attachment}
                                                   alt="Attachment"
                                                   className="rounded-lg mb-2 max-w-full"
                                                />
                                             )}
                                             {msg.text && <p className="text-sm">{msg.text}</p>}
                                          </div>
                                          <div className="flex items-center gap-1 text-xs text-gray-500">
                                             <span>{formatTime(msg.created_at)}</span>
                                             {msg.is_read ? (
                                                <CheckCheck className="h-4 w-4 text-blue-500" />
                                             ) : (
                                                <CheckCheck className="h-4 w-4 text-gray-400" />
                                             )}
                                          </div>
                                       </div>
                                    )}
                                 </div>
                              ))}
                              <div ref={messagesEndRef} />
                           </>
                        )}
                     </div>

                     {/* Image Preview */}
                     {imagePreview && (
                        <div className="px-3 py-2 border-t bg-gray-50">
                           <div className="relative inline-block">
                              <img
                                 src={imagePreview}
                                 alt="Preview"
                                 className="h-16 w-16 object-cover rounded-lg"
                              />
                              <button
                                 onClick={removeSelectedImage}
                                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                              >
                                 <X className="h-3 w-3" />
                              </button>
                           </div>
                        </div>
                     )}

                     {/* Emoji Picker */}
                     {showEmojiPicker && (
                        <div className="border-t bg-white p-2">
                           <div className="grid grid-cols-8 gap-1 max-h-[150px] overflow-y-auto">
                              {EMOJI_LIST.map((emoji, index) => (
                                 <button
                                    key={index}
                                    onClick={() => handleEmojiSelect(emoji)}
                                    className="p-1.5 hover:bg-gray-100 rounded text-xl transition-colors"
                                 >
                                    {emoji}
                                 </button>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Input Area */}
                     <div className="border-t bg-white p-3">
                        <div className="flex items-center gap-2">
                           <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleImageSelect}
                              accept="image/*"
                              className="hidden"
                           />
                           <button
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isUploading}
                              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                           >
                              <ImageIcon className="h-5 w-5 text-gray-600" />
                           </button>
                           <div className="flex-1 relative">
                              <input
                                 ref={inputRef}
                                 type="text"
                                 value={message}
                                 onChange={(e) => setMessage(e.target.value)}
                                 onKeyPress={handleKeyPress}
                                 placeholder="Write a message..."
                                 disabled={isSending}
                                 className="w-full px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 pr-20"
                              />
                              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                 <button
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className={cn(
                                       "p-1.5 rounded-full transition-colors",
                                       showEmojiPicker ? "bg-gray-200" : "hover:bg-gray-200"
                                    )}
                                 >
                                    <Smile className="h-5 w-5 text-gray-500" />
                                 </button>
                                 <button
                                    onClick={handleSendMessage}
                                    disabled={(!message.trim() && !selectedImage) || isSending}
                                    className={cn(
                                       "p-1.5 rounded-full transition-colors",
                                       (message.trim() || selectedImage) && !isSending
                                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                                          : "bg-gray-200 text-gray-400"
                                    )}
                                 >
                                    {isSending ? (
                                       <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                       <Send className="h-4 w-4" />
                                    )}
                                 </button>
                              </div>
                           </div>
                        </div>

                        {/* Powered by */}
                        <div className="text-center mt-2">
                           <span className="text-xs text-gray-400">
                              Powered by{" "}
                              <span className="font-semibold text-orange-500">Temu</span>
                           </span>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         )}
      </>
   )
}
