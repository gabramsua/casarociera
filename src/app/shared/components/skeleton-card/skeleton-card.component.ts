import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  templateUrl: './skeleton-card.component.html',
  styleUrl: './skeleton-card.component.scss',
  imports: [MatCardModule, NgxSkeletonLoaderModule]
})
export class SkeletonCardComponent {
  @Input() iterations: number = 2; // Número de iteraciones por defecto

}
