import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private authenticator: AuthService) {

    }

    public canActivate(): boolean {
        return this.authenticator.usuarioAutenticado()
    }

}