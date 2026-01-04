"use client"

import Link from "next/link"
import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client/react"
import { ChevronRight, Lock, Plus, Minus, Copy, Upload, Check, Loader, ArrowDownToLine } from "lucide-react"

// Components
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// API
import {
  MUTATION_DEPOSIT_SHOP_BALANCE,
  MUTATION_WITHDRAW_SHOP_BALANCE,
  QUERY_SHOP_CREDIT_TRANSACTIONS,
  QUERY_GET_SHOP_CREDIT_BALANCE
} from "@/app/api/shop/credit"
import { useToast } from "@/lib/toast"

// Types
import {
  CloudinaryResponse,
  ShopDepositBalanceResponse,
  ShopWithdrawBalanceResponse,
  ShopTransactionHistoryResponse,
  ShopWalletBalanceResponse
} from "@/types/credits"

export default function ShopCreditPage() {
  // Deposit Modal State
  const [amount, setAmount] = useState(0)
  const [cryptoType, setCryptoType] = useState("ERC20")
  const [transactionId, setTransactionId] = useState("")
  const [voucherFile, setVoucherFile] = useState<File | null>(null)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [isDepositLoading, setIsDepositLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  // Withdraw Modal State
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [withdrawCryptoType, setWithdrawCryptoType] = useState("ERC20")
  const [withdrawAddress, setWithdrawAddress] = useState("")
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false)

  // Filter & Pagination State
  const [filterIdentifier, setFilterIdentifier] = useState<string>("")
  const [filterCoinType, setFilterCoinType] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageLimit = 10

  const { successMessage, errorMessage } = useToast()

  // Mutations
  const [depositBalance] = useMutation<ShopDepositBalanceResponse>(MUTATION_DEPOSIT_SHOP_BALANCE)
  const [withdrawBalance] = useMutation<ShopWithdrawBalanceResponse>(MUTATION_WITHDRAW_SHOP_BALANCE)

  // Fetch wallet balance
  const { data: walletData, loading: walletLoading, refetch: refetchWallet } = useQuery<ShopWalletBalanceResponse>(
    QUERY_GET_SHOP_CREDIT_BALANCE
  )

  const wallet = walletData?.getShopWallet?.data

  // Fetch transaction history
  // Build where filter
  const whereFilter: Record<string, string> = {}
  if (filterIdentifier) whereFilter.identifier = filterIdentifier
  if (filterCoinType) whereFilter.coin_type = filterCoinType

  const { data: transactionsData, loading: transactionsLoading, refetch: refetchTransactions } = useQuery<ShopTransactionHistoryResponse>(
    QUERY_SHOP_CREDIT_TRANSACTIONS,
    {
      variables: {
        page: currentPage,
        limit: pageLimit,
        sortedBy: "created_at_DESC",
        where: Object.keys(whereFilter).length > 0 ? whereFilter : undefined,
      },
      fetchPolicy: "cache-and-network",
    }
  )

  const transactions = transactionsData?.shopGetTransactionHistories?.data || []
  const totalTransactions = transactionsData?.shopGetTransactionHistories?.total || 0
  const totalPages = Math.ceil(totalTransactions / pageLimit)

  const cryptoAddresses = {
    ERC20: "0x64595371ef111e9991c10A9C92262d13FF7C4BbA",
    TRC20: "TUmVmsJGN58H5ntcvqrx5SdV8hUiRQMP5D",
    BTC: "bc1p62l8tycjh7f2e5zrn06hkmy7mj9acme0sg75p5thcc3gltwqr6msy0m9nn",
  }

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
      setIsDepositLoading(true)
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

      if (res?.data?.shopRechargeBalance.success) {
        // Reset form
        setAmount(0)
        setTransactionId("")
        setVoucherFile(null)
        setIsDepositModalOpen(false)

        successMessage({
          message: "Deposit request submitted successfully!",
          duration: 3000,
        })

        // Refetch transactions and wallet balance
        refetchTransactions()
        refetchWallet()
      } else {
        errorMessage({
          message: res?.data?.shopRechargeBalance?.error?.details || "Deposit failed",
          duration: 3000,
        })
      }
    } catch (error) {
      errorMessage({
        message: "Unexpected error happened!",
        duration: 3000,
      })
    } finally {
      setIsDepositLoading(false)
    }
  }

  const handleWithdraw = async () => {
    if (!withdrawAddress) {
      errorMessage({
        message: "Please enter your wallet address",
        duration: 3000,
      })
      return
    }

    if (withdrawAmount <= 0) {
      errorMessage({
        message: "Please enter a valid amount",
        duration: 3000,
      })
      return
    }

    if (withdrawAmount > (wallet?.total_withdraw_able_balance || 0)) {
      errorMessage({
        message: "Insufficient withdrawable balance",
        duration: 3000,
      })
      return
    }

    try {
      setIsWithdrawLoading(true)

      const res = await withdrawBalance({
        variables: {
          data: {
            coin_type: withdrawCryptoType,
            amount_withdraw: withdrawAmount,
            account_number: withdrawAddress,
          },
        },
      })

      if (res?.data?.shopWithdrawBalance.success) {
        setWithdrawAmount(0)
        setWithdrawAddress("")
        setIsWithdrawModalOpen(false)

        successMessage({
          message: "Withdrawal request submitted successfully!",
          duration: 3000,
        })

        refetchTransactions()
        refetchWallet()
      } else {
        errorMessage({
          message: res?.data?.shopWithdrawBalance?.error?.details || "Withdrawal failed",
          duration: 3000,
        })
      }
    } catch (error) {
      errorMessage({
        message: "Unexpected error happened!",
        duration: 3000,
      })
    } finally {
      setIsWithdrawLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="sm:border-b bg-white">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/shop-dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Credit balance</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="w-auto bg-green-500 hover:bg-green-600 text-white text-xs"
              onClick={() => setIsDepositModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Deposit
            </Button>
            <Button
              size="sm"
              className="w-auto bg-orange-500 hover:bg-orange-600 text-white text-xs"
              onClick={() => setIsWithdrawModalOpen(true)}
            >
              <ArrowDownToLine className="h-4 w-4" />
              Withdraw
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex items-center justify-start gap-4">
            <h1 className="text-lg font-bold text-gray-900">Shop Credit Balance</h1>
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
            <span className="text-sm">Manage your shop wallet balance for receiving payments and withdrawals.</span>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-6">
            <div className="mb-8">
              <p className="mb-2 text-sm text-gray-600">Total Balance (USD):</p>
              <p className="text-3xl font-bold text-gray-900">
                {walletLoading ? "..." : `$${(wallet?.total_balance || 0).toFixed(2)}`}
              </p>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm text-gray-600">Pending (USD):</p>
              <p className="text-3xl font-bold text-gray-900">
                {walletLoading ? "..." : `$${(wallet?.total_frozen_balance || 0).toFixed(2)}`}
              </p>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm text-gray-600">Withdrawable (USD):</p>
              <p className="text-3xl font-bold text-green-600">
                {walletLoading ? "..." : `$${(wallet?.total_withdraw_able_balance || 0).toFixed(2)}`}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-md font-bold text-gray-900">Transaction History:</h2>
              <div className="flex items-center gap-2">
                <Select value={filterIdentifier || "all"} onValueChange={(val) => { setFilterIdentifier(val === "all" ? "" : val); setCurrentPage(1); }}>
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="RECHARGE">Deposit</SelectItem>
                    <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterCoinType || "all"} onValueChange={(val) => { setFilterCoinType(val === "all" ? "" : val); setCurrentPage(1); }}>
                  <SelectTrigger className="w-28 h-8 text-xs">
                    <SelectValue placeholder="All Coins" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Coins</SelectItem>
                    <SelectItem value="ERC20">ERC20</SelectItem>
                    <SelectItem value="TRC20">TRC20</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

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
                      {(currentPage - 1) * pageLimit + index + 1}
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
                <p className="text-gray-900">No transaction history yet</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="text-xs"
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 text-xs ${currentPage === pageNum ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="text-xs"
                >
                  Next
                </Button>

                <span className="text-xs text-gray-500 ml-2">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      <Dialog open={isDepositModalOpen} onOpenChange={setIsDepositModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Top-Up Your Wallet Balance:</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="w-1/2 space-y-2">
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
              disabled={!transactionId || amount <= 0 || !voucherFile || isDepositLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              {isDepositLoading ? <Loader className="h-5 w-5 animate-spin" /> : null}
              {isDepositLoading ? "Processing..." : "Deposit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Modal */}
      <Dialog open={isWithdrawModalOpen} onOpenChange={setIsWithdrawModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Withdraw Your Balance:</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Available Balance Info */}
            <div className="rounded-lg border border-green-200 p-4 bg-green-50">
              <p className="text-sm text-gray-600">Available for withdrawal:</p>
              <p className="text-2xl font-bold text-green-600">
                ${(wallet?.total_withdraw_able_balance || 0).toFixed(2)}
              </p>
            </div>

            {/* Select Type */}
            <div className="w-1/2 space-y-2">
              <Label htmlFor="withdraw-crypto-type" className="text-sm font-medium">
                Select type
              </Label>
              <Select value={withdrawCryptoType} onValueChange={setWithdrawCryptoType}>
                <SelectTrigger id="withdraw-crypto-type">
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
              <Label htmlFor="withdraw-amount" className="text-sm font-medium">
                Amount
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setWithdrawAmount(Math.max(0, withdrawAmount - 10))}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="withdraw-amount"
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="text-center"
                  min="0"
                  max={wallet?.total_withdraw_able_balance || 0}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setWithdrawAmount(Math.min(withdrawAmount + 10, wallet?.total_withdraw_able_balance || 0))}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                type="button"
                variant="link"
                size="sm"
                className="text-orange-500 p-0 h-auto"
                onClick={() => setWithdrawAmount(wallet?.total_withdraw_able_balance || 0)}
              >
                Withdraw all
              </Button>
            </div>

            {/* Wallet Address */}
            <div className="space-y-2">
              <Label htmlFor="withdraw-address" className="text-sm font-medium">
                Your Wallet Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="withdraw-address"
                type="text"
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                placeholder="Enter your wallet address"
                required
              />
            </div>

            {/* Withdraw Information */}
            <div className="rounded-lg border border-gray-200 p-4 space-y-3 bg-gray-50">
              <h4 className="text-sm font-semibold">Withdrawal Summary</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Withdraw Amount:</span>
                  <span className="font-medium">${withdrawAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Network:</span>
                  <span className="font-medium">{withdrawCryptoType}</span>
                </div>

                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-600">You will receive:</span>
                  <span className="font-bold text-green-600">${withdrawAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleWithdraw}
              disabled={!withdrawAddress || withdrawAmount <= 0 || isWithdrawLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isDepositLoading ? <Loader className="h-5 w-5 animate-spin" /> : null}
              {isWithdrawLoading ? "Processing..." : "Withdraw"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
