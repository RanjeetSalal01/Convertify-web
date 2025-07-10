import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  showSuccessToaster(message: string | undefined, title: string | undefined) {
    this.toastr.success(message, title);
  }
  showErrorToaster(message: string | undefined, title: string | undefined) {
    this.toastr.error(message, title);
  }
  showWarningToaster(message: string | undefined, title: string | undefined) {
    this.toastr.warning(message, title, {
      titleClass: 'titleClass',
      messageClass: 'messageClass',
    });
  }
}
