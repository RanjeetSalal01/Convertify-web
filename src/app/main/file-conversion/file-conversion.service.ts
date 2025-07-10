import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileConversionService {
  isLoggedIn: boolean = false;

  user: any;

  constructor() {
    let authData = JSON.parse(localStorage.getItem('Convertify')!);
    if (authData?.token != null) {
      this.isLoggedIn = true;
      this.user = authData.user;
    }
  }
}
