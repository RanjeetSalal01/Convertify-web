import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../core/shared.module';
import { AppService } from '../../core/services/app.service';
import { API } from '../../api';
import { Router } from '@angular/router';
import { ToasterService } from '../../core/services/toaster.service';
export interface AuthDialogData {
  mode?: 'login' | 'signup';
}

export interface AuthResult {
  email: string;
  password: string;
  name?: string;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  showPassword: boolean = false;
  loginForm!: FormGroup;
  signupForm!: FormGroup;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toast: ToasterService,
    private router: Router,
    private service: AppService,
    private dialogRef: MatDialogRef<AuthComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthDialogData
  ) {}

  ngOnInit(): void {
    this.isLoginMode = this.data?.mode === 'signup' ? false : true;
    this.initializeForms();
  }

  initializeForms(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.showPassword = false;
    this.resetForms();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  resetForms(): void {
    this.loginForm.reset();
    this.signupForm.reset();
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      this.onLogin();
    } else {
      this.onSignup();
    }
  }

  onLogin(): void {
    try {
      if (this.loginForm.valid) {
        this.isLoading = true;
        const { email, password } = this.loginForm.value;
        let url = `${API.domain + API.endPoint.login}`;

        this.service.postMethod(url, { email, password }).subscribe({
          next: (res: any) => {
            if (res.success) {
              localStorage.setItem(
                'Convertify',
                JSON.stringify({
                  token: res.token,
                  user: res.user,
                  expiresAt: Date.now() + 24 * 60 * 60 * 1000, // now + 1 day
                })
              );
              this.dialogRef.close({ email, password });
              this.router.navigate(['/file-conversion/logged-in']);
              this.toast.showSuccessToaster(res.message, 'Success');
            } else {
              this.toast.showWarningToaster(res.message, 'Warning');
            }
            this.isLoading = false;
          },
          error: (err: any) => {
            this.isLoading = false;
            console.error('Error during login:', err);
          },
        });
      }
    } catch (error) {
      this.toast.showErrorToaster('Login failed', 'Error');
      console.error('Login failed:', error);
    }
  }

  onSignup(): void {
    if (this.signupForm.invalid) return;

    const { name, email, password } = this.signupForm.value;

    const url = `${API.domain}${API.endPoint.register}`;
    const payload = { name, email, password };
    this.isLoading = true;

    this.service.postMethod(url, payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        if (res.success) {
          localStorage.setItem(
            'Convertify',
            JSON.stringify({
              token: res.token,
              user: res.user,
              expiresAt: Date.now() + 24 * 60 * 60 * 1000,
            })
          );
          this.router.navigate(['/file-conversion/logged-in']);
          this.dialogRef?.close({ email, password }); // Optional: pass only user
          this.toast.showSuccessToaster(res.message, 'Success');
        } else {
          this.toast.showWarningToaster(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Signup Error:', err);
        this.toast.showErrorToaster('Signup error. Please try again.', 'Error');
      },
    });
  }

  getEmailError(): string {
    const emailControl = this.isLoginMode
      ? this.loginForm.get('email')
      : this.signupForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email is required';
    }
    if (emailControl?.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  getPasswordError(): string {
    const passwordControl = this.isLoginMode
      ? this.loginForm.get('password')
      : this.signupForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Password is required';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }

  getNameError(): string {
    const nameControl = this.signupForm.get('name');
    if (nameControl?.hasError('required')) {
      return 'Name is required';
    }
    return '';
  }
}
