export type SweetnessOption = 'jaggery' | 'dates';
export type WeightOption = '250g' | '500g' | '1kg';

export interface ProductVariant {
  weight: WeightOption;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  ingredients: string[];
  nutritionalHighlights: string[];
  variants: ProductVariant[];
  isOrganic: boolean;
  imageUrl: string;
  isActive: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  sweetness: SweetnessOption;
  weight: WeightOption;
  price: number;
  quantity: number;
  imageUrl: string;
}
