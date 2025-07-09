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
  Loader2,
  Upload,
  Zap,
  Clock,
  CheckCircle,
  Star,
  Eye,
  EyeOff,
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
      Loader2,
      Upload,
      Zap,
      Clock,
      CheckCircle,
      Star,
      Eye,
      EyeOff,
    }),
  ],
  exports: [CommonModule, LucideAngularModule],
})
export class SharedModule {}
