import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Search, ArrowLeft, MessageCircle, TrendingUp, Instagram, Linkedin, Mail } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  company: string;
  segment: string;
  level: 'membro' | 'socio' | 'infinity';
  photo: string;
  bio: string;
  instagram?: string;
  linkedin?: string;
  email?: string;
}

// Mock data
const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Carlos Eduardo Silva',
    company: 'TechVision Corp',
    segment: 'Tecnologia',
    level: 'infinity',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    bio: 'CEO visionário com 15 anos transformando startups em unicórnios. Especialista em scale-up e inovação disruptiva.',
    instagram: '@carloseduardo',
    linkedin: 'carlos-eduardo-silva',
    email: 'carlos@techvision.com'
  },
  {
    id: '2',
    name: 'Marina Santos',
    company: 'InvestMax Capital',
    segment: 'Investimentos',
    level: 'socio',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marina',
    bio: 'Sócia-fundadora especializada em venture capital. Portfolio de R$ 500M+ em investimentos estratégicos.',
    linkedin: 'marina-santos-investmax',
    email: 'marina@investmax.com.br'
  },
  {
    id: '3',
    name: 'Roberto Fernandes',
    company: 'Global Logistics',
    segment: 'Logística',
    level: 'membro',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    bio: 'Diretor operacional com expertise em supply chain internacional. Líder em otimização logística.',
    email: 'roberto@globallogistics.com'
  }
];

const segments = ['Todos', 'Tecnologia', 'Investimentos', 'Logística', 'Varejo', 'Saúde', 'Educação'];

interface MembersListProps {
  onBack: () => void;
  onMemberSelect: (member: Member) => void;
}

export const MembersList = ({ onBack, onMemberSelect }: MembersListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('Todos');

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = selectedSegment === 'Todos' || member.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  const getMemberLevelBadge = (level: Member['level']) => {
    switch (level) {
      case 'infinity':
        return <Badge className="member-badge--infinity">Infinity</Badge>;
      case 'socio':
        return <Badge className="member-badge--socio">Sócio</Badge>;
      default:
        return <Badge className="member-badge--basic">Membro</Badge>;
    }
  };

  const getMemberCardClass = (level: Member['level']) => {
    switch (level) {
      case 'infinity':
        return 'card-member--infinity';
      case 'socio':
        return 'card-member--socio';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 space-y-4">
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
            Membros da Rede
          </h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome ou empresa..."
            className="input-dark pl-10"
          />
        </div>

        {/* Segment Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {segments.map((segment) => (
            <Button
              key={segment}
              onClick={() => setSelectedSegment(segment)}
              variant={selectedSegment === segment ? "default" : "outline"}
              size="sm"
              className={selectedSegment === segment 
                ? "btn-copper whitespace-nowrap" 
                : "btn-outline-copper whitespace-nowrap"
              }
            >
              {segment}
            </Button>
          ))}
        </div>
      </div>

      {/* Members List */}
      <div className="p-4 space-y-4">
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted">Nenhum membro encontrado</p>
          </div>
        ) : (
          filteredMembers.map((member) => (
            <Card
              key={member.id}
              className={`card-member cursor-pointer ${getMemberCardClass(member.level)}`}
              onClick={() => onMemberSelect(member)}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-16 h-16 rounded-xl object-cover bg-surface"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground truncate">
                        {member.name}
                      </h3>
                      <p className="text-sm text-text-secondary truncate">
                        {member.company}
                      </p>
                      <p className="text-xs text-text-muted">
                        {member.segment}
                      </p>
                    </div>
                    {getMemberLevelBadge(member.level)}
                  </div>
                  
                  <p className="text-sm text-text-secondary mt-2 line-clamp-2">
                    {member.bio}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

// Member Detail Modal Component
interface MemberDetailProps {
  member: Member;
  onClose: () => void;
  onMessage: () => void;
  onIndicate: () => void;
}

export const MemberDetail = ({ member, onClose, onMessage, onIndicate }: MemberDetailProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-surface p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-playfair text-foreground font-semibold">
            Perfil do Membro
          </h2>
          <Button onClick={onClose} variant="ghost" size="sm">
            ✕
          </Button>
        </div>

        <div className="text-center space-y-4">
          <img
            src={member.photo}
            alt={member.name}
            className="w-24 h-24 rounded-xl mx-auto object-cover bg-surface-elevated"
          />
          
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {member.name}
            </h3>
            <p className="text-text-secondary">{member.company}</p>
            <p className="text-sm text-text-muted">{member.segment}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Bio</h4>
          <p className="text-sm text-text-secondary leading-relaxed">
            {member.bio}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4">
          {member.instagram && (
            <Button variant="ghost" size="sm" className="text-copper hover:text-copper-light">
              <Instagram className="w-4 h-4" />
            </Button>
          )}
          {member.linkedin && (
            <Button variant="ghost" size="sm" className="text-copper hover:text-copper-light">
              <Linkedin className="w-4 h-4" />
            </Button>
          )}
          {member.email && (
            <Button variant="ghost" size="sm" className="text-copper hover:text-copper-light">
              <Mail className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            onClick={onIndicate}
            className="btn-outline-copper flex-1 flex items-center justify-center space-x-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Indicar</span>
          </Button>
          
          <Button
            onClick={onMessage}
            className="btn-copper flex-1 flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Mensagem</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};