import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-ladoo.jpg';

const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImage} alt="Organic seed-based ladoos" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-foreground/60" />
    </div>
    <div className="relative container py-24 md:py-40 text-center">
      <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary-foreground/30 text-primary-foreground text-xs font-semibold tracking-wider uppercase">
        100% Organic • Handcrafted
      </span>
      <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 max-w-3xl mx-auto leading-tight">
        Nature's Sweetness, Rolled to Perfection
      </h1>
      <p className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mx-auto mb-8">
        Discover our range of organic seed-based ladoos — naturally sweetened, nutrient-rich, and absolutely delicious.
      </p>
      <Link to="/shop">
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8 py-6">
          Shop Now
        </Button>
      </Link>
    </div>
  </section>
);

export default HeroSection;
