import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';

const ProductCard = ({ product }: { product: Product }) => (
  <Link to={`/product/${product.slug}`} className="group block">
    <div className="overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {product.isOrganic && (
            <Badge variant="secondary" className="text-xs font-medium">🌿 Organic</Badge>
          )}
        </div>
        <h3 className="font-display text-lg font-semibold text-card-foreground mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
        <p className="text-base font-semibold text-primary">
          Starting from ${product.variants[0].price}
        </p>
      </div>
    </div>
  </Link>
);

export default ProductCard;
