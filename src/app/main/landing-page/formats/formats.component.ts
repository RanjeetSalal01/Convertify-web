import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-formats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formats.component.html',
  styleUrl: './formats.component.scss',
})
export class FormatsComponent {
  formatCards: any = [
    {
      title: 'Images',
      icon: '/features/image.svg',
      color: 'text-blue-600',
      hoverShadow: 'hover:shadow-blue-500/20',
      badgeColor: 'bg-blue-100 text-blue-800',
      formats: ['JPG', 'PNG', 'WebP', 'BMP', 'GIF'],
    },
    {
      title: 'Documents',
      icon: '/features/doc.svg',
      color: 'text-green-600',
      hoverShadow: 'hover:shadow-green-500/20',
      badgeColor: 'bg-green-100 text-green-800',
      formats: ['PDF', 'DOCX', 'TXT', 'ODT', 'RTF'],
    },
    {
      title: 'Videos',
      icon: '/features/video.svg',
      color: 'text-purple-600',
      hoverShadow: 'hover:shadow-purple-500/20',
      badgeColor: 'bg-purple-100 text-purple-800',
      formats: ['MP4', 'AVI', 'MKV', 'MOV', 'WMV'],
    },
    {
      title: 'Audio',
      icon: '/features/audio.svg',
      color: 'text-orange-600',
      hoverShadow: 'hover:shadow-orange-500/20',
      badgeColor: 'bg-orange-100 text-orange-800',
      formats: ['MP3', 'WAV', 'AAC', 'OGG', 'FLAC'],
    },
  ];
}
