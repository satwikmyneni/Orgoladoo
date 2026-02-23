import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl font-bold mb-3">Ladoo</h3>
          <p className="text-sm opacity-80">Handcrafted organic seed-based ladoos, made with love and the finest natural ingredients.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <nav className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/shop" className="hover:opacity-100 transition-opacity">Shop</Link>
            <Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Our Promise</h4>
          <ul className="text-sm opacity-80 space-y-1">
            <li>🌿 100% Organic Ingredients</li>
            <li>🚫 No Refined Sugar</li>
            <li>🤲 Handcrafted with Love</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-primary-foreground/20 text-center text-sm opacity-60">
        © {new Date().getFullYear()} Ladoo. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
