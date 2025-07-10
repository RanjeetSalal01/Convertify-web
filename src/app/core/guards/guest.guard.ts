// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const GuestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('Convertify');

  if (!token) {
    return true;
  } else {
    router.navigate(['/file-conversion/logged-in']);
    return false;
  }
};
