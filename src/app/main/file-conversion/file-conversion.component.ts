import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileConversionHeaderComponent } from './file-conversion-header/file-conversion-header.component';
import { GuestComponent } from './guest/guest.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { FileConversionService } from './file-conversion.service';
import { RouterOutlet } from '@angular/router';

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
  selector: 'app-file-conversion',
  standalone: true,
  imports: [
    CommonModule,
    FileConversionHeaderComponent,
    GuestComponent,
    LoggedInComponent,
    RouterOutlet,
  ],
  templateUrl: './file-conversion.component.html',
  styleUrl: './file-conversion.component.scss',
})
export class FileConversionComponent {
  constructor(public fileService: FileConversionService) {}
}
