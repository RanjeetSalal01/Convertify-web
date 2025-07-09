import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
  selector: 'app-logged-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './logged-in.component.html',
  styleUrl: './logged-in.component.scss',
})
export class LoggedInComponent {
  userEmail: string = 'user@example.com';
  isLoggedIn: boolean = true;
  isConverting: boolean = false;
  conversionProgress: number = 0;

  selectedFile: File | null = null;
  targetFormat: string = '';
  searchTerm: string = '';
  filterStatus: string = 'all';

  jobs: ConversionJob[] = [
    {
      id: '1',
      fileName: 'vacation-photo.jpg',
      fileType: 'image',
      fileSize: '2.4 MB',
      targetFormat: 'webp',
      status: 'completed',
      timestamp: new Date(Date.now() - 300000),
      downloadUrl: '#',
    },
    {
      id: '2',
      fileName: 'presentation.docx',
      fileType: 'document',
      fileSize: '1.8 MB',
      targetFormat: 'pdf',
      status: 'completed',
      timestamp: new Date(Date.now() - 600000),
      downloadUrl: '#',
    },
    {
      id: '3',
      fileName: 'music-track.mp3',
      fileType: 'audio',
      fileSize: '5.2 MB',
      targetFormat: 'wav',
      status: 'processing',
      timestamp: new Date(Date.now() - 120000),
    },
  ];

  get stats() {
    return {
      total: this.jobs.length,
      completed: this.jobs.filter((j) => j.status === 'completed').length,
      processing: this.jobs.filter(
        (j) => j.status === 'processing' || j.status === 'uploading'
      ).length,
      failed: this.jobs.filter((j) => j.status === 'failed').length,
    };
  }

  get filteredJobs() {
    return this.jobs.filter((job) => {
      const matchesSearch =
        job.fileName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.targetFormat.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesFilter =
        this.filterStatus === 'all' || job.status === this.filterStatus;
      return matchesSearch && matchesFilter;
    });
  }

  handleFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  handleConvert(): void {
    if (!this.selectedFile || !this.targetFormat) return;

    const newJob: ConversionJob = {
      id: Date.now().toString(),
      fileName: this.selectedFile.name,
      fileType: this.getFileType(this.selectedFile.name),
      fileSize: this.formatFileSize(this.selectedFile.size),
      targetFormat: this.targetFormat,
      status: 'uploading',
      timestamp: new Date(),
    };

    this.jobs.unshift(newJob);

    setTimeout(() => {
      const job = this.jobs.find((j) => j.id === newJob.id);
      if (job) job.status = 'processing';
    }, 1000);

    setTimeout(() => {
      const job = this.jobs.find((j) => j.id === newJob.id);
      if (job) {
        job.status = Math.random() > 0.1 ? 'completed' : 'failed';
        job.downloadUrl = '#';
      }
    }, 5000);

    this.selectedFile = null;
    this.targetFormat = '';
  }

  getFileType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension))
      return 'image';
    if (['mp4', 'avi', 'mkv', 'mov', 'wmv'].includes(extension)) return 'video';
    if (['mp3', 'wav', 'aac', 'ogg', 'flac'].includes(extension))
      return 'audio';
    return 'document';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFileGradient(fileType: string): string {
    switch (fileType) {
      case 'image':
        return 'from-blue-500 to-cyan-500';
      case 'video':
        return 'from-purple-500 to-pink-500';
      case 'audio':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-green-500 to-emerald-500';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      case 'processing':
        return 'Processing';
      case 'uploading':
        return 'Uploading';
      default:
        return 'Unknown';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded flex items-center';
      case 'failed':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded flex items-center';
      case 'processing':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-2 py-1 rounded flex items-center';
      case 'uploading':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded flex items-center';
      default:
        return 'bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded';
    }
  }

  onBackToLanding(): void {
    console.log('Back to landing clicked');
    // Navigation logic goes here
  }

  onLogout(): void {
    console.log('Logout clicked');
    // Auth/logout logic goes here
  }
}
