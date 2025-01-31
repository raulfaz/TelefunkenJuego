import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Player } from '../models/player.model';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private socket: Socket;
  private apiUrl = 'https://telefunkenpointsregistrybackend.onrender.com/'; // URL del backend
  private scoresSubject = new BehaviorSubject<{[key: string]: any}>({});
  public scores$ = this.scoresSubject.asObservable();

  constructor(private http: HttpClient) {
    this.socket = io(this.apiUrl);
    // Escuchar actualizaciones de puntajes
    this.socket.on('scores-update', (scores) => {
      this.scoresSubject.next(scores);
    });
  
  }
  

  // Mantener los métodos existentes
  createRoom(roomData: any): Observable<{ roomId: string }> {
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


  updateScore(roomId: string, playerName: string, score: number, stage: number): void {
    this.socket.emit('update-score', { roomId, playerName, score, stage });
  }

  getScores(): {[key: string]: any} {
    return this.scoresSubject.value;
  }

  onScoreUpdate(callback: (scores: { [key: string]: { total: number; history: number[] } }) => void): void {
    this.socket.on('scores-updated', callback);
  }

  // Método para obtener puntuaciones actuales
  getRoomScores(roomId: string): Observable<{ [key: string]: { total: number; history: number[] } }> {
    return this.http.get<{ [key: string]: { total: number; history: number[] } }>(`${this.apiUrl}/api/rooms/${roomId}/scores`);
  }
}