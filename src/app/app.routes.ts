import { Routes } from '@angular/router';
import { LandingPageComponent } from './main/landing-page/landing-page.component';
import { FileConversionComponent } from './main/file-conversion/file-conversion.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },

  {
    path: 'file-conversion',
    component: FileConversionComponent,
  },
];
