import { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/SplashScreen';
import { LoginScreen } from '@/components/LoginScreen';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { Dashboard } from '@/components/Dashboard';
import { MembersList, MemberDetail } from '@/components/MembersList';
import { ChatScreen } from '@/components/ChatScreen';
import { ProfileScreen } from '@/components/ProfileScreen';
import { IndicationsScreen } from '@/components/IndicationsScreen';

type AppState = 'splash' | 'login' | 'onboarding' | 'dashboard' | 'members' | 'chat' | 'profile' | 'indications';

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

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(true);

  // Simulate checking if user is first time
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('disruption_onboarding_completed');
    setIsFirstTime(!hasCompletedOnboarding);
  }, []);

  const handleSplashComplete = () => {
    setCurrentState('login');
  };

  const handleLogin = () => {
    if (isFirstTime) {
      setCurrentState('onboarding');
    } else {
      setCurrentState('dashboard');
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('disruption_onboarding_completed', 'true');
    setIsFirstTime(false);
    setCurrentState('dashboard');
  };

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'members':
        setCurrentState('members');
        break;
      case 'messages':
        setCurrentState('chat');
        break;
      case 'profile':
        setCurrentState('profile');
        break;
      case 'indications':
        setCurrentState('indications');
        break;
      default:
        setCurrentState('dashboard');
    }
  };

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member);
  };

  const handleMemberDetailClose = () => {
    setSelectedMember(null);
  };

  const handleMemberMessage = () => {
    setSelectedMember(null);
    setCurrentState('chat');
  };

  const handleMemberIndicate = () => {
    setSelectedMember(null);
    setCurrentState('indications');
  };

  const handleBackToDashboard = () => {
    setCurrentState('dashboard');
  };

  // Render current screen
  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case 'login':
        return (
          <LoginScreen 
            onLogin={handleLogin}
            onRegister={() => {/* Handle registration */}}
          />
        );
      
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      
      case 'members':
        return (
          <MembersList 
            onBack={handleBackToDashboard}
            onMemberSelect={handleMemberSelect}
          />
        );
      
      case 'chat':
        return <ChatScreen onBack={handleBackToDashboard} />;
      
      case 'profile':
        return <ProfileScreen onBack={handleBackToDashboard} />;
      
      case 'indications':
        return <IndicationsScreen onBack={handleBackToDashboard} />;
      
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-montserrat">
      {renderCurrentScreen()}
      
      {/* Member Detail Modal */}
      {selectedMember && (
        <MemberDetail
          member={selectedMember}
          onClose={handleMemberDetailClose}
          onMessage={handleMemberMessage}
          onIndicate={handleMemberIndicate}
        />
      )}
    </div>
  );
};

export default Index;
