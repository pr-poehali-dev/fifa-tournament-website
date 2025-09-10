import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const tournaments = [
    { id: 1, name: "FIFA World Cup 2024", status: "Активный", players: 32, prize: "1,000,000₽" },
    { id: 2, name: "Champions League", status: "Регистрация", players: 16, prize: "500,000₽" },
    { id: 3, name: "Кубок России", status: "Завершен", players: 64, prize: "250,000₽" }
  ];

  const leaderboard = [
    { rank: 1, player: "ProGamer_RU", wins: 47, losses: 3, rating: 2850 },
    { rank: 2, player: "FifaMaster", wins: 42, losses: 8, rating: 2720 },
    { rank: 3, player: "GoalMachine", wins: 38, losses: 12, rating: 2650 },
    { rank: 4, player: "SkillShot", wins: 35, losses: 15, rating: 2580 },
    { rank: 5, player: "TacticalGenius", wins: 33, losses: 17, rating: 2520 }
  ];

  const matches = [
    { id: 1, player1: "ProGamer_RU", player2: "FifaMaster", score: "3:1", status: "Завершен", time: "14:30" },
    { id: 2, player1: "GoalMachine", player2: "SkillShot", score: "2:2", status: "Идет", time: "15:00" },
    { id: 3, player1: "TacticalGenius", player2: "SpeedDemon", score: "-:-", status: "Ожидание", time: "15:30" }
  ];

  const stats = {
    totalTournaments: 156,
    activePlayers: 2847,
    totalPrize: "15,750,000₽",
    completedMatches: 8432
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Trophy" size={32} className="text-primary" />
                <h1 className="text-2xl font-bold text-foreground">FIFA TOURNAMENTS</h1>
              </div>
              <Badge variant="destructive" className="bg-primary">PRO</Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-foreground">Турниры</Button>
              <Button variant="ghost" className="text-foreground">Рейтинг</Button>
              <Button variant="ghost" className="text-foreground">Матчи</Button>
              <Button variant="ghost" className="text-foreground">Статистика</Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-black text-foreground mb-6">
                ПРОФЕССИОНАЛЬНЫЕ
                <span className="text-primary block">ТУРНИРЫ FIFA</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Присоединяйтесь к крупнейшей турнирной платформе. 
                Соревнуйтесь с лучшими игроками и выигрывайте призы.
              </p>
              <div className="flex space-x-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Icon name="Play" size={20} className="mr-2" />
                  Начать игру
                </Button>
                <Button size="lg" variant="outline" className="border-border">
                  <Icon name="Calendar" size={20} className="mr-2" />
                  Турниры
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/img/f3664453-382e-415b-805c-28a9886b372c.jpg" 
                alt="FIFA Tournament"
                className="rounded-xl shadow-2xl border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-border">
              <CardContent className="pt-6">
                <Icon name="Trophy" size={32} className="mx-auto mb-3 text-secondary" />
                <div className="text-3xl font-bold text-foreground">{stats.totalTournaments}</div>
                <div className="text-muted-foreground">Турниров</div>
              </CardContent>
            </Card>
            <Card className="text-center border-border">
              <CardContent className="pt-6">
                <Icon name="Users" size={32} className="mx-auto mb-3 text-secondary" />
                <div className="text-3xl font-bold text-foreground">{stats.activePlayers.toLocaleString()}</div>
                <div className="text-muted-foreground">Игроков</div>
              </CardContent>
            </Card>
            <Card className="text-center border-border">
              <CardContent className="pt-6">
                <Icon name="DollarSign" size={32} className="mx-auto mb-3 text-secondary" />
                <div className="text-3xl font-bold text-foreground">{stats.totalPrize}</div>
                <div className="text-muted-foreground">Призовой фонд</div>
              </CardContent>
            </Card>
            <Card className="text-center border-border">
              <CardContent className="pt-6">
                <Icon name="Gamepad2" size={32} className="mx-auto mb-3 text-secondary" />
                <div className="text-3xl font-bold text-foreground">{stats.completedMatches.toLocaleString()}</div>
                <div className="text-muted-foreground">Матчей</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="tournaments" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted">
              <TabsTrigger value="tournaments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Турниры</TabsTrigger>
              <TabsTrigger value="leaderboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Рейтинг</TabsTrigger>
              <TabsTrigger value="matches" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Матчи</TabsTrigger>
              <TabsTrigger value="bracket" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Сетка</TabsTrigger>
            </TabsList>

            <TabsContent value="tournaments">
              <div className="grid gap-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-foreground">Активные турниры</h3>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать турнир
                  </Button>
                </div>
                <div className="grid gap-4">
                  {tournaments.map((tournament) => (
                    <Card key={tournament.id} className="border-border">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-foreground mb-2">{tournament.name}</h4>
                            <div className="flex items-center space-x-4 text-muted-foreground">
                              <span className="flex items-center">
                                <Icon name="Users" size={16} className="mr-1" />
                                {tournament.players} игроков
                              </span>
                              <span className="flex items-center">
                                <Icon name="DollarSign" size={16} className="mr-1" />
                                {tournament.prize}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={tournament.status === "Активный" ? "default" : 
                                     tournament.status === "Регистрация" ? "secondary" : "outline"}
                              className={tournament.status === "Активный" ? "bg-secondary" : ""}
                            >
                              {tournament.status}
                            </Badge>
                            <Button className="mt-2 ml-2 bg-primary hover:bg-primary/90">
                              Участвовать
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="leaderboard">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Таблица лидеров</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboard.map((player) => (
                      <div key={player.rank} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            player.rank === 1 ? 'bg-yellow-500 text-black' :
                            player.rank === 2 ? 'bg-gray-400 text-black' :
                            player.rank === 3 ? 'bg-amber-600 text-black' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {player.rank}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{player.player}</h4>
                            <p className="text-sm text-muted-foreground">
                              {player.wins}П / {player.losses}П
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-foreground">{player.rating}</div>
                          <div className="text-sm text-muted-foreground">Рейтинг</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="matches">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Текущие матчи</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {matches.map((match) => (
                      <div key={match.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-muted-foreground">{match.time}</div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{match.player1}</span>
                            <span className="text-muted-foreground">VS</span>
                            <span className="font-medium text-foreground">{match.player2}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-xl font-bold text-foreground">{match.score}</div>
                          <Badge 
                            variant={match.status === "Идет" ? "default" : 
                                   match.status === "Завершен" ? "secondary" : "outline"}
                            className={match.status === "Идет" ? "bg-secondary" : ""}
                          >
                            {match.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bracket">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Турнирная сетка</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="font-semibold mb-4 text-center text-foreground">1/4 финала</h4>
                      <div className="space-y-3">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="bg-muted/50 p-3 rounded border border-border">
                            <div className="flex justify-between items-center">
                              <span className="text-foreground">Игрок {i}</span>
                              <span className="font-bold text-foreground">2</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-foreground">Игрок {i+4}</span>
                              <span className="font-bold text-foreground">1</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 text-center text-foreground">1/2 финала</h4>
                      <div className="space-y-6">
                        {[1,2].map(i => (
                          <div key={i} className="bg-muted/50 p-3 rounded border border-border">
                            <div className="flex justify-between items-center">
                              <span className="text-foreground">Победитель {i}</span>
                              <span className="font-bold text-foreground">-</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-foreground">Победитель {i+2}</span>
                              <span className="font-bold text-foreground">-</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 text-center text-foreground">Финал</h4>
                      <div className="bg-primary/10 p-4 rounded border-2 border-primary">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-foreground">Финалист 1</span>
                          <span className="font-bold text-foreground">-</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-foreground">Финалист 2</span>
                          <span className="font-bold text-foreground">-</span>
                        </div>
                        <div className="mt-3 text-center">
                          <Icon name="Trophy" size={24} className="mx-auto text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Index;