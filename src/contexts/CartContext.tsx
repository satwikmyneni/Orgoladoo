import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types/product';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  createOrderAndRedirect: (
    customerName: string,
    customerPhone: string
  ) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ladoo-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('ladoo-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, 'id' | 'quantity'>) => {
    const itemId = `${newItem.productId}-${newItem.sweetness}-${newItem.weight}`;

    setItems(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing) {
        return prev.map(i =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...newItem, id: itemId, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) =>
    setItems(prev => prev.filter(i => i.id !== id));

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const generateOrderNumber = () => {
    const today = new Date();
    const date = today.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `LBL-${date}-${random}`;
  };

  const createOrderAndRedirect = async (
    customerName: string,
    customerPhone: string
  ) => {
    if (items.length === 0) return;

    const orderNumber = generateOrderNumber();

    // 1️⃣ Create order
    const { data: orderData, error } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: customerName,
        customer_phone: customerPhone,
        total_amount: totalPrice,
        status: 'pending'
      })
      .select()
      .single();

    if (error || !orderData) {
      alert('Order creation failed');
      return;
    }

    // 2️⃣ Insert order items
    for (const item of items) {
      await supabase.from('order_items').insert({
        order_id: orderData.id,
        product_name: item.productName,
        weight: item.weight,
        sweetness: item.sweetness,
        price: item.price,
        quantity: item.quantity
      });
    }

    // 3️⃣ Get WhatsApp number
    const { data: settings } = await supabase
      .from('settings')
      .select('whatsapp_number')
      .limit(1)
      .single();

    if (!settings?.whatsapp_number) {
      alert('WhatsApp number not configured');
      return;
    }

    // 4️⃣ Build message
    let message = `Hello,

Order ID: ${orderNumber}

Customer: ${customerName}
Phone: ${customerPhone}

Items:

`;

    items.forEach(item => {
      message += `- ${item.productName}
  Weight: ${item.weight}
  Sweetness: ${item.sweetness}
  Quantity: ${item.quantity}
  Subtotal: Rs ${item.price * item.quantity}

`;
    });

    message += `Total: Rs ${totalPrice}

Please confirm availability.`;

    const url = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, '_blank');

    clearCart();
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        createOrderAndRedirect
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};