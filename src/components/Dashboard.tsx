import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, MessageCircle, Trophy, User, TrendingUp } from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const menuItems = [
    {
      id: 'members',
      title: 'Membros',
      icon: Users,
      description: 'Rede exclusiva',
      color: 'copper'
    },
    {
      id: 'indications',
      title: 'Indicações',
      icon: TrendingUp,
      description: 'Oportunidades',
      color: 'copper'
    },
    {
      id: 'messages',
      title: 'Mensagens',
      icon: MessageCircle,
      description: 'Chat privado',
      color: 'copper'
    },
    {
      id: 'profile',
      title: 'Perfil',
      icon: User,
      description: 'Meu perfil',
      color: 'copper'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-playfair text-copper font-semibold">
            Disruption Community
          </h1>
          <p className="text-text-secondary">
            Bem-vindo à nossa rede exclusiva
          </p>
        </div>

        {/* Manifesto Card */}
        <Card className="card-member p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-copper rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-black" />
            </div>
            <h2 className="text-xl font-playfair text-foreground font-semibold">
              Nosso Manifesto
            </h2>
          </div>
          
          <div className="space-y-3 text-text-secondary">
            <p className="text-sm leading-relaxed">
              <strong className="text-copper">Disruption Community</strong> é mais que uma rede - 
              é um ecossistema de excelência empresarial.
            </p>
            <p className="text-sm leading-relaxed">
              Aqui, líderes visionários se conectam para transformar ideias em 
              oportunidades reais, criando valor não apenas para seus negócios, 
              mas para todo o mercado.
            </p>
            <p className="text-sm leading-relaxed">
              <em className="text-copper">Juntos, redefinimos o futuro dos negócios.</em>
            </p>
          </div>
        </Card>

        {/* Quick Access Menu */}
        <div className="space-y-4">
          <h3 className="text-lg font-playfair text-foreground font-medium">
            Acesso Rápido
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-surface hover:bg-surface-elevated border border-card-border hover:border-copper/30 transition-all duration-300"
                  variant="ghost"
                >
                  <IconComponent className="w-6 h-6 text-copper" />
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">
                      {item.title}
                    </div>
                    <div className="text-xs text-text-muted">
                      {item.description}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Stats Overview */}
        <Card className="card-member p-4">
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="text-center">
              <div className="text-xl font-bold text-copper">150+</div>
              <div className="text-xs text-text-muted">Membros</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-copper">50+</div>
              <div className="text-xs text-text-muted">Indicações</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-copper">25+</div>
              <div className="text-xs text-text-muted">Negócios</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};