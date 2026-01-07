
import { Supermarket, Product } from './types';

export const MOCK_STORES: Supermarket[] = [
  { 
    id: 's1', 
    uniqueId: 'MC-778',
    name: 'Supermercado Central', 
    address: 'Av. Paulista, 1000', 
    region: 'Centro',
    logoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200', 
    bannerUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1200',
    rating: 4.8, 
    distance: 1.2,
    isVerified: true,
    businessHours: { open: '07:00', close: '22:00' }
  },
  { 
    id: 's2', 
    uniqueId: 'MC-902',
    name: 'Hiper Market', 
    address: 'Rua Augusta, 500', 
    region: 'Oeste',
    logoUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=200', 
    bannerUrl: 'https://images.unsplash.com/photo-1604719312563-88296d10d592?auto=format&fit=crop&q=80&w=1200',
    rating: 4.5, 
    distance: 2.5,
    businessHours: { open: '08:00', close: '23:00' }
  },
  { 
    id: 's3', 
    uniqueId: 'MC-115',
    name: 'Mercadinho do Bairro', 
    address: 'Rua das Flores, 12', 
    region: 'Leste',
    logoUrl: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=200', 
    bannerUrl: 'https://images.unsplash.com/photo-1506484334406-f15bde9f57fe?auto=format&fit=crop&q=80&w=1200',
    rating: 4.2, 
    distance: 0.8,
    isVerified: true,
    businessHours: { open: '07:00', close: '20:00' }
  },
];

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: 'p1', 
    name: 'Café Gourmet 500g', 
    description: 'Café torrado e moído de alta qualidade, 100% arábica com notas de chocolate.', 
    price: 18.90, 
    originalPrice: 24.90, 
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400', 
    isPromotion: true, 
    category: 'Mercearia', 
    storeId: 's1' 
  },
  { 
    id: 'p2', 
    name: 'Leite Integral 1L', 
    description: 'Leite tipo A, fresco e nutritivo direto da fazenda.', 
    price: 4.50, 
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9107da5a1bb?auto=format&fit=crop&q=80&w=400', 
    isPromotion: false, 
    category: 'Laticínios', 
    storeId: 's1' 
  },
  { 
    id: 'p3', 
    name: 'Detergente Líquido 500ml', 
    description: 'Eficiente contra gordura, fragrância neutra e biodegradável.', 
    price: 2.20, 
    originalPrice: 3.50,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400', 
    isPromotion: true, 
    category: 'Limpeza', 
    storeId: 's1' 
  },
  { 
    id: 'p4', 
    name: 'Azeite de Oliva Extra Virgem 500ml', 
    description: 'Prensado a frio, acidez máxima de 0,2%.', 
    price: 42.90, 
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbad8a0f?auto=format&fit=crop&q=80&w=400', 
    isPromotion: false, 
    category: 'Mercearia', 
    storeId: 's1' 
  }
];

export const CATEGORIES = ['Hortifruti', 'Carnes', 'Laticínios', 'Limpeza', 'Mercearia', 'Bebidas', 'Padaria'];
export const REGIONS = ['Centro', 'Sul', 'Norte', 'Leste', 'Oeste'];
