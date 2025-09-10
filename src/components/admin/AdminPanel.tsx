import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

interface AdminPanelProps {
  currentAdmin: {
    id: number;
    username: string;
    role: 'admin' | 'moderator' | 'security';
  };
}

const AdminPanel = ({ currentAdmin }: AdminPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  // Mock data
  const users = [
    {
      id: 1,
      username: 'ProGamer_RU',
      email: 'progamer@example.com',
      rating: 1850,
      platform: 'ps5',
      country: 'Россия',
      status: 'active',
      role: 'player',
      registeredAt: '2024-01-15',
      lastLogin: '2024-03-10 15:30'
    },
    {
      id: 2,
      username: 'FifaMaster',
      email: 'master@example.com',
      rating: 1720,
      platform: 'xbox',
      country: 'Беларусь',
      status: 'active',
      role: 'player',
      registeredAt: '2024-02-01',
      lastLogin: '2024-03-09 18:45'
    }
  ];

  const tournaments = [
    {
      id: 1,
      name: 'Быстрый турнир #156',
      players: ['ProGamer_RU', 'FifaMaster', 'GoalMachine', 'SkillShot'],
      status: 'completed',
      createdAt: '2024-03-10 14:00',
      completedAt: '2024-03-10 15:30',
      disputes: 0
    },
    {
      id: 2,
      name: 'Быстрый турнир #157',
      players: ['TacticalGenius', 'SpeedDemon', 'Champion_2024', 'FifaKing'],
      status: 'active',
      createdAt: '2024-03-10 16:00',
      completedAt: null,
      disputes: 1
    }
  ];

  const disputes = [
    {
      id: 1,
      tournamentId: 2,
      reportedBy: 'TacticalGenius',
      reportedPlayer: 'SpeedDemon',
      type: 'result_dispute',
      description: 'Неправильный результат матча',
      status: 'pending',
      createdAt: '2024-03-10 16:45',
      evidence: ['screenshot1.jpg']
    }
  ];

  const logs = [
    {
      id: 1,
      action: 'user_registration',
      performedBy: 'system',
      target: 'NewPlayer123',
      timestamp: '2024-03-10 16:30',
      details: 'Новая регистрация пользователя'
    },
    {
      id: 2,
      action: 'rating_change',
      performedBy: 'system',
      target: 'ProGamer_RU',
      timestamp: '2024-03-10 15:30',
      details: 'Рейтинг изменен: 1825 -> 1850 (+25)'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { variant: 'default', text: 'Активен' },
      suspended: { variant: 'destructive', text: 'Заблокирован' },
      pending: { variant: 'secondary', text: 'Ожидание' },
      completed: { variant: 'outline', text: 'Завершен' }
    };
    const config = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge variant={config.variant as any}>{config.text}</Badge>;
  };

  const getPlatformIcon = (platform: string) => {
    const icons = {
      ps5: '🎮',
      xbox: '🎯',
      pc: '💻'
    };
    return icons[platform as keyof typeof icons] || '🎮';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-foreground">Административная панель</CardTitle>
              <p className="text-muted-foreground">
                Добро пожаловать, {currentAdmin.username} ({currentAdmin.role})
              </p>
            </div>
            <Badge variant="outline" className="border-primary text-primary">
              {currentAdmin.role === 'admin' ? 'Администратор' : 
               currentAdmin.role === 'moderator' ? 'Модератор' : 'Служба безопасности'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-muted">
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="tournaments">Турниры</TabsTrigger>
          <TabsTrigger value="disputes">Споры</TabsTrigger>
          <TabsTrigger value="logs">Логи</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        {/* Users Management */}
        <TabsContent value="users" className="mt-6">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Управление пользователями</CardTitle>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Поиск пользователей..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 border-border"
                  />
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все роли</SelectItem>
                      <SelectItem value="player">Игроки</SelectItem>
                      <SelectItem value="moderator">Модераторы</SelectItem>
                      <SelectItem value="admin">Администраторы</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-foreground">{user.username}</h4>
                          <span className="text-lg">{getPlatformIcon(user.platform)}</span>
                          {getStatusBadge(user.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Рейтинг: {user.rating}</span>
                          <span>Страна: {user.country}</span>
                          <span>Регистрация: {user.registeredAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-border">
                        <Icon name="Edit" size={14} className="mr-1" />
                        Редактировать
                      </Button>
                      <Button size="sm" variant="outline" className="border-border">
                        <Icon name="Ban" size={14} className="mr-1" />
                        Заблокировать
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tournaments Management */}
        <TabsContent value="tournaments" className="mt-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Управление турнирами</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Название</TableHead>
                    <TableHead>Участники</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Создан</TableHead>
                    <TableHead>Споры</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tournaments.map((tournament) => (
                    <TableRow key={tournament.id}>
                      <TableCell>#{tournament.id}</TableCell>
                      <TableCell className="font-medium">{tournament.name}</TableCell>
                      <TableCell>{tournament.players.length} игроков</TableCell>
                      <TableCell>{getStatusBadge(tournament.status)}</TableCell>
                      <TableCell>{tournament.createdAt}</TableCell>
                      <TableCell>
                        {tournament.disputes > 0 ? (
                          <Badge variant="destructive">{tournament.disputes}</Badge>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Icon name="Eye" size={12} />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="Edit" size={12} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Disputes Management */}
        <TabsContent value="disputes" className="mt-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Спорные ситуации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <div key={dispute.id} className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="border-orange-500 text-orange-500">
                            #{dispute.id}
                          </Badge>
                          <span className="font-semibold text-foreground">
                            {dispute.type === 'result_dispute' ? 'Спор о результате' : 'Другой спор'}
                          </span>
                          {getStatusBadge(dispute.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>{dispute.reportedBy}</strong> подал жалобу на <strong>{dispute.reportedPlayer}</strong>
                        </p>
                        <p className="text-foreground">{dispute.description}</p>
                        <div className="text-xs text-muted-foreground">
                          Турнир #{dispute.tournamentId} • {dispute.createdAt}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                          Принять
                        </Button>
                        <Button size="sm" variant="outline" className="border-border">
                          Отклонить
                        </Button>
                        <Button size="sm" variant="outline" className="border-border">
                          <Icon name="MessageSquare" size={12} className="mr-1" />
                          Комментарий
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Logs */}
        <TabsContent value="logs" className="mt-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Системные логи</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 bg-muted/30 rounded border border-border">
                    <div className="flex items-center space-x-3">
                      <Icon name="Activity" size={14} className="text-muted-foreground" />
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          {log.action.replace('_', ' ')}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {log.details} • Цель: {log.target}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {log.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={20} className="text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">2,847</p>
                    <p className="text-sm text-muted-foreground">Всего игроков</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Icon name="Trophy" size={20} className="text-secondary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">156</p>
                    <p className="text-sm text-muted-foreground">Турниров сегодня</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={20} className="text-destructive" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">3</p>
                    <p className="text-sm text-muted-foreground">Активных споров</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={20} className="text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">94%</p>
                    <p className="text-sm text-muted-foreground">Матчи без споров</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;