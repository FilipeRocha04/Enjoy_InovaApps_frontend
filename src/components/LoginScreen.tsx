import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import disruptionLogo from '@/assets/disruption-logo.png';

interface LoginScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

export const LoginScreen = ({ onLogin, onRegister }: LoginScreenProps) => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <img 
            src={disruptionLogo} 
            alt="Disruption Community" 
            className="w-20 h-20 mx-auto object-contain"
          />
          <h1 className="text-3xl font-playfair text-copper font-semibold">
            Disruption
          </h1>
          <p className="text-text-secondary font-montserrat">
            Rede exclusiva de empresários
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="cpf" className="text-text-primary font-medium">
                CPF
              </Label>
              <Input
                id="cpf"
                type="text"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                placeholder="000.000.000-00"
                className="input-dark h-12 text-lg"
                maxLength={14}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-text-primary font-medium">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="input-dark h-12 text-lg"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="btn-copper w-full h-12 text-lg font-semibold"
          >
            Entrar
          </Button>
        </form>

        {/* Action Links */}
        <div className="space-y-4 text-center">
          <button
            onClick={onRegister}
            className="text-copper hover:text-copper-light transition-colors font-medium"
          >
            Cadastrar-se
          </button>
          
          <div>
            <button className="text-text-muted hover:text-text-secondary transition-colors text-sm">
              Esqueci a senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};