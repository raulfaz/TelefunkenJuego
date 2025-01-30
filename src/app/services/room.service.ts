import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Player } from '../models/player.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private socket: Socket;
  private apiUrl = 'http://localhost:3000'; // URL del backend

  constructor(private http: HttpClient) {
    this.socket = io(this.apiUrl);
  }

  createRoom(roomData: { roomName: string; numPlayers: number; creatorAvatar: string | ArrayBuffer | null; playerName: string }): Observable<{ roomId: string }> {
    return this.http.post<{ roomId: string }>(`${this.apiUrl}/api/rooms/create-room`, roomData);
  }

  joinRoom(roomId: string, playerName: string, avatar: string | ArrayBuffer | null): void {
    this.socket.emit('join-room', { roomId, playerName, avatar });
  }

  onPlayersUpdate(callback: (players: Player[]) => void): void {
    this.socket.on('update-players', callback);
  }

  onRoomJoined(callback: (data: { success: boolean; room?: any; message?: string }) => void): void {
    this.socket.on('joined-room', callback);
  }

  updatePlayers(players: Player[]): void {
    this.socket.emit('update-players', players);
  }

  onShowPointsInput(callback: () => void): void {
    this.socket.on('show-points-input', callback);
  }

  onChangeGame(callback: () => void): void {
    this.socket.on('change-game', callback);
  }

  onShowBarChart(callback: () => void): void {
    this.socket.on('show-bar-chart', callback);
  }

  nextGame(roomId: string): void {
    this.socket.emit('next-game', roomId);
  }

  endGame(roomId: string): void {
    this.socket.emit('end-game', roomId);
  }

  getPlayers(roomId: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/api/rooms/${roomId}/players`);
  }
}
