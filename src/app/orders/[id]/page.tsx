"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, Truck, MapPin, CheckCircle2, Clock, Phone, Mail } from "lucide-react";
import Link from "next/link";

const orderDetails = {
  id: "ORD-2024-001234",
  date: "January 15, 2024",
  status: "In Transit",
  estimatedDelivery: "January 20, 2024",
  trackingNumber: "1Z999AA10123456784",
  carrier: "USPS",
  total: "$89.97",

  shippingAddress: {
    name: "John Doe",
    street: "123 Main Street, Apt 4B",
    city: "New York, NY 10001",
    country: "United States",
  },

  items: [
    {
      id: 1,
      title: "Premium Wireless Bluetooth Headphones",
      price: "$29.99",
      quantity: 1,
      emoji: "🎧",
    },
    {
      id: 2,
      title: "Women's Summer Floral Dress",
      price: "$24.99",
      quantity: 2,
      emoji: "👗",
    },
  ],

  timeline: [
    {
      status: "Delivered",
      description: "Package delivered to recipient",
      date: "Jan 20, 2024",
      time: "2:30 PM",
      location: "New York, NY",
      completed: false,
      active: false,
    },
    {
      status: "Out for Delivery",
      description: "Package is out for delivery",
      date: "Jan 20, 2024",
      time: "8:00 AM",
      location: "New York, NY",
      completed: false,
      active: false,
    },
    {
      status: "In Transit",
      description: "Package is on the way",
      date: "Jan 18, 2024",
      time: "3:45 PM",
      location: "Philadelphia, PA",
      completed: true,
      active: true,
    },
    {
      status: "Departed Facility",
      description: "Package departed from facility",
      date: "Jan 17, 2024",
      time: "11:20 AM",
      location: "Baltimore, MD",
      completed: true,
      active: false,
    },
    {
      status: "Arrived at Facility",
      description: "Package arrived at sorting facility",
      date: "Jan 16, 2024",
      time: "9:15 PM",
      location: "Baltimore, MD",
      completed: true,
      active: false,
    },
    {
      status: "Shipped",
      description: "Package has been shipped",
      date: "Jan 15, 2024",
      time: "4:30 PM",
      location: "Los Angeles, CA",
      completed: true,
      active: false,
    },
    {
      status: "Order Confirmed",
      description: "Your order has been confirmed",
      date: "Jan 15, 2024",
      time: "2:00 PM",
      location: "Online",
      completed: true,
      active: false,
    },
  ],
};

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-temu-orange hover:underline text-sm mb-2 inline-block">
            ← Back to Orders
          </Link>
          <h1 className="text-3xl font-black mb-2">Track Order</h1>
          <p className="text-gray-600">Order #{orderDetails.id}</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Status Card */}
            <Card className="p-6 bg-gradient-to-r from-temu-orange to-orange-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-8 h-8" />
                  <div>
                    <div className="text-sm opacity-90">Current Status</div>
                    <div className="text-2xl font-black">{orderDetails.status}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">Estimated Delivery</div>
                  <div className="text-xl font-bold">{orderDetails.estimatedDelivery}</div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs opacity-90 mb-1">Tracking Number</div>
                  <div className="font-mono font-bold">{orderDetails.trackingNumber}</div>
                </div>
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/10">
                  Copy
                </Button>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6">
              <h2 className="text-xl font-black mb-6">Shipping Timeline</h2>

              <div className="space-y-6">
                {orderDetails.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        event.completed
                          ? event.active
                            ? "bg-temu-orange text-white"
                            : "bg-temu-green text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}>
                        {event.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      {index < orderDetails.timeline.length - 1 && (
                        <div className={`w-0.5 flex-1 mt-2 ${event.completed ? "bg-temu-green" : "bg-gray-200"}`} style={{ height: "48px" }} />
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-bold ${event.active ? "text-temu-orange" : ""}`}>
                          {event.status}
                        </h3>
                        <div className="text-right text-sm text-gray-600">
                          <div>{event.date}</div>
                          <div>{event.time}</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-6">
              <h2 className="text-xl font-black mb-6">Order Items</h2>

              <div className="space-y-4">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-4xl">{item.emoji}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                        <span className="text-lg font-black text-temu-orange">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-1 space-y-6">
            {/* Delivery Address */}
            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-temu-orange" />
                Delivery Address
              </h3>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-medium">{orderDetails.shippingAddress.name}</p>
                <p>{orderDetails.shippingAddress.street}</p>
                <p>{orderDetails.shippingAddress.city}</p>
                <p>{orderDetails.shippingAddress.country}</p>
              </div>
            </Card>

            {/* Order Summary */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">$79.97</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-temu-green">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$10.00</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-black text-temu-orange">{orderDetails.total}</span>
              </div>
            </Card>

            {/* Help Card */}
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
              <h3 className="font-bold mb-4">Need Help?</h3>
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Package className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
              </div>
            </Card>

            {/* Actions */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Download Invoice
              </Button>
              <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
