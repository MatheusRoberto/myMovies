import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {

  constructor(public usuario: UsuarioService, public router: Router) {

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return Observable.create(observer => {
      this.usuario.getUser().subscribe(user => {
        if (user.isOnline) {
          observer.next(true);
        } else {
          this.router.navigateByUrl('/login');
        }
      });
    });
  }

}
