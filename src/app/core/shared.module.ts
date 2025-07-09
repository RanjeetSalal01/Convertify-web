import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  File,
  House,
  Menu,
  CalendarArrowUp,
  UserCheck,
  ArrowRight,
} from 'lucide-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LucideAngularModule.pick({
      File,
      House,
      Menu,
      ArrowRight,
      UserCheck,
      CalendarArrowUp,
    }),
  ],
})
export class SharedModule {}
