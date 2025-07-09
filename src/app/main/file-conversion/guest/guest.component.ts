import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../core/shared.module';
import { FileUploadCardComponent } from '../file-upload-card/file-upload-card.component';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';

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
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss',
})
export class GuestComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() userEmail?: string;

  jobs: ConversionJob[] = [];
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

  handleConversionStart({
    file,
    targetFormat,
  }: {
    file: File;
    targetFormat: string;
  }) {
    this.isConverting = true;
    this.lastConvertedFile = null;

    const newJob: any = {
      id: Date.now().toString(),
      fileName: file.name,
      fileSize: this.formatFileSize(file.size),
      targetFormat,
      status: 'uploading',
      timestamp: new Date(),
    };

    if (this.isLoggedIn) this.jobs.unshift(newJob);
    // this.toast.success('Starting conversion...');

    setTimeout(() => {
      if (this.isLoggedIn) {
        this.jobs = this.jobs.map((job) =>
          job.id === newJob.id ? { ...job, status: 'processing' } : job
        );
      }
      // this.toast.info('Processing your file...');
    }, 1000);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.1;
      const finalStatus = isSuccess ? 'completed' : 'failed';
      const completedJob = {
        ...newJob,
        status: finalStatus,
        downloadUrl: isSuccess ? '#' : undefined,
      };

      if (this.isLoggedIn) {
        this.jobs = this.jobs.map((job) =>
          job.id === newJob.id ? completedJob : job
        );
      }

      if (!this.isLoggedIn && isSuccess) {
        this.lastConvertedFile = completedJob;
      }

      if (isSuccess) {
        // this.toast.success('File converted successfully!');
        if (!this.isLoggedIn) {
          // this.toast.info('Sign in to save your conversion history!');
        }
      } else {
        // this.toast.error('Conversion failed. Please try again.');
      }

      this.isConverting = false;
    }, 3000);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  removeJob(jobId: string) {
    this.jobs = this.jobs.filter((job) => job.id !== jobId);
    // this.toast.success('Conversion removed');
  }

  handleDownload(fileName: string) {
    // this.toast.success(`Downloaded ${fileName}!`);
  }
}
