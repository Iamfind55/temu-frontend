export interface SubCategory {
  id: string;
  name: string;
  image: string;
  link: string;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: "featured",
    name: "Featured",
    subCategories: [
      {
        id: "best-sellers",
        name: "Best Sellers",
        image: "/best-sellers.png",
        link: "/landing/category/featured/best-sellers",
      },
      {
        id: "new-arrivals",
        name: "New Arrivals",
        image: "/new-arrivals-display.png",
        link: "/landing/category/featured/new-arrivals",
      },
      {
        id: "trending",
        name: "Trending Now",
        image: "/trending-topic.png",
        link: "/landing/category/featured/trending",
      },
      {
        id: "deals",
        name: "Hot Deals",
        image: "/hot-deals.jpg",
        link: "/landing/category/featured/deals",
      },
    ],
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    subCategories: [
      {
        id: "furniture",
        name: "Furniture",
        image: "/assorted-living-room-furniture.png",
        link: "/landing/category/home-kitchen/furniture",
      },
      {
        id: "bedding",
        name: "Bedding",
        image: "/cozy-bedding.png",
        link: "/landing/category/home-kitchen/bedding",
      },
      {
        id: "kitchen",
        name: "Kitchen Tools",
        image: "/assorted-kitchen-tools.png",
        link: "/landing/category/home-kitchen/kitchen",
      },
      {
        id: "decor",
        name: "Home Decor",
        image: "/cozy-living-room.png",
        link: "/landing/category/home-kitchen/decor",
      },
    ],
  },
  {
    id: "womens-clothing",
    name: "Women's Clothing",
    subCategories: [
      {
        id: "dresses",
        name: "Dresses",
        image: "/diverse-women-dresses.png",
        link: "/landing/category/womens-clothing/dresses",
      },
      {
        id: "tops",
        name: "Tops & Tees",
        image: "/women-tops.jpg",
        link: "/landing/category/womens-clothing/tops",
      },
      {
        id: "pants",
        name: "Pants",
        image: "/women-pants.jpg",
        link: "/landing/category/womens-clothing/pants",
      },
      {
        id: "outerwear",
        name: "Outerwear",
        image: "/women-outerwear.jpg",
        link: "/landing/category/womens-clothing/outerwear",
      },
    ],
  },
  {
    id: "womens-curve",
    name: "Women's Curve Clothing",
    subCategories: [
      {
        id: "curve-tshirts",
        name: "Curve T-shirts",
        image: "/curve-tshirts.jpg",
        link: "/landing/category/womens-curve/tshirts",
      },
      {
        id: "curve-dresses",
        name: "Curve Dresses",
        image: "/curve-dresses.jpg",
        link: "/landing/category/womens-curve/dresses",
      },
      {
        id: "curve-underwear",
        name: "Curve Underwear",
        image: "/curve-underwear.jpg",
        link: "/landing/category/womens-curve/underwear",
      },
      {
        id: "curve-two-pieces",
        name: "Curve Two Pieces Set",
        image: "/curve-two-pieces.jpg",
        link: "/landing/category/womens-curve/two-pieces",
      },
      {
        id: "curve-sports-tops",
        name: "Curve Sports Tops",
        image: "/curve-sports-tops.jpg",
        link: "/landing/category/womens-curve/sports-tops",
      },
      {
        id: "curve-loungewear",
        name: "Curve Loungewear & Sleepwear",
        image: "/curve-loungewear.jpg",
        link: "/landing/category/womens-curve/loungewear",
      },
      {
        id: "curve-coats",
        name: "Curve Coats & Jackets",
        image: "/curve-coats.jpg",
        link: "/landing/category/womens-curve/coats",
      },
      {
        id: "curve-knitwear",
        name: "Curve Knitwear",
        image: "/curve-knitwear.jpg",
        link: "/landing/category/womens-curve/knitwear",
      },
      {
        id: "curve-sweatshirt",
        name: "Curve Sweatshirt",
        image: "/curve-sweatshirt.jpg",
        link: "/landing/category/womens-curve/sweatshirt",
      },
      {
        id: "curve-blouses",
        name: "Curve Blouses",
        image: "/curve-blouses.jpg",
        link: "/landing/category/womens-curve/blouses",
      },
      {
        id: "curve-denim",
        name: "Curve Denim",
        image: "/curve-denim.jpg",
        link: "/landing/category/womens-curve/denim",
      },
      {
        id: "curve-pants",
        name: "Curve Pants",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-curve/pants",
      },
      {
        id: "curve-cardigans",
        name: "Curve Cardigans",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-curve/cardigans",
      },
      {
        id: "curve-sports-bottoms",
        name: "Curve Sports Bottoms",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-curve/sports-bottoms",
      },
      {
        id: "curve-sports-sets",
        name: "Curve Sports Sets",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-curve/sports-sets",
      },
      {
        id: "curve-leggings",
        name: "Curve Leggings",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-curve/leggings",
      },
      {
        id: "curve-skirts",
        name: "Curve Skirts",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-curve/skirts",
      },
      {
        id: "curve-wedding",
        name: "Curve Wedding Party Wear",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-curve/wedding",
      },
      {
        id: "curve-lingerie",
        name: "Curve Sexy Lingerie & Costumes",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-curve/lingerie",
      },
      {
        id: "curve-jumpsuits",
        name: "Curve Jumpsuits & Bodysuits",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-curve/jumpsuits",
      },
    ],
  },
  {
    id: "womens-shoes",
    name: "Women's Shoes",
    subCategories: [
      {
        id: "sneakers",
        name: "Sneakers",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-shoes/sneakers",
      },
      {
        id: "heels",
        name: "Heels",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-shoes/heels",
      },
      {
        id: "boots",
        name: "Boots",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-shoes/boots",
      },
      {
        id: "sandals",
        name: "Sandals",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-shoes/sandals",
      },
    ],
  },
  {
    id: "womens-lingerie",
    name: "Women's Lingerie & Lounge",
    subCategories: [
      {
        id: "bras",
        name: "Bras",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-lingerie/bras",
      },
      {
        id: "panties",
        name: "Panties",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-lingerie/panties",
      },
      {
        id: "sleepwear",
        name: "Sleepwear",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-lingerie/sleepwear",
      },
      {
        id: "robes",
        name: "Robes",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/womens-lingerie/robes",
      },
    ],
  },
  {
    id: "mens-clothing",
    name: "Men's Clothing",
    subCategories: [
      {
        id: "mens-shirts",
        name: "Shirts",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-clothing/shirts",
      },
      {
        id: "mens-pants",
        name: "Pants",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-clothing/pants",
      },
      {
        id: "mens-jackets",
        name: "Jackets",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-clothing/jackets",
      },
      {
        id: "mens-suits",
        name: "Suits",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-clothing/suits",
      },
    ],
  },
  {
    id: "mens-shoes",
    name: "Men's Shoes",
    subCategories: [
      {
        id: "mens-sneakers",
        name: "Sneakers",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-shoes/sneakers",
      },
      {
        id: "mens-boots",
        name: "Boots",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-shoes/boots",
      },
      {
        id: "mens-dress",
        name: "Dress Shoes",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-shoes/dress",
      },
      {
        id: "mens-sandals",
        name: "Sandals",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-shoes/sandals",
      },
    ],
  },
  {
    id: "mens-big-tall",
    name: "Men's Big & Tall",
    subCategories: [
      {
        id: "big-shirts",
        name: "Big & Tall Shirts",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-big-tall/shirts",
      },
      {
        id: "big-pants",
        name: "Big & Tall Pants",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-big-tall/pants",
      },
      {
        id: "big-jackets",
        name: "Big & Tall Jackets",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-big-tall/jackets",
      },
    ],
  },
  {
    id: "mens-underwear",
    name: "Men's Underwear & Sleepwear",
    subCategories: [
      {
        id: "mens-boxers",
        name: "Boxers",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-underwear/boxers",
      },
      {
        id: "mens-briefs",
        name: "Briefs",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-underwear/briefs",
      },
      {
        id: "mens-sleepwear",
        name: "Sleepwear",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/mens-underwear/sleepwear",
      },
    ],
  },
  {
    id: "sports-outdoors",
    name: "Sports & Outdoors",
    subCategories: [
      {
        id: "fitness",
        name: "Fitness Equipment",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/sports-outdoors/fitness",
      },
      {
        id: "camping",
        name: "Camping & Hiking",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/sports-outdoors/camping",
      },
      {
        id: "cycling",
        name: "Cycling",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/sports-outdoors/cycling",
      },
      {
        id: "water-sports",
        name: "Water Sports",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/sports-outdoors/water-sports",
      },
    ],
  },
  {
    id: "jewelry-accessories",
    name: "Jewelry & Accessories",
    subCategories: [
      {
        id: "necklaces",
        name: "Necklaces",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/jewelry-accessories/necklaces",
      },
      {
        id: "earrings",
        name: "Earrings",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/jewelry-accessories/earrings",
      },
      {
        id: "bracelets",
        name: "Bracelets",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/jewelry-accessories/bracelets",
      },
      {
        id: "watches",
        name: "Watches",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/jewelry-accessories/watches",
      },
    ],
  },
  {
    id: "beauty-health",
    name: "Beauty & Health",
    subCategories: [
      {
        id: "skincare",
        name: "Skincare",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/beauty-health/skincare",
      },
      {
        id: "makeup",
        name: "Makeup",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/beauty-health/makeup",
      },
      {
        id: "haircare",
        name: "Hair Care",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/beauty-health/haircare",
      },
      {
        id: "wellness",
        name: "Wellness",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/beauty-health/wellness",
      },
    ],
  },
  {
    id: "toys-games",
    name: "Toys & Games",
    subCategories: [
      {
        id: "action-figures",
        name: "Action Figures",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/toys-games/action-figures",
      },
      {
        id: "dolls",
        name: "Dolls",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/toys-games/dolls",
      },
      {
        id: "board-games",
        name: "Board Games",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/toys-games/board-games",
      },
      {
        id: "puzzles",
        name: "Puzzles",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/toys-games/puzzles",
      },
    ],
  },
  {
    id: "automotive",
    name: "Automotive",
    subCategories: [
      {
        id: "car-accessories",
        name: "Car Accessories",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/automotive/accessories",
      },
      {
        id: "car-electronics",
        name: "Car Electronics",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/automotive/electronics",
      },
      {
        id: "car-care",
        name: "Car Care",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/automotive/care",
      },
      {
        id: "tools",
        name: "Tools & Equipment",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/automotive/tools",
      },
    ],
  },
  {
    id: "kids-fashion",
    name: "Kids' Fashion",
    subCategories: [
      {
        id: "boys-clothing",
        name: "Boys' Clothing",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/kids-fashion/boys",
      },
      {
        id: "girls-clothing",
        name: "Girls' Clothing",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/kids-fashion/girls",
      },
      {
        id: "kids-accessories",
        name: "Kids Accessories",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/kids-fashion/accessories",
      },
    ],
  },
  {
    id: "kids-shoes",
    name: "Kids' Shoes",
    subCategories: [
      {
        id: "boys-shoes",
        name: "Boys' Shoes",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/kids-shoes/boys",
      },
      {
        id: "girls-shoes",
        name: "Girls' Shoes",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/kids-shoes/girls",
      },
      {
        id: "toddler-shoes",
        name: "Toddler Shoes",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/kids-shoes/toddler",
      },
    ],
  },
  {
    id: "baby-maternity",
    name: "Baby & Maternity",
    subCategories: [
      {
        id: "baby-clothing",
        name: "Baby Clothing",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/baby-maternity/clothing",
      },
      {
        id: "maternity",
        name: "Maternity Wear",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/baby-maternity/maternity",
      },
      {
        id: "baby-gear",
        name: "Baby Gear",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/baby-maternity/gear",
      },
      {
        id: "nursery",
        name: "Nursery",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/baby-maternity/nursery",
      },
    ],
  },
  {
    id: "bags-luggage",
    name: "Bags & Luggage",
    subCategories: [
      {
        id: "backpacks",
        name: "Backpacks",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/bags-luggage/backpacks",
      },
      {
        id: "handbags",
        name: "Handbags",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/bags-luggage/handbags",
      },
      {
        id: "luggage",
        name: "Luggage",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/bags-luggage/luggage",
      },
      {
        id: "wallets",
        name: "Wallets",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/bags-luggage/wallets",
      },
    ],
  },
  {
    id: "patio-lawn-garden",
    name: "Patio, Lawn & Garden",
    subCategories: [
      {
        id: "outdoor-furniture",
        name: "Outdoor Furniture",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/patio-lawn-garden/furniture",
      },
      {
        id: "gardening",
        name: "Gardening Tools",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/patio-lawn-garden/gardening",
      },
      {
        id: "outdoor-decor",
        name: "Outdoor Decor",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/patio-lawn-garden/decor",
      },
      {
        id: "grills",
        name: "Grills & Outdoor Cooking",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/patio-lawn-garden/grills",
      },
    ],
  },
  {
    id: "arts-crafts",
    name: "Arts, Crafts & Sewing",
    subCategories: [
      {
        id: "painting",
        name: "Painting Supplies",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/arts-crafts/painting",
      },
      {
        id: "sewing",
        name: "Sewing",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/arts-crafts/sewing",
      },
      {
        id: "crafting",
        name: "Crafting",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/arts-crafts/crafting",
      },
      {
        id: "scrapbooking",
        name: "Scrapbooking",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/arts-crafts/scrapbooking",
      },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    subCategories: [
      {
        id: "phones",
        name: "Phones & Accessories",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/electronics/phones",
      },
      {
        id: "computers",
        name: "Computers",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/electronics/computers",
      },
      {
        id: "audio",
        name: "Audio",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/electronics/audio",
      },
      {
        id: "cameras",
        name: "Cameras",
        image: "/placeholder.svg?height=80&width=80",
        link: "/landing/category/electronics/cameras",
      },
    ],
  },
];
