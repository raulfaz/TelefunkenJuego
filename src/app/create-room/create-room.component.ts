import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { SelectAvatarComponent } from '../select-avatar/select-avatar.component';
import { SelectPlayersComponent } from '../select-players/select-players.component';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectAvatarComponent, SelectPlayersComponent],
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {
  roomName: string = '';
  numPlayers: number = 2;
  avatar: string | ArrayBuffer | null = null;
  roomCode: string | null = null;

  constructor(private router: Router, private roomService: RoomService) {}

  onPlayersSelected(numPlayers: number) {
    this.numPlayers = numPlayers;
  }

  onAvatarSelected(avatar: string | ArrayBuffer | null) {
    this.avatar = avatar;
  }

  createRoom() {
    if (this.roomName && this.numPlayers && this.avatar) {
      const roomId = this.roomService.createRoom(this.roomName, this.numPlayers, this.avatar);
      this.roomCode = roomId;
    }
  }
}
