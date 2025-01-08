import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../services/room.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player } from '../models/player.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'] // Actualizado para styleUrls
})
export class GameComponent implements OnInit {
  roomId: string = '';
  players: Player[] = [];
  scores: { [key: string]: number[] } = {};

  constructor(private router: Router, private route: ActivatedRoute, private roomService: RoomService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.roomId = params['roomId'];
    });

    this.roomService.onPlayersUpdate((players: Player[]) => {
      this.players = players;
      players.forEach((player: Player) => {
        if (!this.scores[player.name]) {
          this.scores[player.name] = [];
        }
      });
    });

    this.roomService.onRoomJoined(({ success, room }) => {
      if (success && room) {
        this.players = room.players;
        room.players.forEach((player: Player) => {
          this.scores[player.name] = [];
        });
      }
    });
  }

  addScore(playerName: string, round: number, score: number) {
    if (!this.scores[playerName]) {
      this.scores[playerName] = [];
    }
    this.scores[playerName][round] = score;
  }
}
