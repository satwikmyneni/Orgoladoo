const About = () => (
  <main className="container py-12 md:py-20">
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">Our Story</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Born from a simple belief — that sweets can be both delicious and nourishing.
      </p>
    </div>
    <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
      <p>
        At <span className="font-semibold text-foreground">Ladoo</span>, we set out to reinvent the traditional Indian ladoo with the goodness of organic seeds. Every ladoo we make is handcrafted in small batches, using only the finest certified organic ingredients.
      </p>
      <p>
        We believe that what goes into your body matters. That's why we use no refined sugar — only the natural sweetness of jaggery and dates. Our seed-based ladoos are packed with essential nutrients like omega-3, calcium, zinc, and fiber.
      </p>
      <p>
        From sourcing the best organic flax, sesame, pumpkin, and chia seeds to hand-rolling each ladoo with care — we pour love into every step of the process.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8">
        {[
          { number: '100%', label: 'Organic Ingredients' },
          { number: '0g', label: 'Refined Sugar' },
          { number: '4+', label: 'Super Seed Varieties' },
        ].map(stat => (
          <div key={stat.label} className="text-center p-6 rounded-lg bg-secondary">
            <div className="font-display text-3xl font-bold text-primary mb-1">{stat.number}</div>
            <div className="text-sm text-secondary-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
      <p>
        Whether you're looking for a post-workout snack, a lunchbox treat, or a mindful dessert — Ladoo has something wholesome waiting for you.
      </p>
    </div>
  </main>
);

export default About;
