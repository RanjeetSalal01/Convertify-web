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
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  showPassword: boolean = false;
  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
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
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
        this.dialogRef.close({ email, password });
      }
    } else {
      if (this.signupForm.valid) {
        const { name, email, password } = this.signupForm.value;
        this.dialogRef.close({ name, email, password });
      }
    }
  }

  onGoogleLogin(): void {
    // Handle Google login logic here
    console.log('Google login clicked');
    this.dialogRef.close({ provider: 'google' });
  }

  onTwitterLogin(): void {
    // Handle Twitter login logic here
    console.log('Twitter login clicked');
    this.dialogRef.close({ provider: 'twitter' });
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
