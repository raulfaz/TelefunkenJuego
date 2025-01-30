import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Player } from '../models/player.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  roomId: string | null = null;
  playerName: string | null = null;
  avatar: string | null = null;
  players: Player[] = [];
  gameStage: string = '1/3';
  score?: number;
  isCreator: boolean = false;
  displayPointsInput: boolean = true;
  totalScores: { [key: string]: number } = {}; // Acumulador de puntos

  gameStages: string[] = ['1/3', '2/3', '1/4', '2/4', '1/5', '2/5', 'Escalera'];

  constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.roomId = params['roomId'];
      this.playerName = params['playerName'];
      this.avatar = params['avatar'];
      this.isCreator = params['isCreator'] === 'true';
    });

    this.roomService.onPlayersUpdate(players => {
      this.players = players;
    });

    this.roomService.onRoomJoined(data => {
      if (data.success) {
        this.displayPointsInput = true;
      }
    });

    this.roomService.onShowPointsInput(() => {
      console.log("Evento show-points-input recibido");
      this.displayPointsInput = true;
    });
    

    this.roomService.onChangeGame(() => {
      this.nextStage();
    });

    this.roomService.onShowBarChart(() => {
      this.endGame();
    });
  }

  submitScore() {
    if (this.playerName && this.score !== undefined) {
      // Sumar puntajes acumulados
      this.totalScores[this.playerName] = (this.totalScores[this.playerName] || 0) + this.score;
    }
    
    this.players = this.players.map(player => {
      if (player.name === this.playerName) {
        player.score = this.totalScores[this.playerName];
      }
      return player;
    });
    
    this.roomService.updatePlayers(this.players);
  }

  nextStage() {
    const currentIndex = this.gameStages.indexOf(this.gameStage);
    if (currentIndex < this.gameStages.length - 1) {
      this.gameStage = this.gameStages[currentIndex + 1];
      if (this.isCreator && this.roomId) {
        this.roomService.nextGame(this.roomId);
      }
    } else {
      this.endGame();
    }
  }

  endGame() {
    if (this.isCreator && this.roomId) {
      this.roomService.endGame(this.roomId);
    }
  }
}
