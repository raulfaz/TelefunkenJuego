import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { SelectAvatarComponent } from '../select-avatar/select-avatar.component';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectAvatarComponent],
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent {
  roomCode: string = '';
  avatar: string | ArrayBuffer | null = null;

  constructor(private router: Router, private roomService: RoomService) {}

  onAvatarSelected(avatar: string | ArrayBuffer | null) {
    this.avatar = avatar;
  }

  joinRoom() {
    if (this.roomCode && this.avatar) {
      const roomJoined = this.roomService.joinRoom(this.roomCode, this.avatar);
      if (roomJoined) {
        this.router.navigate(['/game'], { queryParams: { roomCode: this.roomCode } });
      } else {
        alert('Código de sala no válido o sala llena');
      }
    }
  }
}
