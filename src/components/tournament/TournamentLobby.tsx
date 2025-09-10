import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface TournamentLobbyProps {
  tournament: any;
  currentUser: any;
  onStartMatch: (opponent: any) => void;
}

const TournamentLobby = ({ tournament, currentUser, onStartMatch }: TournamentLobbyProps) => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      username: 'Система',
      message: 'Добро пожаловать в турнир! У вас есть 4 минуты на добавление игроков в друзья.',
      timestamp: new Date(),
      isSystem: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [currentMatch, setCurrentMatch] = useState(null);
  const [timeLeft, setTimeLeft] = useState(240); // 4 minutes
  const [addFriendsStep, setAddFriendsStep] = useState(true);

  // Mock matches
  const matches = [
    { id: 1, player1: tournament.players[0], player2: tournament.players[1], status: 'pending', score: null },
    { id: 2, player1: tournament.players[2], player2: tournament.players[3], status: 'pending', score: null },
    { id: 3, player1: tournament.players[0], player2: tournament.players[2], status: 'pending', score: null },
    { id: 4, player1: tournament.players[1], player2: tournament.players[3], status: 'pending', score: null },
    { id: 5, player1: tournament.players[0], player2: tournament.players[3], status: 'pending', score: null },
    { id: 6, player1: tournament.players[1], player2: tournament.players[2], status: 'pending', score: null }
  ];

  useEffect(() => {
    if (addFriendsStep) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setAddFriendsStep(false);
            setChatMessages(prev => [...prev, {
              id: Date.now(),
              username: 'Система',
              message: 'Время на добавление в друзья истекло. Начинаем турнир!',
              timestamp: new Date(),
              isSystem: true
            }]);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [addFriendsStep]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        username: currentUser.username,
        message: newMessage,
        timestamp: new Date(),
        isSystem: false
      }]);
      setNewMessage('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'ps5': return '🎮';
      case 'xbox': return '🎯';
      case 'pc': return '💻';
      default: return '🎮';
    }
  };

  const getMyMatches = () => {
    return matches.filter(match => 
      match.player1.id === currentUser.id || match.player2.id === currentUser.id
    );
  };

  const getOpponent = (match: any) => {
    return match.player1.id === currentUser.id ? match.player2 : match.player1;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {addFriendsStep ? (
          /* Add Friends Step */
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-foreground">
                <div className="flex items-center">
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Добавление в друзья
                </div>
                <Badge variant="outline" className="border-primary text-primary">
                  {formatTime(timeLeft)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={16} className="text-orange-500" />
                  <span className="text-foreground font-semibold">Важно!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Добавьте всех игроков в друзья в FIFA для приглашения в матчи. 
                  У вас есть 4 минуты на выполнение этого действия.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tournament.players
                  .filter((player: any) => player.id !== currentUser.id)
                  .map((player: any) => (
                  <div key={player.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
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
                      <div>
                        <p className="font-semibold text-foreground">{player.username}</p>
                        <p className="text-sm text-muted-foreground">{player.gameNickname}</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                      <Icon name="UserPlus" size={14} className="mr-1" />
                      Добавить
                    </Button>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setAddFriendsStep(false)}
                >
                  Все добавлены, продолжить
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Tournament Tabs */
          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted">
              <TabsTrigger value="matches">Матчи</TabsTrigger>
              <TabsTrigger value="schedule">Расписание</TabsTrigger>
              <TabsTrigger value="table">Таблица</TabsTrigger>
              <TabsTrigger value="main">Главная</TabsTrigger>
            </TabsList>

            <TabsContent value="matches" className="mt-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Мои матчи</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getMyMatches().map((match, index) => {
                    const opponent = getOpponent(match);
                    return (
                      <div key={match.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline" className="text-xs">
                            Матч {index + 1}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{currentUser.username}</span>
                            <span className="text-muted-foreground">VS</span>
                            <span className="font-medium text-foreground">{opponent.username}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {match.status === 'pending' && (
                            <Button 
                              size="sm" 
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => onStartMatch(opponent)}
                            >
                              <Icon name="Play" size={14} className="mr-1" />
                              Начать матч
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Расписание турнира</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {matches.map((match, index) => (
                      <div key={match.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="text-xs">
                            Матч {index + 1}
                          </Badge>
                          <span className="text-foreground">
                            {match.player1.username} VS {match.player2.username}
                          </span>
                        </div>
                        <Badge variant={match.status === 'pending' ? 'outline' : 'secondary'}>
                          {match.status === 'pending' ? 'Ожидание' : 'Завершен'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="table" className="mt-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Турнирная таблица</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tournament.players.map((player: any, index: number) => (
                      <div key={player.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                        player.id === currentUser.id ? 'bg-primary/10 border-primary' : 'bg-muted/50 border-border'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                                {player.username.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">{player.username}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-foreground">0 очков</div>
                          <div className="text-xs text-muted-foreground">0-0-0</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="main" className="mt-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Информация о турнире</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">4</div>
                      <div className="text-sm text-muted-foreground">Участников</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">6</div>
                      <div className="text-sm text-muted-foreground">Матчей</div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Правила турнира:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Каждый игрок играет с каждым по одному матчу</li>
                      <li>• Победа - 3 очка, ничья - 1 очко, поражение - 0 очков</li>
                      <li>• На каждый матч отводится максимум 20 минут</li>
                      <li>• Обязательно подтверждение результата фотографией</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Chat Sidebar */}
      <div className="lg:col-span-1">
        <Card className="border-border h-[600px] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-foreground">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Чат турнира
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4 pt-0">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.isSystem ? 'justify-center' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-2 rounded-lg text-sm ${
                      message.isSystem 
                        ? 'bg-blue-500/10 border border-blue-500/20 text-center' 
                        : message.username === currentUser.username
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-muted text-foreground'
                    }`}>
                      {!message.isSystem && (
                        <div className="font-semibold text-xs mb-1 opacity-70">
                          {message.username}
                        </div>
                      )}
                      <div>{message.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex space-x-2 mt-4">
              <Input
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="border-border bg-background text-foreground"
              />
              <Button size="sm" onClick={sendMessage} className="bg-primary hover:bg-primary/90">
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TournamentLobby;