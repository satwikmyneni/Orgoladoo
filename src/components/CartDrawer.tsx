import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    createOrderAndRedirect
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please enter your name and phone number');
      return;
    }

    if (!/^[0-9]{10,15}$/.test(customerPhone.trim())) {
      alert('Please enter a valid phone number');
      return;
    }

    if (items.length === 0) return;

    try {
      setLoading(true);

      await createOrderAndRedirect(
        customerName.trim(),
        customerPhone.trim()
      );

      // Reset fields after success
      setCustomerName('');
      setCustomerPhone('');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
            <p className="text-muted-foreground">
              Your cart is empty
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-16 h-16 rounded-md object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">
                      {item.productName}
                    </h4>

                    <p className="text-xs text-muted-foreground">
                      {item.weight} •{' '}
                      {item.sweetness.charAt(0).toUpperCase() +
                        item.sweetness.slice(1)}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="text-sm font-medium w-6 text-center">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          ${item.price * item.quantity}
                        </span>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border pt-4 space-y-4">
              <div className="space-y-2">
                <input
                  placeholder="Your Name"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full border p-2 rounded"
                />

                <input
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>

              <Button
                disabled={loading || items.length === 0}
                className="w-full bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground font-semibold py-6 disabled:opacity-50"
                onClick={handleOrder}
              >
                {loading ? 'Processing...' : 'Order via WhatsApp'}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;