import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(public menu: MenuController, public usuario: UsuarioService, public router: Router) { }

  ngOnInit() {
  }

  async logout() {
    try {
      await this.usuario.logout();
    } catch (erro) {
      console.log(erro);
    }
  }

}
