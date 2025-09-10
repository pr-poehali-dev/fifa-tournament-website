import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRegister: (userData: RegisterData) => void;
}

interface RegisterData {
  username: string;
  email: string;
  phone: string;
  country: string;
  platform: string;
  gameNickname: string;
  password: string;
  birthDate?: string;
  telegramNick?: string;
}

const RegisterForm = ({ onSwitchToLogin, onRegister }: RegisterFormProps) => {
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    phone: '',
    country: '',
    platform: '',
    gameNickname: '',
    password: '',
    birthDate: '',
    telegramNick: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const countries = [
    'Россия', 'Беларусь', 'Казахстан', 'Украина', 'Узбекистан', 
    'Кыргызстан', 'Таджикистан', 'Туркменистан', 'Молдова', 'Армения', 'Грузия'
  ];

  const platforms = [
    { value: 'ps5', label: 'PlayStation 5' },
    { value: 'xbox', label: 'Xbox Series X|S' },
    { value: 'pc', label: 'PC (Origin/Steam/Epic)' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    if (!agreeToTerms) {
      alert('Необходимо согласие с правилами платформы');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      onRegister(formData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-border">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Icon name="Trophy" size={32} className="text-primary mr-2" />
          <h1 className="text-2xl font-bold text-foreground">FIFA TOURNAMENTS</h1>
        </div>
        <CardTitle className="text-2xl text-foreground">Регистрация</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="username" className="text-foreground">
                Имя пользователя *
              </Label>
              <Input
                id="username"
                placeholder="Введите никнейм"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="border-border bg-background text-foreground"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-foreground">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.ru"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="border-border bg-background text-foreground"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-foreground">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="border-border bg-background text-foreground"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="country" className="text-foreground">Страна *</Label>
              <Select onValueChange={(value) => setFormData({...formData, country: value})}>
                <SelectTrigger className="border-border bg-background text-foreground">
                  <SelectValue placeholder="Выберите страну" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="platform" className="text-foreground">Платформа *</Label>
              <Select onValueChange={(value) => setFormData({...formData, platform: value})}>
                <SelectTrigger className="border-border bg-background text-foreground">
                  <SelectValue placeholder="Выберите платформу" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="gameNickname" className="text-foreground">
                Никнейм в игре *
              </Label>
              <Input
                id="gameNickname"
                placeholder="Ваш ник в FIFA"
                value={formData.gameNickname}
                onChange={(e) => setFormData({...formData, gameNickname: e.target.value})}
                className="border-border bg-background text-foreground"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password" className="text-foreground">Пароль *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Минимум 8 символов"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="border-border bg-background text-foreground"
                required
                minLength={8}
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="text-foreground">
                Подтверждение пароля *
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Повторите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-border bg-background text-foreground"
                required
              />
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Дополнительная информация (необязательно)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthDate" className="text-foreground">Дата рождения</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  className="border-border bg-background text-foreground"
                />
              </div>
              
              <div>
                <Label htmlFor="telegramNick" className="text-foreground">Telegram</Label>
                <Input
                  id="telegramNick"
                  placeholder="@username"
                  value={formData.telegramNick}
                  onChange={(e) => setFormData({...formData, telegramNick: e.target.value})}
                  className="border-border bg-background text-foreground"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
            />
            <Label htmlFor="terms" className="text-sm text-muted-foreground">
              Я согласен с{' '}
              <Button variant="link" className="p-0 h-auto text-primary">
                правилами платформы
              </Button>
              {' '}и{' '}
              <Button variant="link" className="p-0 h-auto text-primary">
                политикой конфиденциальности
              </Button>
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Регистрация...
              </>
            ) : (
              'Создать аккаунт'
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary"
              onClick={onSwitchToLogin}
            >
              Войти
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;