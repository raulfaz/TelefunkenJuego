import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { SelectAvatarComponent } from '../select-avatar/select-avatar.component';
import { SelectPlayersComponent } from '../select-players/select-players.component';
import { PlayerNameComponent } from '../player-name/player-name.component';
import { BackButtonComponent } from '../back-button/back-button.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectAvatarComponent, SelectPlayersComponent, PlayerNameComponent, BackButtonComponent, HttpClientModule],
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {
  roomName: string = '';
  playerName: string = '';
  numPlayers: number = 1;
  avatar: string | ArrayBuffer | null = null;
  roomCode: string | null = null;

  constructor(private router: Router, private roomService: RoomService) {}

  onNameChanged(name: string) {
    this.playerName = name;
  }

  onPlayersSelected(numPlayers: number) {
    this.numPlayers = numPlayers;
  }

  onAvatarSelected(avatar: string | ArrayBuffer | null) {
    this.avatar = avatar;
  }

  
  createRoom() {
    this.roomService.createRoom({
      roomName: this.roomName,
      numPlayers: this.numPlayers,
      creatorAvatar: this.avatar,
      playerName: this.playerName,
    }).subscribe(({ roomId }) => {
      this.roomCode = roomId;
      this.router.navigate(['/game'], { queryParams: { roomId, playerName: this.playerName, avatar: this.avatar, isCreator: true } });
    });
  }
  
}
