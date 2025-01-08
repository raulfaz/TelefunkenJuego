import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private socket: Socket;
  private apiUrl = 'http://localhost:3000'; // URL del backend

  constructor(private http: HttpClient) {
    this.socket = io(this.apiUrl);
  }

  createRoom(roomData: { roomName: string; numPlayers: number; creatorAvatar: string | ArrayBuffer | null; playerName: string }) {
    return this.http.post<{ roomId: string }>(`${this.apiUrl}/create-room`, roomData);
  }

  joinRoom(roomId: string, playerName: string, avatar: string | ArrayBuffer | null) {
    this.socket.emit('join-room', { roomId, playerName, avatar });
  }

  onPlayersUpdate(callback: (players: Player[]) => void) {
    this.socket.on('update-players', callback);
  }

  onRoomJoined(callback: (data: { success: boolean; room?: any; message?: string }) => void) {
    this.socket.on('joined-room', callback);
  }
}
