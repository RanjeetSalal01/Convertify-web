import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../core/shared.module';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.scss',
})
export class LoadingOverlayComponent {
  @Input() isVisible: boolean = false;
  @Input() message: string = 'Converting your file...';
}
