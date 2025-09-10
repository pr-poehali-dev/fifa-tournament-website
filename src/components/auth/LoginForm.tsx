import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onLogin: (email: string, password: string) => void;
}

const LoginForm = ({ onSwitchToRegister, onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-border">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Icon name="Trophy" size={32} className="text-primary mr-2" />
          <h1 className="text-2xl font-bold text-foreground">FIFA TOURNAMENTS</h1>
        </div>
        <CardTitle className="text-2xl text-foreground">Вход в аккаунт</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Введите ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-border bg-background text-foreground"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="text-foreground">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-border bg-background text-foreground"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <Label htmlFor="remember" className="text-sm text-muted-foreground">
                Запомнить меня
              </Label>
            </div>
            <Button variant="link" className="p-0 h-auto text-primary">
              Забыли пароль?
            </Button>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Вход...
              </>
            ) : (
              'Войти'
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Или войти через</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-border">
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Telegram
            </Button>
            <Button variant="outline" className="border-border">
              <Icon name="Users" size={16} className="mr-2" />
              ВКонтакте
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Нет аккаунта?{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary"
              onClick={onSwitchToRegister}
            >
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;