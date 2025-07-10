import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../../../core/shared.module';
import { API } from '../../../api';
import { ToasterService } from '../../../core/services/toaster.service';

interface FormatOption {
  value: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-file-upload-card',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './file-upload-card.component.html',
  styleUrl: './file-upload-card.component.scss',
})
export class FileUploadCardComponent {
  @Input() isConverting: boolean = false;
  @Input() apiEndpoint: string = '/api/convert';

  @Output() conversionStart = new EventEmitter<{
    file: File;
    targetFormat: string;
  }>();
  @Output() conversionComplete = new EventEmitter<any>();
  @Output() conversionError = new EventEmitter<string>();

  selectedFile: File | null = null;
  targetFormat: string = '';
  sourceFormat: string = '';

  isDropdownOpen: boolean = false;

  private imageFormats = [
    'jpg',
    'jpeg',
    'png',
    'webp',
    'tiff',
    'gif',
    'avif',
    'heif',
  ];

  private formats: { [key: string]: FormatOption[] } = {
    image: [
      { value: 'jpg', label: 'JPG Image', icon: 'image' },
      { value: 'png', label: 'PNG Image', icon: 'image' },
      { value: 'webp', label: 'WebP Image', icon: 'image' },
      { value: 'tiff', label: 'TIFF Image', icon: 'image' },
      { value: 'gif', label: 'GIF Image', icon: 'image' },
      { value: 'avif', label: 'AVIF Image', icon: 'image' },
      { value: 'heif', label: 'HEIF Image', icon: 'image' },
      { value: 'pdf', label: 'PDF Document', icon: 'file-text' },
      { value: 'docx', label: 'Word Document', icon: 'file-text' },
    ],
    docx: [
      { value: 'pdf', label: 'PDF Document', icon: 'file-text' },
      { value: 'txt', label: 'Text File', icon: 'file-text' },
    ],
    txt: [
      { value: 'docx', label: 'Word Document', icon: 'file-text' },
      { value: 'pdf', label: 'PDF Document', icon: 'file-text' },
    ],
    pdf: [
      { value: 'txt', label: 'Text File', icon: 'file-text' },
      { value: 'docx', label: 'Word Document', icon: 'file-text' },
    ],
  };

  constructor(private http: HttpClient, private toast: ToasterService) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!(event.target as HTMLElement).closest('.relative')) {
      this.closeDropdown();
    }
  }

  handleFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      this.sourceFormat = this.getFileType(file.name);
      this.targetFormat = '';
      this.closeDropdown();
    }
  }

  getFileType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    return this.imageFormats.includes(ext) ? 'image' : ext;
  }

  getFileIcon(): string {
    const iconMap: { [key: string]: string } = {
      image: 'image',
      pdf: 'file-text',
      docx: 'file-text',
      txt: 'file-text',
    };
    return iconMap[this.sourceFormat] || 'file';
  }

  getSupportedFormats(): FormatOption[] {
    if (!this.selectedFile) return [];

    const allFormats = this.formats[this.sourceFormat] || [];
    const currentExt =
      this.selectedFile.name.split('.').pop()?.toLowerCase() || '';

    // Remove current format from options
    return allFormats.filter((format) => format.value !== currentExt);
  }

  getFormatLabel(format: string): string {
    const allFormats = Object.values(this.formats).flat();
    return (
      allFormats.find((f) => f.value === format)?.label || format.toUpperCase()
    );
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  selectFormat(format: string) {
    this.targetFormat = format;
    this.closeDropdown();
  }

  onSubmit() {
    if (!this.selectedFile || !this.targetFormat) {
      this.toast.showWarningToaster(
        'Please select a file and target format',
        'Warning'
      );
      return;
    }

    this.conversionStart.emit({
      file: this.selectedFile,
      targetFormat: this.targetFormat,
    });

    this.callAPI();
  }

  private callAPI() {
    if (!this.selectedFile || !this.targetFormat) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('targetFormat', this.targetFormat);

    this.isConverting = true;
    let url = `${API.domain + API.endPoint.convertAndUpload}`;

    this.http.post(url, formData).subscribe({
      next: (response) => {
        this.isConverting = false;
        this.toast.showSuccessToaster('File converted successfully', 'Error');
        this.conversionComplete.emit(response);
        this.resetForm();
      },
      error: (error) => {
        this.isConverting = false;
        this.toast.showErrorToaster('Failed to convert file', 'Error');
        this.conversionError.emit(error);
      },
    });
  }

  private resetForm() {
    this.selectedFile = null;
    this.targetFormat = '';
    this.sourceFormat = '';
    this.closeDropdown();
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
