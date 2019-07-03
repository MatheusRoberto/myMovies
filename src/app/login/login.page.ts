import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email = '';
  public senha = '';
  public checkingUser = true;
  public showLoading = false;
  public showLoadingR = false;
  public mensagem;

  constructor(public usuario: UsuarioService, public router: Router) {
    this.usuario.getUser().subscribe(user => {
      (user.isOnline)
        ? this.router.navigateByUrl('/menu/home')
        : this.checkingUser = false;
    });
  }

  async login() {
    try {
      this.showLoading = true;
      await this.usuario.login(this.email, this.senha);
      this.showLoading = false;
      this.router.navigateByUrl('/menu/home');
    } catch (error) {
      this.showLoading = false;
      if (error === 'auth/invalid-email') {
        this.mensagem = 'Email inválido';
      } else if (error.code === 'auth/wrong-password') {
        this.mensagem = 'A senha é inválida';
      } else if (error.code === 'auth/user-not-found') {
        this.mensagem = 'Usuário não encontrado';
      } else {
        this.mensagem = error.message;
      }
      console.log(error);
    }
  }

  async registrar() {
    try {
      this.showLoadingR = true;
      await this.usuario.registrar(this.email, this.senha);
    } catch (error) {
      this.showLoadingR = false;
      if (error === 'auth/invalid-email') {
        this.mensagem = 'Email inválido';
      } else if (error.code === 'auth/weak-password') {
        this.mensagem = 'A senha é inválida precisa de pelos menos 6 caracteres';
      } else {
        this.mensagem = error.message;
      }
      console.log(error.code);
    }
  }

  async loginFacebook() {
    this.usuario.facebookLogin();
  }

  ngOnInit() {
  }

}
