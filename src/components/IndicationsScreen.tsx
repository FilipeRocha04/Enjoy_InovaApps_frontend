import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, TrendingUp, Clock, CheckCircle, DollarSign } from 'lucide-react';

interface Indication {
  id: string;
  title: string;
  description: string;
  segment: string;
  author: string;
  authorPhoto: string;
  timestamp: Date;
  value?: number;
  status: 'open' | 'in_progress' | 'closed';
  responses: number;
}

const mockIndications: Indication[] = [
  {
    id: '1',
    title: 'Procuro CTO para Fintech',
    description: 'Startup em crescimento busca CTO experiente em blockchain e sistemas financeiros. Equity + salário competitivo.',
    segment: 'Tecnologia',
    author: 'Marina Santos',
    authorPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marina',
    timestamp: new Date(2024, 0, 15, 10, 30),
    value: 15000,
    status: 'open',
    responses: 3
  },
  {
    id: '2',
    title: 'Investidor para Expansion E-commerce',
    description: 'E-commerce faturando R$ 2M/ano busca investidor para expansão. ROI projetado de 25% ao ano.',
    segment: 'Investimentos',
    author: 'Carlos Eduardo Silva',
    authorPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    timestamp: new Date(2024, 0, 15, 8, 15),
    value: 25000,
    status: 'in_progress',
    responses: 7
  },
  {
    id: '3',
    title: 'Parceiro para Logística Internacional',
    description: 'Empresa de logística procura parceiro com experiência em importação/exportação para América Latina.',
    segment: 'Logística',
    author: 'Roberto Fernandes',
    authorPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    timestamp: new Date(2024, 0, 14, 16, 45),
    status: 'closed',
    responses: 12
  }
];

interface IndicationsScreenProps {
  onBack: () => void;
}

export const IndicationsScreen = ({ onBack }: IndicationsScreenProps) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'my-indications'>('feed');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getStatusColor = (status: Indication['status']) => {
    switch (status) {
      case 'open':
        return 'bg-success/20 text-success border-success/30';
      case 'in_progress':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'closed':
        return 'bg-text-muted/20 text-text-muted border-text-muted/30';
    }
  };

  const getStatusLabel = (status: Indication['status']) => {
    switch (status) {
      case 'open':
        return 'Aberto';
      case 'in_progress':
        return 'Em Andamento';
      case 'closed':
        return 'Fechado';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora há pouco';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d atrás`;
  };

  if (showCreateForm) {
    return <CreateIndicationForm onBack={() => setShowCreateForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-text-secondary hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-playfair text-foreground font-semibold">
              Indicações
            </h1>
          </div>
          
          <Button
            onClick={() => setShowCreateForm(true)}
            className="btn-copper"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mt-4">
          <Button
            onClick={() => setActiveTab('feed')}
            variant={activeTab === 'feed' ? 'default' : 'ghost'}
            className={activeTab === 'feed' ? 'btn-copper' : 'text-text-secondary'}
            size="sm"
          >
            Feed de Oportunidades
          </Button>
          <Button
            onClick={() => setActiveTab('my-indications')}
            variant={activeTab === 'my-indications' ? 'default' : 'ghost'}
            className={activeTab === 'my-indications' ? 'btn-copper' : 'text-text-secondary'}
            size="sm"
          >
            Minhas Indicações
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {mockIndications.map((indication) => (
          <Card key={indication.id} className="card-member p-6 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={indication.authorPhoto}
                  alt={indication.author}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {indication.author}
                  </h3>
                  <p className="text-xs text-text-muted">
                    {formatTime(indication.timestamp)}
                  </p>
                </div>
              </div>
              
              <Badge className={getStatusColor(indication.status)}>
                {getStatusLabel(indication.status)}
              </Badge>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="text-lg font-semibold text-foreground">
                  {indication.title}
                </h4>
                {indication.value && (
                  <div className="flex items-center space-x-1 text-copper">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold">
                      {indication.value.toLocaleString('pt-BR')}
                    </span>
                  </div>
                )}
              </div>
              
              <p className="text-text-secondary text-sm leading-relaxed">
                {indication.description}
              </p>
              
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-copper border-copper/30">
                  {indication.segment}
                </Badge>
                <span className="text-xs text-text-muted flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{indication.responses} respostas</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            {indication.status === 'open' && (
              <div className="flex space-x-3 pt-2">
                <Button variant="outline" className="btn-outline-copper flex-1">
                  Ver Detalhes
                </Button>
                <Button className="btn-copper flex-1">
                  Indicar Contato
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

// Create Indication Form Component
interface CreateIndicationFormProps {
  onBack: () => void;
}

const CreateIndicationForm = ({ onBack }: CreateIndicationFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [segment, setSegment] = useState('');
  const [value, setValue] = useState('');

  const segments = ['Tecnologia', 'Investimentos', 'Logística', 'Varejo', 'Saúde', 'Educação'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onBack();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-playfair text-foreground font-semibold">
            Nova Indicação
          </h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <Card className="card-member p-6 space-y-6">
          <div>
            <label className="text-text-primary font-medium">
              Título da Oportunidade *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Procuro CTO para Fintech"
              className="input-dark mt-2"
              required
            />
          </div>

          <div>
            <label className="text-text-primary font-medium">
              Descrição Detalhada *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva em detalhes o perfil que procura, experiência necessária, benefícios oferecidos..."
              className="w-full input-dark mt-2 min-h-[120px] resize-none"
              required
            />
          </div>

          <div>
            <label className="text-text-primary font-medium">
              Segmento *
            </label>
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              className="w-full input-dark mt-2"
              required
            >
              <option value="">Selecione um segmento</option>
              {segments.map((seg) => (
                <option key={seg} value={seg}>{seg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-text-primary font-medium">
              Valor de Fomento (Opcional)
            </label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0"
              className="input-dark mt-2"
            />
            <p className="text-xs text-text-muted mt-1">
              Valor em reais oferecido por indicação bem-sucedida
            </p>
          </div>
        </Card>

        <div className="flex space-x-3">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 border-border text-text-secondary hover:bg-surface"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="btn-copper flex-1"
          >
            Publicar Indicação
          </Button>
        </div>
      </form>
    </div>
  );
};