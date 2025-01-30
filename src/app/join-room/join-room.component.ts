import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { SelectAvatarComponent } from '../select-avatar/select-avatar.component';
import { PlayerNameComponent } from '../player-name/player-name.component';
import { BackButtonComponent } from '../back-button/back-button.component';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectAvatarComponent, PlayerNameComponent, BackButtonComponent],
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent {
  roomCode: string = '';
  playerName: string = '';
  avatar: string | ArrayBuffer | null = null;
  players: any[] = [];

  constructor(private router: Router, private roomService: RoomService) {}

  onNameChanged(name: string) {
    this.playerName = name;
  }

  onAvatarSelected(avatar: string | ArrayBuffer | null) {
    this.avatar = avatar;
  }

  joinRoom() {
    this.roomService.joinRoom(this.roomCode, this.playerName, this.avatar);
    this.roomService.onRoomJoined(({ success, room, message }) => {
      if (success) {
        this.players = room.players;
        this.router.navigate(['/game'], { queryParams: { roomId: this.roomCode, playerName: this.playerName, avatar: this.avatar, isCreator: false } });
      } else {
        alert(message);
      }
    });
    this.roomService.onPlayersUpdate((players) => {
      this.players = players;
    });
  }
  
}
