import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface TournamentSearchProps {
  user: any;
  onTournamentFound: (tournament: any) => void;
}

const TournamentSearch = ({ user, onTournamentFound }: TournamentSearchProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [playersFound, setPlayersFound] = useState(0);

  const startSearch = () => {
    setIsSearching(true);
    setSearchProgress(0);
    setPlayersFound(1); // Current user
    setEstimatedTime(60);

    // Simulate matchmaking process
    const searchInterval = setInterval(() => {
      setSearchProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        // Simulate finding players
        if (newProgress > 25 && playersFound === 1) {
          setPlayersFound(2);
        } else if (newProgress > 50 && playersFound === 2) {
          setPlayersFound(3);
        } else if (newProgress > 75 && playersFound === 3) {
          setPlayersFound(4);
        }

        if (newProgress >= 100) {
          clearInterval(searchInterval);
          // Create mock tournament
          const tournament = {
            id: Date.now(),
            players: [
              { 
                id: user.id, 
                username: user.username, 
                rating: user.rating, 
                platform: user.platform,
                gameNickname: user.gameNickname,
                ready: false
              },
              { 
                id: 2, 
                username: 'FifaMaster', 
                rating: 1520, 
                platform: 'ps5',
                gameNickname: 'FifaMaster_PS',
                ready: false
              },
              { 
                id: 3, 
                username: 'GoalMachine', 
                rating: 1480, 
                platform: 'xbox',
                gameNickname: 'GoalMachine99',
                ready: false
              },
              { 
                id: 4, 
                username: 'SkillShot', 
                rating: 1510, 
                platform: 'pc',
                gameNickname: 'SkillShot_Pro',
                ready: false
              }
            ],
            status: 'found',
            createdAt: new Date(),
            readyTimeLeft: 30
          };
          onTournamentFound(tournament);
          return 100;
        }
        return newProgress;
      });
    }, 500);

    // Estimated time countdown
    const timeInterval = setInterval(() => {
      setEstimatedTime(prev => {
        if (prev <= 0) {
          clearInterval(timeInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSearch = () => {
    setIsSearching(false);
    setSearchProgress(0);
    setPlayersFound(0);
    setEstimatedTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Icon name="Search" size={20} className="mr-2" />
          Поиск турнира
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isSearching ? (
          <div className="text-center space-y-4">
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <Icon name="Trophy" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Быстрый турнир 4 игрока
              </h3>
              <p className="text-muted-foreground mb-4">
                Найдем вам соперников с похожим рейтингом для честной игры
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Users" size={16} className="text-secondary" />
                  <span className="text-foreground">4 игрока</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Clock" size={16} className="text-secondary" />
                  <span className="text-foreground">~5-10 мин</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Target" size={16} className="text-secondary" />
                  <span className="text-foreground">Рейтинг: ±100</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Gamepad2" size={16} className="text-secondary" />
                  <span className="text-foreground">{user.platform.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-foreground">Ваш рейтинг:</span>
                <Badge variant="outline" className="border-primary text-primary">
                  {user.rating}
                  {user.isCalibrating && ' (калибровка)'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-foreground">Платформа:</span>
                <span className="text-foreground font-semibold">
                  {user.platform === 'ps5' ? 'PlayStation 5' : 
                   user.platform === 'xbox' ? 'Xbox Series X|S' : 'PC'}
                </span>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={startSearch}
            >
              <Icon name="Play" size={20} className="mr-2" />
              Найти турнир
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="p-6">
              <Icon name="Loader2" size={48} className="mx-auto mb-4 text-primary animate-spin" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Поиск соперников...
              </h3>
              <p className="text-muted-foreground">
                Подбираем игроков с похожим рейтингом
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Прогресс поиска</span>
                  <span className="text-sm text-foreground">{Math.round(searchProgress)}%</span>
                </div>
                <Progress value={searchProgress} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{playersFound}/4</div>
                  <div className="text-sm text-muted-foreground">Игроков найдено</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{formatTime(estimatedTime)}</div>
                  <div className="text-sm text-muted-foreground">Осталось времени</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm text-foreground">{user.username}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">Вы</Badge>
                </div>
                {playersFound > 1 && (
                  <div className="flex items-center justify-between p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm text-foreground">FifaMaster</span>
                    </div>
                    <Badge variant="outline" className="text-xs">1520</Badge>
                  </div>
                )}
                {playersFound > 2 && (
                  <div className="flex items-center justify-between p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm text-foreground">GoalMachine</span>
                    </div>
                    <Badge variant="outline" className="text-xs">1480</Badge>
                  </div>
                )}
                {playersFound > 3 && (
                  <div className="flex items-center justify-between p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm text-foreground">SkillShot</span>
                    </div>
                    <Badge variant="outline" className="text-xs">1510</Badge>
                  </div>
                )}
              </div>
            </div>

            <Button 
              variant="outline" 
              size="lg" 
              className="w-full border-border"
              onClick={cancelSearch}
            >
              <Icon name="X" size={16} className="mr-2" />
              Отменить поиск
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TournamentSearch;