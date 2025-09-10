import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (user: any) => void;
}

const AuthModal = ({ isOpen, onClose, onAuthenticated }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (email: string, password: string) => {
    const mockUser = {
      id: 1,
      username: 'ProGamer_RU',
      email,
      rating: 1500,
      platform: 'ps5',
      country: 'Россия',
      gameNickname: 'ProGamer_RU',
      avatar: null,
      wins: 0,
      losses: 0,
      isCalibrating: true,
      calibrationGames: 0
    };
    onAuthenticated(mockUser);
    onClose();
  };

  const handleRegister = (userData: any) => {
    const mockUser = {
      id: Date.now(),
      ...userData,
      rating: 1500,
      avatar: null,
      wins: 0,
      losses: 0,
      isCalibrating: true,
      calibrationGames: 0
    };
    onAuthenticated(mockUser);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-fit p-0 bg-transparent border-0">
        {isLogin ? (
          <LoginForm 
            onSwitchToRegister={() => setIsLogin(false)}
            onLogin={handleLogin}
          />
        ) : (
          <RegisterForm 
            onSwitchToLogin={() => setIsLogin(true)}
            onRegister={handleRegister}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;