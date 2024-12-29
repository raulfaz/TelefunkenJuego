import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private rooms: { name: string, id: string, numPlayers: number, avatars: string[] }[] = [];

  constructor() {}

  createRoom(name: string, numPlayers: number, creatorAvatar: string | ArrayBuffer | null): string {
    const id = this.generateRoomId();
    const avatars = Array(numPlayers).fill(null);
    avatars[0] = creatorAvatar as string;
    this.rooms.push({ name, id, numPlayers, avatars });
    return id;
  }

  joinRoom(id: string, avatar: string | ArrayBuffer | null): boolean {
    const room = this.rooms.find(room => room.id === id);
    if (room) {
      const emptySlot = room.avatars.findIndex(a => a === null);
      if (emptySlot !== -1) {
        room.avatars[emptySlot] = avatar as string;
        return true;
      }
    }
    return false;
  }

  private generateRoomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
