import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })
  export class LogoutService {
  
    tokensRevokeUrl!: string;
  
    constructor(
      private http: HttpClient,
      private auth: AuthService
    ) {
        this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`
     }
  
    logout() {
      return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
        .toPromise()
        .then(() => {
          this.auth.limparAccessToken();
        });
    }
  }