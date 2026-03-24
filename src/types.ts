export type Plan = 'free' | 'pro' | 'premium';

export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
}

export interface Bill {
  id: string;
  shopName: string;
  customerName: string;
  products: Product[];
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  date: string;
  customWatermark?: {
    name: string;
    address: string;
    phone: string;
  };
}

export interface UserSettings {
  plan: Plan;
  activationKey: string;
  themeColor: string;
  themeMode: 'light' | 'dark';
  language: 'en' | 'ur';
  credits: number;
  firstTime: boolean;
  customWatermark?: {
    name: string;
    address: string;
    phone: string;
  };
}
