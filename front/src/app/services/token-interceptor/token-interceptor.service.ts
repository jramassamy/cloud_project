import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthentificationService } from 'src/app/services/authentification/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  authentificationService: AuthentificationService;
  constructor(private injector: Injector) {
  }

  intercept(req, next) {
    const authentificationService = this.injector.get(AuthentificationService);
    if (authentificationService.loggedIn()) {
      const tokenizedReq = req.clone({
        setHeaders: {
          token: `${authentificationService.getToken()}`
        }
      });
      return next.handle(tokenizedReq);
    } else {
      return next.handle(req);
    }
  }
}
