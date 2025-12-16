"use client"

import Link from "next/link"
import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client/react"
import { ChevronRight, Lock, Plus, Minus, Copy, Upload, Check, Loader } from "lucide-react"

// components:
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// API & Utils:
import {
  MUTATION_DEPOSIT_BALANCE,
  QUERY_CUSTOMER_CREDIT_TRANSACTIONS,
  QUERY_GET_CUSTOMER_CREDIT_BALANCE
} from "@/app/api/credit"
import { useToast } from "@/lib/toast"
import { cryptoAddresses } from "./constants"
import { CloudinaryResponse, DepositBalanceResponse, TransactionHistoryResponse, WalletBalanceResponse } from "./interfaces"

export default function CreditPage() {
  const { successMessage, errorMessage } = useToast()
  const [depositBalance] = useMutation<DepositBalanceResponse>(MUTATION_DEPOSIT_BALANCE)

  // states
  const [amount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [cryptoType, setCryptoType] = useState("ERC20")
  const [transactionId, setTransactionId] = useState("")
  const [voucherFile, setVoucherFile] = useState<File | null>(null)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)


  // Fetch wallet balance
  const { data: walletData, loading: walletLoading, refetch: refetchWallet } = useQuery<WalletBalanceResponse>(
    QUERY_GET_CUSTOMER_CREDIT_BALANCE
  )

  const wallet = walletData?.getCustomerWallet?.data

  // Fetch transaction history
  const { data: transactionsData, loading: transactionsLoading, refetch: refetchTransactions } = useQuery<TransactionHistoryResponse>(
    QUERY_CUSTOMER_CREDIT_TRANSACTIONS,
    {
      variables: {
        page: 1,
        limit: 20,
        sortedBy: "created_at_DESC",
        where: null,
      },
    }
  )

  const transactions = transactionsData?.customerGetTransactionHistories?.data || []
  const accountAddress = cryptoAddresses[cryptoType as keyof typeof cryptoAddresses]
  const conversionRate = 1.00

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(accountAddress)
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 3000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVoucherFile(e.target.files[0])
    }
  }

  const handleDeposit = async () => {
    if (!voucherFile) {
      errorMessage({
        message: "Please upload a voucher",
        duration: 3000,
      })
      return
    }

    try {
      setIsLoading(true)
      let data: CloudinaryResponse = {}

      // Upload image to Cloudinary
      if (voucherFile) {
        const formData = new FormData()
        formData.append("file", voucherFile)
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_UPLOAD_PRESET || ""
        )

        const response = await fetch(
          process.env.NEXT_PUBLIC_CLOUDINARY_URL || "",
          {
            method: "POST",
            body: formData,
          }
        )
        data = (await response.json()) as CloudinaryResponse
      }

      // Call deposit mutation
      const res = await depositBalance({
        variables: {
          data: {
            coin_type: cryptoType,
            amount_recharged: amount,
            account_number: transactionId,
            image: data.secure_url || "",
          },
        },
      })

      if (res?.data?.customerRechargeBalance.success) {
        // Reset form
        setAmount(0)
        setTransactionId("")
        setVoucherFile(null)
        setIsDepositModalOpen(false)

        successMessage({
          message: "Deposit successful!",
          duration: 3000,
        })

        // Refetch transactions and wallet balance
        refetchTransactions()
        refetchWallet()
      } else {
        errorMessage({
          message: res?.data?.customerRechargeBalance?.error?.details || "Deposit failed",
          duration: 3000,
        })
      }
    } catch (error) {
      errorMessage({
        message: "Unexpected error happened!",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Credit balance</span>
          </div>

          <Button
            size="sm"
            className="w-auto bg-green-500 hover:bg-green-600 text-white text-xs"
            onClick={() => setIsDepositModalOpen(true)}
          >
            <Plus />
            Deposit
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-white p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex items-center justify-start gap-4">
            <h1 className="text-lg font-bold text-gray-900">Credit balance</h1>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Lock className="h-4 w-4" />
              <span className="font-medium">All data is safeguarded</span>
            </div>
          </div>
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-600 px-4 py-3 text-white">
            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">Be wary of messages about delivery issues claiming to be from USPS.</span>
          </div>

          <div className="flex items-center justify-start gap-6">
            <div className="mb-8">
              <p className="mb-2 text-sm text-gray-600">Total(USD):</p>
              <p className="text-3xl font-bold text-gray-900">
                {walletLoading ? "..." : `$${(wallet?.total_balance || 0).toFixed(2)}`}
              </p>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm text-gray-600">Pending(USD):</p>
              <p className="text-3xl font-bold text-gray-900">
                {walletLoading ? "..." : `$${(wallet?.total_frozen_balance || 0).toFixed(2)}`}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-md font-bold text-gray-900">Histories:</h2>

            <div className="mb-4 grid grid-cols-7 gap-4 border-b pb-3 text-sm font-medium text-gray-900">
              <div className="text-center">ID</div>
              <div>Voucher</div>
              <div>Transaction</div>
              <div>Amount</div>
              <div>Coin Type</div>
              <div>Status</div>
              <div>Date</div>
            </div>

            {transactionsLoading ? (
              <div className="py-12 text-center">
                <Loader className="mx-auto mb-4 h-6 w-6 animate-spin text-orange-500" />
                <p className="text-gray-600">Loading transactions...</p>
              </div>
            ) : transactions.length > 0 ? (
              <div className="space-y-2">
                {transactions.map((transaction, index: number) => (
                  <div key={transaction.id} className="grid grid-cols-7 gap-4 py-3 text-sm border-b last:border-0">
                    <div className="text-center text-gray-600">
                      {index + 1}
                    </div>
                    <div>
                      {transaction.payment_slip ? (
                        <a
                          href={transaction.payment_slip}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                    <div>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded font-medium ${transaction.identifier?.toLowerCase() === "recharge"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {transaction.identifier || "N/A"}
                      </span>
                    </div>
                    <div className="font-medium">
                      ${transaction.amount.toFixed(2)}
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded">
                        {transaction.coin_type}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded ${transaction.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                    <div className="text-gray-600">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* show only when transaction is empty */
              <div>
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="mb-6 text-gray-300">
                    <svg className="h-32 w-32" viewBox="0 0 120 120" fill="none">
                      <rect
                        x="20"
                        y="40"
                        width="80"
                        height="60"
                        rx="4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <path d="M40 40 L50 25 L70 25 L80 40" stroke="currentColor" strokeWidth="2" />
                      <line x1="45" y1="55" x2="65" y2="75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <line x1="65" y1="55" x2="45" y2="75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-gray-900">You don't have any activities</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900">Can't find your credit?</h3>

                  <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-gray-300 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-900">Try signing in with another account</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Google icon */}
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      {/* Apple icon */}
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                      {/* Facebook icon */}
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      {/* X (Twitter) icon */}
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>

                  <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-gray-300 hover:bg-gray-50">
                    <span className="text-sm text-gray-900">Self-service to find credit</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      <Dialog open={isDepositModalOpen} onOpenChange={setIsDepositModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Top-Up Your Wallet Balance:</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Select Type */}
            <div className="space-y-2">
              <Label htmlFor="crypto-type" className="text-sm font-medium">
                Select type
              </Label>
              <Select value={cryptoType} onValueChange={setCryptoType}>
                <SelectTrigger id="crypto-type">
                  <SelectValue placeholder="Select cryptocurrency type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ERC20">ERC20</SelectItem>
                  <SelectItem value="TRC20">TRC20</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Amount
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setAmount(Math.max(0, amount - 10))}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="text-center"
                  min="0"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setAmount(amount + 10)}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="space-y-2">
              <Label htmlFor="transaction-id" className="text-sm font-medium">
                Transaction ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="transaction-id"
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter transaction ID"
                required
              />
            </div>

            {/* Upload Voucher */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Upload deposit voucher</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="voucher-file"
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById('voucher-file')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {voucherFile ? voucherFile.name : 'Choose file'}
                </Button>
              </div>
            </div>

            {/* Deposit Information */}
            <div className="rounded-lg border border-gray-200 p-4 space-y-3 bg-gray-50">
              <h4 className="text-sm font-semibold">Deposit information</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">${amount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Conversion rate:</span>
                  <span className="font-medium">{conversionRate.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-gray-600 mb-1">Account address:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-white p-2 rounded border break-all">
                      {accountAddress}
                    </code>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleCopyAddress}
                      className="h-8 w-8 flex-shrink-0"
                    >
                      {copySuccess ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Deposit Button */}
            <Button
              onClick={handleDeposit}
              disabled={!transactionId || amount <= 0 || !voucherFile || isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isLoading ? "Processing..." : "Deposit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
