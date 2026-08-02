import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { AuthService } from '../services/auth';

export function rolGuard(rolEsperado: 'admin' | 'cliente'): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const platform = inject(PLATFORM_ID);

    // En el servidor (SSR) no existe localStorage: se deja pasar la petición
    // inicial y el guard del cliente decide después de la hidratación.
    if (isPlatformServer(platform)) {
      return true;
    }

    if (!auth.isLoggedIn) {
      router.navigate(['/login']);
      return false;
    }

    if (auth.role !== rolEsperado) {
      router.navigate(['/']);
      return false;
    }

    return true;
  };
}
