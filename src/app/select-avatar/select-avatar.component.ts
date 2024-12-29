import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-avatar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.css']
})
export class SelectAvatarComponent {
  avatar: string | ArrayBuffer | null = null;

  @Output() avatarSelected = new EventEmitter<string | ArrayBuffer | null>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatar = reader.result;
        this.avatarSelected.emit(this.avatar);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
