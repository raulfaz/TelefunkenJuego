import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent {
  @Input() scores: any[] = [];
  currentPage: number = 0;
  pageSize: number = 3;

  paginatedScores() {
    const start = this.currentPage * this.pageSize;
    return this.scores.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.ceil(this.scores.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages() - 1) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
