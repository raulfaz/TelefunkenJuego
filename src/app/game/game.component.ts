import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Player } from '../models/player.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class GameComponent implements OnInit, OnDestroy {
  roomId: string = '';
  playerName: string = '';
  avatar: string | null = null;
  players: Player[] = [];
  gameStage: string = '1/3';
  currentScore: number = 0;
  isCreator: boolean = false;
  displayPointsInput: boolean = true;
  currentStageIndex: number = 0;
  gameStages: string[] = ['1/3', '2/3', '1/4', '2/4', '1/5', '2/5', 'Escalera'];
  
  private scoresSubscription?: Subscription;
  scores: {[key: string]: { history: number[], total: number }} = {};

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private scoreService: ScoreService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.roomId = params['roomId'];
      this.playerName = params['playerName'];
      this.avatar = params['avatar'];
      this.isCreator = params['isCreator'] === 'true';
    });

    // Suscribirse a las actualizaciones de jugadores
    this.roomService.onPlayersUpdate(players => {
      this.players = players;
      console.log('Players updated:', players);
    });

    // Suscribirse a las actualizaciones de puntajes
    this.scoresSubscription = this.roomService.scores$.subscribe(scores => {
      this.scores = scores;
      console.log('Scores updated:', scores);
    });

    this.roomService.onChangeGame(() => {
      this.nextStage();
    });
  }

  ngOnDestroy(): void {
    if (this.scoresSubscription) {
      this.scoresSubscription.unsubscribe();
    }
  }

  submitScore(): void {
    if (this.playerName && this.currentScore !== undefined) {
      this.roomService.updateScore(
        this.roomId,
        this.playerName,
        this.currentScore,
        this.currentStageIndex
      );
      this.displayPointsInput = false;

      // Guardar los puntajes en MongoDB Atlas
      this.scoreService.saveScores(this.roomId, this.scores).subscribe(
        (response) => {
          console.log('Scores guardados exitosamente:', response);
        },
        (error) => {
          console.error('Error al guardar los puntajes:', error);
        }
      );
    }
  }

  getPlayerScoreHistory(playerName: string): number[] {
    return this.scores[playerName]?.history || Array(this.currentStageIndex + 1).fill(0);
  }

  getPlayerTotal(playerName: string): number {
    return this.scores[playerName]?.total || 0;
  }

  allPlayersSubmitted(): boolean {
    return this.players.every(player => 
      this.scores[player.name]?.history[this.currentStageIndex] !== undefined
    );
  }

  nextStage(): void {
    if (this.currentStageIndex < this.gameStages.length - 1) {
      this.currentStageIndex++;
      this.gameStage = this.gameStages[this.currentStageIndex];
      this.displayPointsInput = true;
      
      if (this.isCreator) {
        this.roomService.nextGame(this.roomId);
      }
    }
  }

  endGame(): void {
    if (this.isCreator) {
      this.roomService.endGame(this.roomId);
    }
  }
}