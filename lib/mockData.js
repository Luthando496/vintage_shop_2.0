// lib/mockData.js

export const mockProducts = [
  {
    id: "1547",
    title: "1970s Brown Leather Aviator Jacket",
    description:
      "A stunning, well-preserved aviator jacket from the 1970s. Features original brass hardware and an incredibly soft, broken-in leather feel. Perfect for autumn evenings. The shearling collar is intact and the zippers glide perfectly.",
    era: "1970s",
    condition: "Excellent",
    size: "Medium (UK 38)",
    price_zar: 2450.0,
    image_url:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&auto=format&fit=crop",
    ],
    is_sold: false,
    category: "Jackets",
    gender: "Unisex",
    created_at: new Date().toISOString(),
  },
  {
    id: "848561655sfdf",
    title: "1980s Oversized Wool Trench Coat",
    description:
      "Classic 1980s power dressing. This oversized wool trench coat features a dramatic collar and a structured silhouette. Fully lined in silk. A true statement piece for the modern wardrobe.",
    era: "1980s",
    condition: "Mint Condition",
    size: "Large (UK 42)",
    price_zar: 3200.0,
    image_url:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop",
    ],
    is_sold: false,
    category: "Coats",
    gender: "Women",
    created_at: new Date().toISOString(),
  },
  {
    id: "jbebcec548948eded",
    title: "1990s Denim Trucker Jacket",
    description:
      "A timeless 90s Levi's style denim jacket. Features beautiful natural fading, copper rivets, and a relaxed fit. A true vintage staple that only gets better with age.",
    era: "1990s",
    condition: "Good",
    size: "Small (UK 34)",
    price_zar: 1150.0,
    image_url:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&auto=format&fit=crop",
    ],
    is_sold: false,
    category: "Jackets",
    gender: "Men",
    created_at: new Date().toISOString(),
  },
  {
    id: "bbh5414ded",
    title: "1960s Velvet Collar Wool Coat",
    description:
      "Exquisite 1960s tailored coat with a luxurious velvet collar. A rare find in such pristine condition. Dry cleaned and ready to wear. Features original horn buttons.",
    era: "1960s",
    condition: "Excellent",
    size: "Medium (UK 38)",
    price_zar: 4500.0,
    image_url:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop",
    ],
    is_sold: false,
    category: "Coats",
    gender: "Women",
    created_at: new Date().toISOString(),
  },
];

// Helper to format ZAR currency
export const formatZAR = (amount) => {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(amount);
};

// Add this to the bottom of lib/mockData.js

export const mockOrders = [
  {
    id: "ord-12345",
    customer_name: "Sarah Jenkins",
    customer_email: "sarah@example.com",
    total_amount: 3450.0,
    status: "Processing",
    created_at: "2026-06-20T10:00:00Z",
    items: [
      {
        product_title: "1970s Brown Leather Aviator Jacket",
        quantity: 1,
        price_at_purchase: 2450.0,
      },
      {
        product_title: "1990s Denim Trucker Jacket",
        quantity: 1,
        price_at_purchase: 1000.0,
      },
    ],
  },
  {
    id: "ord-67890",
    customer_name: "Michael Vance",
    customer_email: "michael@example.com",
    total_amount: 4500.0,
    status: "Shipped",
    created_at: "2026-06-22T14:30:00Z",
    items: [
      {
        product_title: "1960s Velvet Collar Wool Coat",
        quantity: 1,
        price_at_purchase: 4500.0,
      },
    ],
  },
];
