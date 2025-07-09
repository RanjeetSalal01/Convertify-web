import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss',
})
export class TestimonialComponent {
  testimonials = [
    {
      name: 'Alex Thompson',
      role: 'Content Creator',
      content:
        'Convertify saved me hours of work! Converting my video files has never been this easy and fast.',
      rating: 4,
    },
    {
      name: 'Sarah Martinez',
      role: 'Graphic Designer',
      content:
        'The image conversion quality is amazing, and the interface is so intuitive. Perfect for my workflow!',
      rating: 5,
    },
    {
      name: 'David Chen',
      role: 'Business Analyst',
      content:
        'Converting documents for client presentations is now effortless. The PDF quality is excellent!',
      rating: 5,
    },
  ];
}
