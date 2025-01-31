import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private apiUrl = 'https://telefunkenpointsregistrybackend.onrender.com/api/scores'; // URL de tu API

  constructor(private http: HttpClient) {}

  saveScores(roomId: string, scores: {[key: string]: { history: number[], total: number }}): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, { roomId, scores });
  }

  getScores(roomId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${roomId}`);
  }
}
