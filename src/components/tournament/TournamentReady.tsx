import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface TournamentReadyProps {
  tournament: any;
  currentUser: any;
  onReady: () => void;
  onDecline: () => void;
  onAllReady: (tournament: any) => void;
}

const TournamentReady = ({ tournament, currentUser, onReady, onDecline, onAllReady }: TournamentReadyProps) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-decline if not ready
          if (!isReady) {
            onDecline();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isReady, onDecline]);

  const handleReady = () => {
    setIsReady(true);
    onReady();
    
    // Simulate other players getting ready
    setTimeout(() => {
      const updatedTournament = {
        ...tournament,
        players: tournament.players.map((player: any) => ({
          ...player,
          ready: true
        }))
      };
      onAllReady(updatedTournament);
    }, 2000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'ps5': return '🎮';
      case 'xbox': return '🎯';
      case 'pc': return '💻';
      default: return '🎮';
    }
  };

  const readyCount = tournament.players.filter((p: any) => p.ready).length + (isReady ? 1 : 0);
  const progressPercent = (readyCount / tournament.players.length) * 100;

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-center text-foreground">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Trophy" size={24} className="text-primary mr-2" />
            Турнир найден!
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timer */}
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">{timeLeft}с</div>
          <Progress value={(timeLeft / 30) * 100} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            Подтвердите участие в турнире
          </p>
        </div>

        {/* Players Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Участники турнира</h3>
            <Badge variant="outline" className="border-primary text-primary">
              {readyCount}/4 готовы
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {tournament.players.map((player: any) => (
              <div key={player.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg border border-border">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {player.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 text-sm">
                    {getPlatformIcon(player.platform)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {player.username}
                    {player.id === currentUser.id && ' (Вы)'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Рейтинг: {player.rating}
                  </p>
                </div>
                <div className="flex items-center">
                  {(player.ready || (player.id === currentUser.id && isReady)) ? (
                    <Icon name="Check" size={16} className="text-secondary" />
                  ) : (
                    <Icon name="Clock" size={16} className="text-muted-foreground animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Ready Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Готовность участников</span>
              <span className="text-foreground">{readyCount}/4</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>

        {/* Action Buttons */}
        {!isReady ? (
          <div className="space-y-3">
            <Button 
              size="lg" 
              className="w-full bg-secondary hover:bg-secondary/90"
              onClick={handleReady}
            >
              <Icon name="Check" size={20} className="mr-2" />
              Готов к игре!
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full border-border text-muted-foreground hover:text-foreground"
              onClick={onDecline}
            >
              <Icon name="X" size={16} className="mr-2" />
              Отказаться
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2 p-4 bg-secondary/20 rounded-lg border border-secondary">
              <Icon name="Check" size={24} className="text-secondary" />
              <span className="text-lg font-semibold text-foreground">Вы готовы к игре!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Ожидаем готовности остальных участников...
            </p>
            <div className="flex items-center justify-center space-x-1">
              <Icon name="Loader2" size={16} className="animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Проверяем готовность игроков</span>
            </div>
          </div>
        )}

        {/* Tournament Info */}
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Формат:</span>
              <span className="text-foreground font-semibold">4 игрока</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Время:</span>
              <span className="text-foreground font-semibold">~20 мин</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Trophy" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Тип:</span>
              <span className="text-foreground font-semibold">Рейтинговый</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Режим:</span>
              <span className="text-foreground font-semibold">Каждый с каждым</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TournamentReady;