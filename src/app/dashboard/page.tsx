"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, User, MapPin, CreditCard, Heart, Settings, LogOut, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const orders = [
  {
    id: "ORD-2024-001234",
    date: "Jan 15, 2024",
    status: "Delivered",
    total: "$89.97",
    items: 3,
    emoji: "📦",
    statusColor: "text-temu-green",
  },
  {
    id: "ORD-2024-001189",
    date: "Jan 10, 2024",
    status: "In Transit",
    total: "$45.99",
    items: 2,
    emoji: "🚚",
    statusColor: "text-blue-600",
  },
  {
    id: "ORD-2024-001056",
    date: "Dec 28, 2023",
    status: "Processing",
    total: "$124.50",
    items: 5,
    emoji: "⏳",
    statusColor: "text-orange-600",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black mb-8">My Account</h1>

        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="col-span-1">
            <Card className="p-6">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b">
                <div className="w-20 h-20 bg-gradient-to-br from-temu-orange to-temu-orange-dark rounded-full mx-auto mb-3 flex items-center justify-center text-white text-3xl font-black">
                  JD
                </div>
                <h3 className="font-bold text-lg">John Doe</h3>
                <p className="text-sm text-gray-600">john.doe@email.com</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "orders" ? "bg-orange-50 text-temu-orange font-medium" : "hover:bg-gray-50"
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span>My Orders</span>
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "profile" ? "bg-orange-50 text-temu-orange font-medium" : "hover:bg-gray-50"
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "addresses" ? "bg-orange-50 text-temu-orange font-medium" : "hover:bg-gray-50"
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span>Addresses</span>
                </button>

                <button
                  onClick={() => setActiveTab("payment")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "payment" ? "bg-orange-50 text-temu-orange font-medium" : "hover:bg-gray-50"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Methods</span>
                </button>

                <Link href="/wishlist">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </button>
                </Link>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "settings" ? "bg-orange-50 text-temu-orange font-medium" : "hover:bg-gray-50"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors mt-4">
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-3">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black">My Orders</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="text-6xl">{order.emoji}</div>
                          <div>
                            <div className="font-bold text-lg mb-1">Order #{order.id}</div>
                            <div className="flex gap-4 text-sm text-gray-600">
                              <span>{order.date}</span>
                              <span>•</span>
                              <span>{order.items} items</span>
                              <span>•</span>
                              <span className={`font-medium ${order.statusColor}`}>{order.status}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="text-sm text-gray-600 mb-1">Total</div>
                            <div className="text-2xl font-black text-temu-orange">{order.total}</div>
                          </div>
                          <Link href={`/orders/${order.id}`}>
                            <Button variant="outline" size="sm">
                              Track Order
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-black mb-6">Profile Information</h2>

                <Card className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue="john.doe@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Date of Birth</label>
                      <input
                        type="date"
                        defaultValue="1990-01-01"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" size="lg">Save Changes</Button>
                      <Button type="button" variant="outline" size="lg">Cancel</Button>
                    </div>
                  </form>
                </Card>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black">Saved Addresses</h2>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add New Address
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-temu-orange" />
                        <span className="font-bold">Home</span>
                      </div>
                      <span className="text-xs bg-temu-green text-white px-2 py-1 rounded-full">Default</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">John Doe</p>
                    <p className="text-sm text-gray-600 mb-3">
                      123 Main Street<br />
                      Apartment 4B<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Delete</Button>
                    </div>
                  </Card>

                  <Card className="p-6 border-dashed border-2 flex items-center justify-center cursor-pointer hover:border-temu-orange transition-colors">
                    <div className="text-center">
                      <Plus className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Add New Address</p>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payment" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black">Payment Methods</h2>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add New Card
                  </Button>
                </div>

                <div className="space-y-4">
                  <Card className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                    <div className="flex items-start justify-between mb-8">
                      <CreditCard className="w-8 h-8" />
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Default</span>
                    </div>
                    <div className="mb-6">
                      <div className="text-xl tracking-wider mb-4">•••• •••• •••• 4242</div>
                      <div className="flex justify-between text-sm">
                        <span>JOHN DOE</span>
                        <span>12/25</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/10">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/10">
                        Remove
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-black mb-6">Account Settings</h2>

                <Card className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold mb-4">Email Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className="text-sm">Order updates</span>
                          <input type="checkbox" defaultChecked className="rounded text-temu-orange focus:ring-temu-orange" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-sm">Promotional emails</span>
                          <input type="checkbox" defaultChecked className="rounded text-temu-orange focus:ring-temu-orange" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-sm">Product recommendations</span>
                          <input type="checkbox" className="rounded text-temu-orange focus:ring-temu-orange" />
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="font-bold mb-4">Privacy</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className="text-sm">Show profile to other users</span>
                          <input type="checkbox" className="rounded text-temu-orange focus:ring-temu-orange" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-sm">Allow product reviews</span>
                          <input type="checkbox" defaultChecked className="rounded text-temu-orange focus:ring-temu-orange" />
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <Button size="lg" variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
