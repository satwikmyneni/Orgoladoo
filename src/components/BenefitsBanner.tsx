import { Leaf, HeartPulse, HandHeart } from 'lucide-react';

const benefits = [
  { icon: Leaf, title: '100% Organic', description: 'All natural, certified organic ingredients' },
  { icon: HeartPulse, title: 'No Refined Sugar', description: 'Naturally sweetened with jaggery or dates' },
  { icon: HandHeart, title: 'Handcrafted', description: 'Made in small batches with care and love' },
];

const BenefitsBanner = () => (
  <section className="bg-secondary py-16">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div key={title} className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <Icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-secondary-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsBanner;
