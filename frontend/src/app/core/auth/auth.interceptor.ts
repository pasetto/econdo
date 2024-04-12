import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { UserService } from './../user/user.service';
import { environment } from './../../../environments/environments';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private UserService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.UserService.getToken();
    
    if (!req.url.startsWith('http')) {
      req = req.clone({
        url: `${environment.apiUrl}${req.url}`,
      });
    }
    
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
    });

    // Retorna a próxima manipulação da requisição
    return next.handle(req);
  }
}
