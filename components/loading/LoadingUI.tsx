interface LogoPosition {
  id: number;
  icon: React.ReactNode;
  x: number;
  y: number;
  delay: number;
  duration: number;
  color: string;
}

export default function LoadingUI({ logo }: { logo: LogoPosition[] }) {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {logo.map((logo) => (
        <div
          key={logo.id}
          className={`absolute animate-float transition-all duration-300 hover:scale-110 hover:brightness-125 ${logo.color}`}
          style={{
            left: `${logo.x}%`,
            top: `${logo.y}%`,
            animationDelay: `${logo.delay}s`,
            animationDuration: `${logo.duration}s`,
          }}
        >
          <div className="rounded-full bg-white/5 p-2 backdrop-blur-sm sm:p-2.5 md:p-3 lg:p-4">
            {logo.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
