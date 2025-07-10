import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../core/shared.module';
import { FileUploadCardComponent } from '../file-upload-card/file-upload-card.component';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';
import { FileConversionHeaderComponent } from '../file-conversion-header/file-conversion-header.component';

interface ConversionJob {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  targetFormat: string;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  timestamp: Date;
  downloadUrl?: string;
}

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadCardComponent,
    LoadingOverlayComponent,
    SharedModule,
    FileConversionHeaderComponent,
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss',
})
export class GuestComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() userEmail?: string;

  isConverting = false;
  lastConvertedFile: any = null;

  premiumFeatures = [
    'Save conversion history',
    'Batch file conversions',
    'Priority processing speed',
    'Advanced format support',
    'No daily limits',
    'Download history anytime',
  ];

  constructor() {}

  onConversionStart(event: { file: File; targetFormat: string }) {
    this.isConverting = true;
  }

  onConversionComplete(response: any) {
    this.isConverting = false;
    console.log('Conversion completed:', response);

    if (response.success) {
      this.lastConvertedFile = {
        id: Date.now().toString(),
        fileName: response.result?.originalName || 'Dummy',
        fileSize: this.formatFileSize(response?.result?.size || 0),
        targetFormat: response.result?.format || 'png',
        status: 'completed',
        timestamp: new Date(),
        url: response?.url || '',
      };
    }
  }

  onConversionError(error: string) {
    this.isConverting = false;
    console.error('Conversion error:', error);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  handleDownload(url: string, fileName: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }
}
