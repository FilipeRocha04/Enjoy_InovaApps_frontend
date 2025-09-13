import { useEffect, useState } from 'react';
import disruptionLogo from '@/assets/disruption-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-background flex flex-col items-center justify-between p-8 z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Header */}
      <div className="flex-1 flex items-start pt-16">
        <h1 className="text-2xl font-playfair text-copper font-medium tracking-wide">
          Comunidade Disruption
        </h1>
      </div>

      {/* Logo - Center */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          <img 
            src={disruptionLogo} 
            alt="Disruption Community Logo" 
            className="w-32 h-32 object-contain animate-glow"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex-1 flex items-end pb-16">
        <p className="text-lg font-montserrat text-text-secondary tracking-widest">
          Enjoy
        </p>
      </div>
    </div>
  );
};