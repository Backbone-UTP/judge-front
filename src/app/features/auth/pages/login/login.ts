import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthFacade } from '../../state/auth-facade';

function sanitizeReturnUrl(value: string | null): string {
  if (!value) {
    return '/challenge-workspace';
  }

  const isInternalUrl = value.startsWith('/') && !value.startsWith('//');

  return isInternalUrl ? value : '/challenge-workspace';
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class LoginPage {
  private readonly formBuilder = inject(FormBuilder);

  private readonly authFacade = inject(AuthFacade);

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  submit(): void {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.authFacade
      .login(this.form.getRawValue())
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          const returnUrl = sanitizeReturnUrl(
            this.activatedRoute.snapshot.queryParamMap.get('returnUrl'),
          );

          void this.router.navigateByUrl(returnUrl);
        },
        error: () => {
          this.errorMessage.set('El correo o la contrasena no son validos.');
        },
      });
  }
}
