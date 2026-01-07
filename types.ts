
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  SUPERMARKET = 'SUPERMARKET'
}

export interface BusinessHours {
  open: string;
  close: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  isPromotion: boolean;
  category: string;
  storeId: string;
}

export interface Supermarket {
  id: string;
  uniqueId: string; // ID for search
  name: string;
  address: string;
  region: string;
  logoUrl: string;
  bannerUrl?: string;
  distance?: number; // km
  rating: number;
  isVerified?: boolean;
  businessHours?: BusinessHours;
}

export interface UserProfile {
  id: string;
  uniqueId?: string; // If store
  name: string;
  email: string;
  role: UserRole;
  storeId?: string; 
  favorites?: string[]; 
  avatarUrl?: string;
  bannerUrl?: string;
  region?: string;
  businessHours?: BusinessHours;
}
