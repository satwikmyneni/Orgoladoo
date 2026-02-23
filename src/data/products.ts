import flaxImg from '@/assets/flax-seed-ladoo.jpg';
import sesameImg from '@/assets/sesame-seed-ladoo.jpg';
import pumpkinImg from '@/assets/pumpkin-seed-ladoo.jpg';
import mixedImg from '@/assets/mixed-seed-ladoo.jpg';
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Flax Seed Ladoo',
    slug: 'flax-seed-ladoo',
    description: 'Nutty and wholesome flax seed ladoos packed with omega-3 fatty acids. A perfect guilt-free treat for health-conscious sweet lovers.',
    ingredients: ['Organic Flax Seeds', 'Desiccated Coconut', 'Ghee', 'Cardamom', 'Jaggery/Dates'],
    nutritionalHighlights: ['Rich in Omega-3', 'High Fiber', 'Heart Healthy', 'Gluten Free'],
    variants: [
      { weight: '250g', price: 199 },
      { weight: '500g', price: 349 },
      { weight: '1kg', price: 649 },
    ],
    isOrganic: true,
    imageUrl: flaxImg,
    isActive: true,
  },
  {
    id: '2',
    name: 'Sesame Seed Ladoo',
    slug: 'sesame-seed-ladoo',
    description: 'Traditional sesame ladoos with a rich, toasty flavor. Loaded with calcium and iron for strong bones and energy.',
    ingredients: ['Organic Sesame Seeds', 'Peanuts', 'Ghee', 'Cardamom', 'Jaggery/Dates'],
    nutritionalHighlights: ['Rich in Calcium', 'High in Iron', 'Bone Strength', 'Protein Packed'],
    variants: [
      { weight: '250g', price: 199 },
      { weight: '500g', price: 349 },
      { weight: '1kg', price: 649 },
    ],
    isOrganic: true,
    imageUrl: sesameImg,
    isActive: true,
  },
  {
    id: '3',
    name: 'Pumpkin Seed Ladoo',
    slug: 'pumpkin-seed-ladoo',
    description: 'Unique and crunchy pumpkin seed ladoos full of zinc and magnesium. A modern twist on the classic Indian sweet.',
    ingredients: ['Organic Pumpkin Seeds', 'Oats', 'Ghee', 'Cinnamon', 'Jaggery/Dates'],
    nutritionalHighlights: ['Rich in Zinc', 'High Magnesium', 'Immunity Booster', 'Antioxidant Rich'],
    variants: [
      { weight: '250g', price: 229 },
      { weight: '500g', price: 399 },
      { weight: '1kg', price: 749 },
    ],
    isOrganic: true,
    imageUrl: pumpkinImg,
    isActive: true,
  },
  {
    id: '4',
    name: 'Mixed Seed Ladoo',
    slug: 'mixed-seed-ladoo',
    description: 'The ultimate super-seed blend combining flax, sunflower, chia, and pumpkin seeds. Maximum nutrition in every bite.',
    ingredients: ['Organic Flax Seeds', 'Sunflower Seeds', 'Chia Seeds', 'Pumpkin Seeds', 'Ghee', 'Jaggery/Dates'],
    nutritionalHighlights: ['Super Seed Blend', 'Complete Nutrition', 'Energy Booster', 'Fiber Rich'],
    variants: [
      { weight: '250g', price: 249 },
      { weight: '500g', price: 449 },
      { weight: '1kg', price: 849 },
    ],
    isOrganic: true,
    imageUrl: mixedImg,
    isActive: true,
  },
];
