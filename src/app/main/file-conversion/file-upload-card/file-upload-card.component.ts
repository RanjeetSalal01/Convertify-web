import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../core/shared.module';

@Component({
  selector: 'app-file-upload-card',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './file-upload-card.component.html',
  styleUrl: './file-upload-card.component.scss',
})
export class FileUploadCardComponent {
  @Input() isConverting: boolean = false;
  @Input() isLoggedIn: boolean = false;
  @Output() conversionStart = new EventEmitter<{
    file: File;
    targetFormat: string;
  }>();

  selectedFile: File | null = null;
  targetFormat: string = '';

  handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.targetFormat = '';
    }
  }

  handleConvert() {
    if (!this.selectedFile || !this.targetFormat) {
      // Replace with your toast service
      alert('Please select a file and target format');
      return;
    }

    this.conversionStart.emit({
      file: this.selectedFile,
      targetFormat: this.targetFormat,
    });

    this.selectedFile = null;
    this.targetFormat = '';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
