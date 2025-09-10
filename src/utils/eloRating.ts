// Elo Rating System for FIFA Tournament Platform
// Based on the specification in the technical requirements

export interface Player {
  id: number;
  rating: number;
  isCalibrating: boolean;
  calibrationGames: number;
  wins: number;
  losses: number;
}

export interface TournamentResult {
  position: number; // 1st, 2nd, 3rd, 4th place
  totalPlayers: number;
}

// Calculate expected result for a player in a tournament
export function calculateExpectedResult(playerRating: number, averageRating: number): number {
  return 1 / (1 + Math.pow(10, (averageRating - playerRating) / 400));
}

// Convert tournament position to actual result score
export function getActualResult(position: number, totalPlayers: number): number {
  switch (totalPlayers) {
    case 4:
      switch (position) {
        case 1: return 1.0;    // 1st place
        case 2: return 0.66;   // 2nd place  
        case 3: return 0.33;   // 3rd place
        case 4: return 0.0;    // 4th place
        default: return 0.0;
      }
    default:
      // For other tournament sizes, use proportional scoring
      return (totalPlayers - position) / (totalPlayers - 1);
  }
}

// Get K-factor based on player's calibration status
export function getKFactor(player: Player): number {
  return player.isCalibrating ? 40 : 25;
}

// Calculate new rating after tournament
export function calculateNewRating(
  player: Player,
  tournamentResult: TournamentResult,
  tournamentAverageRating: number
): number {
  const expectedResult = calculateExpectedResult(player.rating, tournamentAverageRating);
  const actualResult = getActualResult(tournamentResult.position, tournamentResult.totalPlayers);
  const kFactor = getKFactor(player);
  
  return Math.round(player.rating + kFactor * (actualResult - expectedResult));
}

// Update player after tournament
export function updatePlayerAfterTournament(
  player: Player,
  tournamentResult: TournamentResult,
  tournamentAverageRating: number
): Player {
  const newRating = calculateNewRating(player, tournamentResult, tournamentAverageRating);
  const newCalibrationGames = player.calibrationGames + 1;
  const isStillCalibrating = player.isCalibrating && newCalibrationGames < 10;
  
  // Update wins/losses based on position
  const newWins = tournamentResult.position === 1 ? player.wins + 1 : player.wins;
  const newLosses = tournamentResult.position > 2 ? player.losses + 1 : player.losses;
  
  return {
    ...player,
    rating: newRating,
    calibrationGames: newCalibrationGames,
    isCalibrating: isStillCalibrating,
    wins: newWins,
    losses: newLosses
  };
}

// Calculate average rating of tournament participants
export function calculateTournamentAverageRating(players: Player[]): number {
  const totalRating = players.reduce((sum, player) => sum + player.rating, 0);
  return Math.round(totalRating / players.length);
}

// Process entire tournament results
export function processTournamentResults(
  players: Player[],
  results: TournamentResult[]
): Player[] {
  const averageRating = calculateTournamentAverageRating(players);
  
  return players.map((player, index) => {
    const playerResult = results.find(r => results.indexOf(r) === index) || results[index];
    return updatePlayerAfterTournament(player, playerResult, averageRating);
  });
}

// Get rating change preview without applying it
export function previewRatingChange(
  player: Player,
  tournamentResult: TournamentResult,
  tournamentAverageRating: number
): {
  currentRating: number;
  newRating: number;
  change: number;
  expectedResult: number;
  actualResult: number;
} {
  const expectedResult = calculateExpectedResult(player.rating, tournamentAverageRating);
  const actualResult = getActualResult(tournamentResult.position, tournamentResult.totalPlayers);
  const newRating = calculateNewRating(player, tournamentResult, tournamentAverageRating);
  
  return {
    currentRating: player.rating,
    newRating,
    change: newRating - player.rating,
    expectedResult,
    actualResult
  };
}

// Validate tournament results
export function validateTournamentResults(results: TournamentResult[]): boolean {
  const positions = results.map(r => r.position);
  const uniquePositions = [...new Set(positions)];
  
  // Check if all positions are unique and valid
  return uniquePositions.length === results.length &&
         positions.every(pos => pos >= 1 && pos <= results.length);
}

// Get rank title based on rating
export function getRankTitle(rating: number): {
  title: string;
  color: string;
  minRating: number;
  maxRating: number;
} {
  if (rating < 1200) {
    return { title: 'Новичок', color: '#6B7280', minRating: 0, maxRating: 1199 };
  } else if (rating < 1400) {
    return { title: 'Любитель', color: '#059669', minRating: 1200, maxRating: 1399 };
  } else if (rating < 1600) {
    return { title: 'Опытный', color: '#3B82F6', minRating: 1400, maxRating: 1599 };
  } else if (rating < 1800) {
    return { title: 'Эксперт', color: '#8B5CF6', minRating: 1600, maxRating: 1799 };
  } else if (rating < 2000) {
    return { title: 'Мастер', color: '#F59E0B', minRating: 1800, maxRating: 1999 };
  } else {
    return { title: 'Гроссмейстер', color: '#DC2626', minRating: 2000, maxRating: 9999 };
  }
}

// Calculate match probability (for 1v1 matches within tournament)
export function calculateMatchProbability(player1Rating: number, player2Rating: number): {
  player1WinProbability: number;
  player2WinProbability: number;
  drawProbability: number;
} {
  const expectedResult = calculateExpectedResult(player1Rating, player2Rating);
  
  return {
    player1WinProbability: Math.round(expectedResult * 100),
    player2WinProbability: Math.round((1 - expectedResult) * 100),
    drawProbability: 5 // Small chance for draws in FIFA
  };
}