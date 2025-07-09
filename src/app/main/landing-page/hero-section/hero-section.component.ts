import { Component } from '@angular/core';
import { SharedModule } from '../../../core/shared.module';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [SharedModule, SharedModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  onGetStarted() {
    // Logic to handle the "Get Started" button click
    console.log('Get Started button clicked');
  }
}
