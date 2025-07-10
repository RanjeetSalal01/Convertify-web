import { Routes } from '@angular/router';
import { LandingPageComponent } from './main/landing-page/landing-page.component';
import { FileConversionComponent } from './main/file-conversion/file-conversion.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },

  {
    path: 'file-conversion',
    component: FileConversionComponent,
    loadChildren: () =>
      import('./main/file-conversion/file-conversion.module').then(
        (m) => m.FileConversionModule
      ),
  },
];
