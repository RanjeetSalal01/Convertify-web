import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FeaturesComponent } from './features/features.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { FormatsComponent } from './formats/formats.component';
import { StatsComponent } from './stats/stats.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroSectionComponent,
    FeaturesComponent,
    TestimonialComponent,
    FormatsComponent,
    StatsComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
