
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  specs?: {
    [key: string]: string;
  };
  stock: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "UltraBook Pro X1",
    description: "Premium ultrabook with lightning-fast performance and stunning display.",
    price: 1299.99,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    specs: {
      cpu: "Intel Core i7-12700H",
      ram: "16GB DDR4",
      storage: "512GB NVMe SSD",
      display: "14\" 4K Ultra HD",
      gpu: "Intel Iris Xe",
      os: "Windows 11 Pro"
    },
    stock: 15,
    featured: true
  },
  {
    id: 2,
    name: "PowerDesk Ultimate",
    description: "High-performance desktop PC for demanding professional workloads.",
    price: 1899.99,
    category: "desktops",
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141",
    specs: {
      cpu: "AMD Ryzen 9 5900X",
      ram: "32GB DDR4",
      storage: "1TB NVMe SSD + 2TB HDD",
      gpu: "NVIDIA RTX 3080 10GB",
      os: "Windows 11 Pro"
    },
    stock: 8,
    featured: true
  },
  {
    id: 3,
    name: "GamingEdge RTX",
    description: "Ultimate gaming laptop with top-tier graphics and cooling.",
    price: 1799.99,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
    specs: {
      cpu: "Intel Core i9-12900K",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: "17.3\" QHD 165Hz",
      gpu: "NVIDIA RTX 3080Ti 16GB",
      os: "Windows 11 Home"
    },
    stock: 5
  },
  {
    id: 4,
    name: "ErgoPro Mechanical Keyboard",
    description: "Professional ergonomic keyboard with mechanical switches for comfortable typing.",
    price: 129.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
    specs: {
      switches: "Cherry MX Brown",
      layout: "Full size with numpad",
      connection: "USB-C, Bluetooth",
      backlight: "RGB customizable"
    },
    stock: 30,
    featured: true
  },
  {
    id: 5,
    name: "UltraWide 34\" Monitor",
    description: "Immersive ultrawide curved monitor for productivity and entertainment.",
    price: 499.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1616711906333-23cf8c6a8288",
    specs: {
      size: "34\" Ultrawide Curved",
      resolution: "3440x1440 WQHD",
      refreshRate: "144Hz",
      panel: "IPS",
      ports: "HDMI 2.1, DisplayPort, USB-C"
    },
    stock: 12
  },
  {
    id: 6,
    name: "CompactBook Air",
    description: "Ultra-thin, lightweight laptop perfect for everyday tasks and travel.",
    price: 899.99,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef",
    specs: {
      cpu: "Intel Core i5-1135G7",
      ram: "8GB LPDDR4X",
      storage: "256GB NVMe SSD",
      display: "13.3\" Full HD",
      gpu: "Intel Iris Xe",
      os: "Windows 11 Home"
    },
    stock: 20
  },
  {
    id: 7,
    name: "CreatorStation Pro",
    description: "Powerful workstation desktop optimized for content creation and design.",
    price: 2499.99,
    category: "desktops",
    image: "https://images.unsplash.com/photo-1593640408182-31c2bd3f87d0",
    specs: {
      cpu: "AMD Threadripper 3960X",
      ram: "64GB DDR4 ECC",
      storage: "2TB NVMe SSD + 4TB HDD",
      gpu: "NVIDIA RTX 3090 24GB",
      os: "Windows 11 Pro"
    },
    stock: 3,
    featured: true
  },
  {
    id: 8,
    name: "PrecisionMouse Pro",
    description: "High-precision wireless mouse with ergonomic design and customizable buttons.",
    price: 79.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1616071089875-d7981d42474e",
    specs: {
      sensor: "16,000 DPI optical",
      buttons: "8 programmable",
      connection: "2.4GHz wireless, Bluetooth, USB-C",
      battery: "Up to 70 hours"
    },
    stock: 45
  }
];

// Filter function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

// Function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

// Function to get a single product by ID
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

// Function to search products
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};
