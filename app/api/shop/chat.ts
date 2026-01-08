import { gql } from "@apollo/client";

export const QUERY_GET_CONVERSATION = gql`
  query GetShopConversation {
    getShopConversation {
      success
      data {
        id
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_CREATE_CONVERSATION = gql`
  mutation CreateConversation($data: CreateConversationInput!) {
    createConversation(data: $data) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_SEND_MESSAGES = gql`
  mutation SendMessage($data: SendMessageInput!) {
    sendMessage(data: $data) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_MARK_MESSAGES_READ = gql`
  mutation MarkMessageAsRead($conversationId: ID!) {
    markMessageAsRead(conversationId: $conversationId) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_GET_CHAT_MESSAGES = gql`
  query GetMessages(
    $limit: Int
    $page: Int
    $sortedBy: BaseOrderByInput
    $where: MessageWhereInput!
  ) {
    getMessages(
      limit: $limit
      page: $page
      sortedBy: $sortedBy
      where: $where
    ) {
      success
      total
      data {
        id
        conversation_id
        sender_id
        reply_to_id
        replyTo {
          id
          attachment
          text
        }
        text
        sender_type
        attachment
        is_read
        is_deleted
        created_at
        type
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription SendMessage($conversationId: ID!) {
    sendMessage(conversationId: $conversationId) {
      id
      conversation_id
      sender_id
      reply_to_id
      replyTo {
        id
        attachment
        text
      }
      text
      sender_type
      attachment
      is_read
      is_deleted
      created_at
      type
    }
  }
`;
