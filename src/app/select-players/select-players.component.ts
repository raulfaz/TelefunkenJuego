import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-players',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-players.component.html',
  styleUrls: ['./select-players.component.css']
})
export class SelectPlayersComponent {
  numPlayers: number = 2;

  @Output() playersSelected = new EventEmitter<number>();

  onPlayersSelected() {
    this.playersSelected.emit(this.numPlayers);
  }
}
