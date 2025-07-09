import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FileIcon, MusicIcon, VideoIcon } from 'lucide-angular';

interface Feature {
  title: string;
  description: string;
  color: string;
  icon: any;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: "/features/image.svg",
      title: 'Image Conversion',
      description:
        'Transform images between JPG, PNG, WebP, BMP, and more formats instantly',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: "features/doc.svg",
      title: 'Document Processing',
      description:
        'Convert DOCX to PDF, TXT to ODT, and all major document formats',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: "features/video.svg",
      title: 'Video Conversion',
      description:
        'Convert MP4, AVI, MKV, MOV and other video formats with high quality',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: "features/audio.svg",
      title: 'Audio Processing',
      description:
        'Transform MP3, WAV, AAC, OGG and other audio formats seamlessly',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: "features/fast.svg",
      title: 'Lightning Fast',
      description:
        'Queue-based processing with real-time updates and progress tracking',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: "features/secure.svg",
      title: 'Secure & Private',
      description:
        'Files auto-deleted after download, no permanent storage or tracking',
      color: 'from-indigo-500 to-purple-500',
    },
  ];
}
