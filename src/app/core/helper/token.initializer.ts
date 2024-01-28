import { AuthService } from '../services/auth/auth.service';

export function tokenInitializer(auth: AuthService) {
  return () =>
		new Promise((resolve: any) => {
			// attempt to refresh token on app start up to auto authenticate
			auth.refreshToken().subscribe().add(resolve);
		});
}
