const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Diagonal stripe accent — top right (static) */}
      <svg className="absolute -top-10 -right-10 w-72 h-72 opacity-15" viewBox="0 0 200 200">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={i * 25 - 40} y1="0" x2={i * 25 + 40} y2="200" stroke="url(#stripeGrad)" strokeWidth="6" />
        ))}
        <defs>
          <linearGradient id="stripeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      {/* Diagonal stripe accent — bottom left (static) */}
      <svg className="absolute -bottom-10 -left-10 w-72 h-72 opacity-10" viewBox="0 0 200 200">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={i * 25 - 40} y1="0" x2={i * 25 + 40} y2="200" stroke="url(#stripeGrad2)" strokeWidth="6" />
        ))}
        <defs>
          <linearGradient id="stripeGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default FloatingShapes;