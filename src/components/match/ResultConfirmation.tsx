import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ResultConfirmationProps {
  result: {
    player1Score: number;
    player2Score: number;
    screenshot: string;
    submittedBy: number;
    timestamp: Date;
  };
  match: {
    player1: any;
    player2: any;
    currentUser: any;
  };
  onConfirm: () => void;
  onDispute: () => void;
}

const ResultConfirmation = ({ result, match, onConfirm, onDispute }: ResultConfirmationProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDisputing, setIsDisputing] = useState(false);

  const { player1, player2, currentUser } = match;
  const submittedByUser = result.submittedBy === player1.id ? player1 : player2;
  const isMyResult = result.submittedBy === currentUser.id;

  const handleConfirm = async () => {
    setIsConfirming(true);
    setTimeout(() => {
      onConfirm();
      setIsConfirming(false);
    }, 1000);
  };

  const handleDispute = async () => {
    setIsDisputing(true);
    setTimeout(() => {
      onDispute();
      setIsDisputing(false);
    }, 1000);
  };

  const getWinner = () => {
    if (result.player1Score > result.player2Score) return player1;
    if (result.player2Score > result.player1Score) return player2;
    return null;
  };

  const winner = getWinner();

  return (
    <Card className="border-border max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center">
            <Icon name="FileCheck" size={20} className="mr-2" />
            Подтверждение результата
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            {isMyResult ? 'Ваш результат' : 'Ожидает подтверждения'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Match Result Display */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <Avatar className="w-16 h-16 mx-auto mb-2">
                <AvatarFallback className="bg-primary/20 text-primary text-xl">
                  {player1.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-foreground">{player1.username}</h3>
              <div className={`text-3xl font-bold mt-2 ${
                winner?.id === player1.id ? 'text-secondary' : 'text-muted-foreground'
              }`}>
                {result.player1Score}
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground mb-4">VS</div>
              <div className="text-sm text-muted-foreground">
                {winner ? (
                  <div className="flex items-center space-x-1">
                    <Icon name="Trophy" size={16} className="text-secondary" />
                    <span>Победа: {winner.username}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <Icon name="Minus" size={16} className="text-muted-foreground" />
                    <span>Ничья</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <Avatar className="w-16 h-16 mx-auto mb-2">
                <AvatarFallback className="bg-primary/20 text-primary text-xl">
                  {player2.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-foreground">{player2.username}</h3>
              <div className={`text-3xl font-bold mt-2 ${
                winner?.id === player2.id ? 'text-secondary' : 'text-muted-foreground'
              }`}>
                {result.player2Score}
              </div>
            </div>
          </div>
        </div>

        {/* Screenshot */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Скриншот результата</h4>
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <img
              src={result.screenshot}
              alt="Результат матча"
              className="w-full max-w-md mx-auto rounded-lg"
              style={{ maxHeight: '300px', objectFit: 'contain' }}
            />
          </div>
          <div className="text-sm text-muted-foreground text-center">
            Результат отправлен игроком {submittedByUser.username}
          </div>
        </div>

        {/* Match Info */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Матч:</span>
              <span className="text-foreground font-semibold ml-2">
                {player1.username} vs {player2.username}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Время:</span>
              <span className="text-foreground font-semibold ml-2">
                {result.timestamp.toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Отправил:</span>
              <span className="text-foreground font-semibold ml-2">
                {submittedByUser.username}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Статус:</span>
              <span className="text-orange-500 font-semibold ml-2">
                Ожидает подтверждения
              </span>
            </div>
          </div>
        </div>

        {!isMyResult && (
          <>
            {/* Instructions */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-blue-500 mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground font-semibold mb-1">
                    Проверьте результат матча
                  </p>
                  <p className="text-muted-foreground">
                    Сравните результат на скриншоте с вашими воспоминаниями о матче. 
                    Если результат верный - подтвердите его. Если есть ошибка - создайте спор.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                size="lg"
                className="flex-1 bg-secondary hover:bg-secondary/90"
                onClick={handleConfirm}
                disabled={isConfirming || isDisputing}
              >
                {isConfirming ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Подтверждение...
                  </>
                ) : (
                  <>
                    <Icon name="Check" size={16} className="mr-2" />
                    Подтвердить результат
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={handleDispute}
                disabled={isConfirming || isDisputing}
              >
                {isDisputing ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Создание спора...
                  </>
                ) : (
                  <>
                    <Icon name="AlertTriangle" size={16} className="mr-2" />
                    Создать спор
                  </>
                )}
              </Button>
            </div>
          </>
        )}

        {isMyResult && (
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <Icon name="Clock" size={20} className="text-orange-500" />
              <span className="text-foreground font-semibold">
                Ожидаем подтверждения от соперника
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Результат матча будет засчитан после подтверждения вашим соперником
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultConfirmation;