import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trophy, TrendingUp, Users, MessageCircle } from 'lucide-react';

interface ProfileData {
  name: string;
  company: string;
  birthYear: number;
  location: string;
  brands: string[];
  revenue: string;
  experience: string;
  results: string;
  hasChildren: boolean;
  hobby: string;
  instagram: string;
  email: string;
  website: string;
  linkedin: string;
  fomentValue: number;
  level: 'membro' | 'socio' | 'infinity';
}

const mockProfile: ProfileData = {
  name: 'João Silva',
  company: 'Silva & Associados',
  birthYear: 1985,
  location: 'São Paulo, SP',
  brands: ['Silva Corp', 'TechSilva', 'Silva Invest'],
  revenue: 'R$ 5-10 milhões',
  experience: '15 anos',
  results: 'Crescimento de 300% em 5 anos, expansão internacional, IPO planejado para 2025',
  hasChildren: true,
  hobby: 'Golf e investimentos',
  instagram: '@joaosilva_ceo',
  email: 'joao@silva.com.br',
  website: 'www.silva.com.br',
  linkedin: 'joao-silva-ceo',
  fomentValue: 50000,
  level: 'socio'
};

interface ProfileScreenProps {
  onBack: () => void;
}

export const ProfileScreen = ({ onBack }: ProfileScreenProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(mockProfile);
  const [editedProfile, setEditedProfile] = useState<ProfileData>(mockProfile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const getMemberLevelBadge = (level: ProfileData['level']) => {
    switch (level) {
      case 'infinity':
        return <Badge className="member-badge--infinity">Infinity</Badge>;
      case 'socio':
        return <Badge className="member-badge--socio">Sócio</Badge>;
      default:
        return <Badge className="member-badge--basic">Membro</Badge>;
    }
  };

  const stats = [
    { icon: Users, label: 'Conexões', value: '45' },
    { icon: MessageCircle, label: 'Conversas', value: '23' },
    { icon: TrendingUp, label: 'Indicações', value: '12' },
    { icon: Trophy, label: 'Ranking', value: '#8' },
  ];

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
              Meu Perfil
            </h1>
          </div>
          
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="ghost"
            size="sm"
            className="text-copper hover:text-copper-light"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card className="card-member p-6">
          <div className="text-center space-y-4">
            <div className="relative mx-auto w-24 h-24">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`}
                alt={profile.name}
                className="w-24 h-24 rounded-xl object-cover bg-surface-elevated"
              />
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 btn-copper text-xs"
                >
                  Alterar
                </Button>
              )}
            </div>
            
            <div className="space-y-2">
              {isEditing ? (
                <Input
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  className="input-dark text-center text-lg font-semibold"
                />
              ) : (
                <h2 className="text-xl font-semibold text-foreground">{profile.name}</h2>
              )}
              
              {isEditing ? (
                <Input
                  value={editedProfile.company}
                  onChange={(e) => setEditedProfile({...editedProfile, company: e.target.value})}
                  className="input-dark text-center"
                />
              ) : (
                <p className="text-text-secondary">{profile.company}</p>
              )}
              
              <div className="flex justify-center">
                {getMemberLevelBadge(profile.level)}
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.label} className="card-member p-4 text-center">
                <IconComponent className="w-6 h-6 text-copper mx-auto mb-2" />
                <div className="text-lg font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-text-muted">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Profile Details */}
        <Card className="card-member p-6 space-y-6">
          <h3 className="text-lg font-playfair text-foreground font-semibold">
            Informações Pessoais
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-text-primary">Ano de Nascimento</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedProfile.birthYear}
                    onChange={(e) => setEditedProfile({...editedProfile, birthYear: parseInt(e.target.value)})}
                    className="input-dark mt-1"
                  />
                ) : (
                  <p className="text-text-secondary mt-1">{profile.birthYear}</p>
                )}
              </div>
              
              <div>
                <Label className="text-text-primary">Localização</Label>
                {isEditing ? (
                  <Input
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                    className="input-dark mt-1"
                  />
                ) : (
                  <p className="text-text-secondary mt-1">{profile.location}</p>
                )}
              </div>
            </div>

            <div>
              <Label className="text-text-primary">Faturamento</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.revenue}
                  onChange={(e) => setEditedProfile({...editedProfile, revenue: e.target.value})}
                  className="input-dark mt-1"
                />
              ) : (
                <p className="text-text-secondary mt-1">{profile.revenue}</p>
              )}
            </div>

            <div>
              <Label className="text-text-primary">Tempo de Atuação</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.experience}
                  onChange={(e) => setEditedProfile({...editedProfile, experience: e.target.value})}
                  className="input-dark mt-1"
                />
              ) : (
                <p className="text-text-secondary mt-1">{profile.experience}</p>
              )}
            </div>

            <div>
              <Label className="text-text-primary">Principais Resultados</Label>
              {isEditing ? (
                <textarea
                  value={editedProfile.results}
                  onChange={(e) => setEditedProfile({...editedProfile, results: e.target.value})}
                  className="w-full input-dark mt-1 min-h-[80px] resize-none"
                />
              ) : (
                <p className="text-text-secondary mt-1 text-sm leading-relaxed">{profile.results}</p>
              )}
            </div>

            <div>
              <Label className="text-text-primary">Hobby</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.hobby}
                  onChange={(e) => setEditedProfile({...editedProfile, hobby: e.target.value})}
                  className="input-dark mt-1"
                />
              ) : (
                <p className="text-text-secondary mt-1">{profile.hobby}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="card-member p-6 space-y-4">
          <h3 className="text-lg font-playfair text-foreground font-semibold">
            Contato & Redes
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-text-primary">Email</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                  className="input-dark mt-1"
                />
              ) : (
                <p className="text-text-secondary mt-1">{profile.email}</p>
              )}
            </div>

            <div>
              <Label className="text-text-primary">LinkedIn</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.linkedin}
                  onChange={(e) => setEditedProfile({...editedProfile, linkedin: e.target.value})}
                  className="input-dark mt-1"
                />
              ) : (
                <p className="text-text-secondary mt-1">@{profile.linkedin}</p>
              )}
            </div>

            <div>
              <Label className="text-text-primary">Instagram</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.instagram}
                  onChange={(e) => setEditedProfile({...editedProfile, instagram: e.target.value})}
                  className="input-dark mt-1"
                />
              ) : (
                <p className="text-text-secondary mt-1">{profile.instagram}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Gamification */}
        <Card className="card-member p-6 space-y-4">
          <h3 className="text-lg font-playfair text-foreground font-semibold">
            Gamificação
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-text-primary">Valor de Fomento</Label>
              <div className="flex items-center space-x-4 mt-2">
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedProfile.fomentValue}
                    onChange={(e) => setEditedProfile({...editedProfile, fomentValue: parseInt(e.target.value)})}
                    className="input-dark flex-1"
                  />
                ) : (
                  <p className="text-copper font-semibold text-lg">
                    R$ {profile.fomentValue.toLocaleString('pt-BR')}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-surface p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Posição no Ranking</span>
                <span className="text-copper font-bold text-xl">#8</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex space-x-3">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 border-border text-text-secondary hover:bg-surface"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="btn-copper flex-1"
            >
              Salvar Alterações
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};