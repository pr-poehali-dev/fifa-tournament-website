import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface UserProfileProps {
  user: {
    id: number;
    username: string;
    email: string;
    rating: number;
    platform: string;
    country: string;
    gameNickname: string;
    avatar?: string;
    wins: number;
    losses: number;
    isCalibrating: boolean;
    calibrationGames: number;
    totalTournaments?: number;
    achievements?: string[];
    telegramNick?: string;
  };
  onEdit?: () => void;
}

const UserProfile = ({ user, onEdit }: UserProfileProps) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'ps5': return '🎮';
      case 'xbox': return '🎯';
      case 'pc': return '💻';
      default: return '🎮';
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'ps5': return 'PlayStation 5';
      case 'xbox': return 'Xbox Series X|S';
      case 'pc': return 'PC';
      default: return platform;
    }
  };

  const getRankTitle = (rating: number) => {
    if (rating < 1200) return { title: 'Новичок', color: 'bg-gray-500' };
    if (rating < 1400) return { title: 'Любитель', color: 'bg-green-500' };
    if (rating < 1600) return { title: 'Опытный', color: 'bg-blue-500' };
    if (rating < 1800) return { title: 'Эксперт', color: 'bg-purple-500' };
    if (rating < 2000) return { title: 'Мастер', color: 'bg-orange-500' };
    return { title: 'Гроссмейстер', color: 'bg-red-500' };
  };

  const rank = getRankTitle(user.rating);
  const winRate = user.wins + user.losses > 0 ? (user.wins / (user.wins + user.losses) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 text-2xl bg-background rounded-full p-1 border border-border">
                  {getPlatformIcon(user.platform)}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">{user.username}</h2>
                <p className="text-muted-foreground">{user.gameNickname}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{user.country}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{getPlatformName(user.platform)}</span>
                </div>
              </div>
            </div>
            {onEdit && (
              <Button variant="outline" onClick={onEdit}>
                <Icon name="Settings" size={16} className="mr-2" />
                Редактировать
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating Section */}
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">{user.rating}</div>
              <Badge className={`${rank.color} text-white mb-2`}>
                {rank.title}
              </Badge>
              {user.isCalibrating && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-1">
                    Калибровка: {user.calibrationGames}/10
                  </p>
                  <Progress value={user.calibrationGames * 10} className="h-2" />
                </div>
              )}
            </div>

            {/* Stats Section */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Побед:</span>
                <span className="text-foreground font-semibold">{user.wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Поражений:</span>
                <span className="text-foreground font-semibold">{user.losses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Процент побед:</span>
                <span className="text-foreground font-semibold">{winRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Турниров:</span>
                <span className="text-foreground font-semibold">{user.totalTournaments || 0}</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground text-sm">{user.email}</span>
              </div>
              {user.telegramNick && (
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">{user.telegramNick}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Icon name="Gamepad2" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground text-sm">ID: {user.id}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <Icon name="Trophy" size={20} className="mr-2" />
            Достижения
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.achievements && user.achievements.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {user.achievements.map((achievement, index) => (
                <div key={index} className="text-center p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="text-2xl mb-2">🏆</div>
                  <p className="text-sm text-foreground">{achievement}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Trophy" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Достижения пока отсутствуют</p>
              <p className="text-sm">Участвуйте в турнирах, чтобы получить награды!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <Icon name="Clock" size={20} className="mr-2" />
            Последняя активность
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <Icon name="Trophy" size={16} className="text-secondary" />
                <span className="text-foreground">Участие в турнире</span>
              </div>
              <span className="text-sm text-muted-foreground">2 часа назад</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <Icon name="TrendingUp" size={16} className="text-primary" />
                <span className="text-foreground">Повышение рейтинга +25</span>
              </div>
              <span className="text-sm text-muted-foreground">1 день назад</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <Icon name="Users" size={16} className="text-blue-500" />
                <span className="text-foreground">Регистрация на платформе</span>
              </div>
              <span className="text-sm text-muted-foreground">3 дня назад</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;