import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent {
  stats = [
    {
      value: '1M+',
      label: 'Files Converted',
      gradientClass: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    },
    {
      value: '100+',
      label: 'File Formats',
      gradientClass: 'bg-gradient-to-r from-purple-600 to-pink-600',
    },
    {
      value: '99.9%',
      label: 'Success Rate',
      gradientClass: 'bg-gradient-to-r from-green-600 to-emerald-600',
    },
    {
      value: '24/7',
      label: 'Available',
      gradientClass: 'bg-gradient-to-r from-orange-600 to-red-600',
    },
  ];

  onGetStarted() {
    // Logic to navigate to the conversion page or open a modal
    console.log('Get Started clicked');
  }
}
