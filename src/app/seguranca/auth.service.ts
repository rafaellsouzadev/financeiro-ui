import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token'
  jwtPayload: any;

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService,
              private jwtHelper: JwtHelperService,
              private router: Router) { 
                this.carregarToken();
              }

  login(usuario: string, senha:string): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(`${this.oauthTokenUrl}`, body, { headers })
      .toPromise()
      .then((response:any) => {
        console.log(response);
        this.armazenarToken(response['access_token'])
      }).catch(response => {
        if (response.status === 400) {
          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if(token) {
      this.armazenarToken(token);
    }
    if(this.limparLocalStorage()) {
      localStorage.clear();
    }

  }

  limparLocalStorage() {
    return this.router.url == '/login'
  }

  
}
