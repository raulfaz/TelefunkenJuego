import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-name',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-name.component.html',
  styleUrls: ['./player-name.component.css']
})
export class PlayerNameComponent {
  playerName: string = '';

  @Output() nameChanged = new EventEmitter<string>();

  onNameChange() {
    this.nameChanged.emit(this.playerName);
  }
}
