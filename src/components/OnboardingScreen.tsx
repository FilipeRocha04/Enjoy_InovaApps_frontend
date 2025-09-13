import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Users, MessageCircle, Trophy } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    icon: Users,
    title: "Conecte-se com Líderes",
    description: "Faça parte de uma rede exclusiva de empresários de alto nível. Troque experiências e construa relacionamentos valiosos.",
    highlight: "Networking Premium"
  },
  {
    icon: MessageCircle,
    title: "Sistema de Indicações",
    description: "Compartilhe oportunidades e receba indicações qualificadas. Publique suas necessidades e encontre os perfis ideais.",
    highlight: "Negócios Estratégicos"
  },
  {
    icon: Trophy,
    title: "Gamificação e Recompensas",
    description: "Ganhe pontos por indicações bem-sucedidas. Participe do ranking e concorra a prêmios exclusivos, de viagens a itens valiosos.",
    highlight: "Sistema de Recompensas"
  }
];

export const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = onboardingSteps[currentStep];
  const IconComponent = step.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Indicator */}
      <div className="flex justify-center pt-8 pb-4">
        <div className="flex space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-copper' : 'bg-surface'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-8">
          {/* Icon */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-copper rounded-2xl flex items-center justify-center shadow-copper">
              <IconComponent className="w-12 h-12 text-black" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-copper/20 rounded-full">
              <span className="text-copper text-sm font-semibold">
                {step.highlight}
              </span>
            </div>
            
            <h2 className="text-3xl font-playfair text-foreground font-semibold">
              {step.title}
            </h2>
            
            <p className="text-text-secondary text-lg leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-8">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center space-x-2 text-text-muted disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </Button>

        <Button
          onClick={nextStep}
          className="btn-copper flex items-center space-x-2"
        >
          <span>{currentStep === onboardingSteps.length - 1 ? 'Começar' : 'Próximo'}</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};