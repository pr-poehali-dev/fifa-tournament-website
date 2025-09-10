import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface MatchResultProps {
  match: {
    player1: any;
    player2: any;
    currentUser: any;
  };
  onSubmitResult: (result: any) => void;
  onCancel: () => void;
}

const MatchResult = ({ match, onSubmitResult, onCancel }: MatchResultProps) => {
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { player1, player2, currentUser } = match;
  const opponent = player1.id === currentUser.id ? player2 : player1;
  const isPlayer1 = player1.id === currentUser.id;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!score1 || !score2 || !screenshot) {
      alert('Заполните все поля и загрузите скриншот результата');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = {
        player1Score: parseInt(score1),
        player2Score: parseInt(score2),
        screenshot: URL.createObjectURL(screenshot),
        submittedBy: currentUser.id,
        timestamp: new Date()
      };
      onSubmitResult(result);
      setIsSubmitting(false);
    }, 1500);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'ps5': return '🎮';
      case 'xbox': return '🎯';
      case 'pc': return '💻';
      default: return '🎮';
    }
  };

  return (
    <Card className="border-border max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Icon name="Trophy" size={20} className="mr-2" />
          Результат матча
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Players Display */}
          <div className="flex items-center justify-center space-x-6">
            <div className="text-center">
              <div className="relative mb-3">
                <Avatar className="w-16 h-16 mx-auto">
                  <AvatarFallback className="bg-primary/20 text-primary text-xl">
                    {player1.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 text-lg">
                  {getPlatformIcon(player1.platform)}
                </div>
              </div>
              <h3 className="font-semibold text-foreground">{player1.username}</h3>
              <p className="text-sm text-muted-foreground">{player1.gameNickname}</p>
              {player1.id === currentUser.id && (
                <Badge variant="outline" className="mt-1 text-xs">Вы</Badge>
              )}
            </div>

            <div className="text-4xl font-bold text-muted-foreground">VS</div>

            <div className="text-center">
              <div className="relative mb-3">
                <Avatar className="w-16 h-16 mx-auto">
                  <AvatarFallback className="bg-primary/20 text-primary text-xl">
                    {player2.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 text-lg">
                  {getPlatformIcon(player2.platform)}
                </div>
              </div>
              <h3 className="font-semibold text-foreground">{player2.username}</h3>
              <p className="text-sm text-muted-foreground">{player2.gameNickname}</p>
              {player2.id === currentUser.id && (
                <Badge variant="outline" className="mt-1 text-xs">Вы</Badge>
              )}
            </div>
          </div>

          {/* Score Input */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground text-center">
              Введите результат матча
            </h4>
            
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <Label htmlFor="score1" className="text-foreground">
                  {player1.username}
                </Label>
                <Input
                  id="score1"
                  type="number"
                  min="0"
                  max="20"
                  placeholder="0"
                  value={score1}
                  onChange={(e) => setScore1(e.target.value)}
                  className="border-border bg-background text-foreground text-center text-2xl font-bold w-20 h-16 mt-2"
                  required
                />
              </div>
              
              <div className="text-2xl font-bold text-muted-foreground pt-8">:</div>
              
              <div className="text-center">
                <Label htmlFor="score2" className="text-foreground">
                  {player2.username}
                </Label>
                <Input
                  id="score2"
                  type="number"
                  min="0"
                  max="20"
                  placeholder="0"
                  value={score2}
                  onChange={(e) => setScore2(e.target.value)}
                  className="border-border bg-background text-foreground text-center text-2xl font-bold w-20 h-16 mt-2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Screenshot Upload */}
          <div className="space-y-3">
            <Label htmlFor="screenshot" className="text-foreground">
              Скриншот результата матча *
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                id="screenshot"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <Label htmlFor="screenshot" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  <Icon name="Upload" size={32} className="text-muted-foreground" />
                  <div>
                    <p className="text-foreground font-medium">
                      {screenshot ? screenshot.name : 'Загрузить скриншот'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG до 10МБ
                    </p>
                  </div>
                </div>
              </Label>
            </div>
            {screenshot && (
              <div className="flex items-center space-x-2 text-sm text-secondary">
                <Icon name="Check" size={16} />
                <span>Файл загружен: {screenshot.name}</span>
              </div>
            )}
          </div>

          {/* Important Info */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-blue-500 mt-0.5" />
              <div className="text-sm">
                <p className="text-foreground font-semibold mb-1">Важная информация:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Скриншот должен четко показывать финальный счет матча</li>
                  <li>• Результат будет отправлен сопернику для подтверждения</li>
                  <li>• В случае спора администрация рассмотрит доказательства</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button 
              type="submit" 
              size="lg" 
              className="flex-1 bg-secondary hover:bg-secondary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить результат
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="lg"
              onClick={onCancel}
              disabled={isSubmitting}
              className="border-border"
            >
              <Icon name="X" size={16} className="mr-2" />
              Отмена
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MatchResult;