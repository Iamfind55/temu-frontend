"use client";

import { Search, ShoppingCart, User, Globe } from "lucide-react";

export function Header() {
  return (
    <header className="w-full">
      {/* Top Banner */}
      <div className="bg-neutral-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
              </svg>
              <span className="font-medium">No import charges</span>
              <span className="text-neutral-400 ml-1">For local warehouse items</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
              </svg>
              <span className="font-medium">Delivery guarantee</span>
              <span className="text-neutral-400 ml-1">Refund for any issues</span>
            </div>
            <button className="flex items-center gap-2 hover:text-temu-orange transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"/>
              </svg>
              <span className="font-medium">Get the Temu App</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-gradient-to-r from-temu-orange via-temu-orange-light to-temu-orange py-3 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <div className="text-white font-black text-3xl tracking-tight">
              <span className="bg-white text-temu-orange px-3 py-1 rounded-lg shadow-md">temu</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-4 text-white text-sm font-medium">
              <a href="#" className="flex items-center gap-1 hover:text-white/90 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Best-Selling Items
              </a>
              <a href="#" className="flex items-center gap-1 hover:text-white/90 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                5-Star Rated
              </a>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                Categories
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                </svg>
              </button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="breast forms silicone"
                className="w-full pl-4 pr-12 py-2.5 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-white shadow-md"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-temu-orange hover:bg-temu-orange-dark text-white p-2 rounded-full transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 text-white">
            <button className="flex flex-col items-center gap-0.5 hover:text-white/90 transition-colors">
              <User className="w-5 h-5" />
              <span className="text-xs font-medium">Orders</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 hover:text-white/90 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
              </svg>
              <span className="text-xs font-medium">Support</span>
            </button>
            <button className="flex items-center gap-1 hover:text-white/90 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium">English</span>
            </button>
            <button className="relative hover:text-white/90 transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
