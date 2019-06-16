import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { Router, NavigationExtras } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

import * as moment from 'moment';

@Component({
  selector: 'app-assistir',
  templateUrl: './assistir.page.html',
  styleUrls: ['./assistir.page.scss'],
})
export class AssistirPage implements OnInit {

  public userId = '';
  public assistir = [];
  public isVazio = false;

  constructor(private http: Http,
              private router: Router,
              private firebase: FirebaseService,
              private usuario: UsuarioService,
              private alert: AlertController) {
    this.carregaUser();
  }

  ngOnInit() {
  }

  async carregaUser() {
    await this.usuario.getUser().subscribe((user) => this.userId = user.id);
    await this.carregaFilmes();
  }

  async carregaFilmes() {
    this.firebase.db().collection('assistir')
      .where('user_id', '==', this.userId)
      .onSnapshot(results => {
        this.assistir = [];
        results.docs.forEach(doc => {
          this.assistir.push({ id: doc.id, ...doc.data() });
        });
        this.assistir.sort(this.dateSortAsc);

      });

    if (this.assistir.length === 0) {
      this.isVazio = true;
    }
  }

  isSelected(movie) {
    const navigation: NavigationExtras = {
      queryParams: {
        id: movie.filme.id
      }
    };
    this.router.navigate(['/menu/movie-card'], navigation);
  }

  dateSortAsc = (a, b) => {
    const datea = moment(a.date, 'DD/MM/YYYY').toDate();
    const dateb = moment(b.date, 'DD/MM/YYYY').toDate();
    if (datea > dateb) { return 1; }
    if (datea < dateb) { return -1; }
    return 0;
  }
}
