import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'convertify-web';

  constructor(private router: Router) {
    const raw = localStorage.getItem('Convertify');
    if (raw) {
      const data = JSON.parse(raw);
      const isExpired = Date.now() > data.expiresAt;

      if (isExpired) {
        localStorage.removeItem('Convertify');
        this.router.navigate(['/']);
        // force logout or redirect
      }
    }
  }
}
