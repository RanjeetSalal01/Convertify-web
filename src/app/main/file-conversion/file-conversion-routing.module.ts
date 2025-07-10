import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { GuestComponent } from './guest/guest.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { GuestGuard } from '../../core/guards/guest.guard';

const routes: Routes = [
  {
    path: 'logged-in',
    component: LoggedInComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'guest',
    component: GuestComponent,
    canActivate: [GuestGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileConversionRoutingModule {}
