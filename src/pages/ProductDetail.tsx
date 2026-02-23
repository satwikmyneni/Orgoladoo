import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { products } from '@/data/products';
import { SweetnessOption, WeightOption } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [sweetness, setSweetness] = useState<SweetnessOption | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>('250g');

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/shop"><Button variant="outline">Back to Shop</Button></Link>
      </div>
    );
  }

  const currentVariant = product.variants.find(v => v.weight === selectedWeight)!;

  const handleAddToCart = () => {
    if (!sweetness) {
      toast({ title: 'Please select sweetness', description: 'Choose Jaggery or Dates before adding to cart.', variant: 'destructive' });
      return;
    }
    addToCart({
      productId: product.id,
      productName: product.name,
      sweetness,
      weight: selectedWeight,
      price: currentVariant.price,
      imageUrl: product.imageUrl,
    });
    toast({ title: 'Added to cart!', description: `${product.name} (${selectedWeight}, ${sweetness}) added.` });
  };

  return (
    <main className="container py-8 md:py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            {product.isOrganic && <Badge variant="secondary">🌿 100% Organic</Badge>}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map(ing => (
                <span key={ing} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">{ing}</span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">Nutritional Highlights</h3>
            <div className="flex flex-wrap gap-2">
              {product.nutritionalHighlights.map(nh => (
                <Badge key={nh} variant="outline" className="text-xs">{nh}</Badge>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-3">
              Sweetness <span className="text-destructive">*</span>
            </h3>
            <div className="flex gap-3">
              {(['jaggery', 'dates'] as SweetnessOption[]).map(opt => (
                <button
                  key={opt}
                  onClick={() => setSweetness(opt)}
                  className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    sweetness === opt
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-card-foreground hover:border-primary/50'
                  }`}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-sm mb-3">
              Weight <span className="text-destructive">*</span>
            </h3>
            <div className="flex gap-3">
              {product.variants.map(v => (
                <button
                  key={v.weight}
                  onClick={() => setSelectedWeight(v.weight)}
                  className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    selectedWeight === v.weight
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-card-foreground hover:border-primary/50'
                  }`}
                >
                  {v.weight}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <span className="font-display text-3xl font-bold text-foreground">₹{currentVariant.price}</span>
          </div>

          <Button size="lg" className="w-full py-6 font-semibold text-base" onClick={handleAddToCart}>
            <ShoppingBag className="h-5 w-5 mr-2" /> Add to Cart
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
