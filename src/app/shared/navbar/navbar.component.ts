import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { AuthComponent } from '../../main/auth/auth.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AuthComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private matDialog: MatDialog, private router: Router) {}

  openAuthDialog(): void {
    this.matDialog.open(AuthComponent, {
      width: '400px',
      data: { mode: 'login' }, // Default mode can be set here
    });
  }

  redirect() {
    this.router.navigate(['/file-conversion/guest'])
  }
}
