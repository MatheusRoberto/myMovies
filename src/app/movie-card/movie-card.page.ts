import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as moment from 'moment';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import {  ToastController } from '@ionic/angular';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.page.html',
  styleUrls: ['./movie-card.page.scss'],
})
export class MovieCardPage implements OnInit {

  public movie: any = {};
  public filme: any = {};
  public userId = '';
  public assistir = undefined;
  public assistido = undefined;
  public objAssistido: any;
  public objAssitir: any;

  constructor(private http: Http,
              private route: ActivatedRoute,
              private firebase: FirebaseService,
              private usuario: UsuarioService,
              private toast: ToastController,
              private iab: InAppBrowser,
              private router: Router) {
    this.carregaUser();
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.getMovie(params.id);
      }
    });
    this.filme.filme = {};

  }

  ngOnInit() {
  }

  async getMovie(id) {

    const apiKey = 'f6ab6a4a601bf61874516efcb8a6f282';

    const headers = { headers: new Headers({ 'Cache-Control': 'no-cache' }) };

    // tslint:disable-next-line:max-line-length
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR&region=br&append_to_response=videos,images&include_image_language=pt-BR,null`;

    await this.http.get(url, headers).subscribe(
      async sucesso => {
        console.log(sucesso.json());
        this.movie.dataLanc = moment(sucesso.json().release_date).format('DD/MM/YYYY');
        this.movie.genero = sucesso.json().genres;
        this.movie.homepage = sucesso.json().homepage;
        this.movie.id = sucesso.json().id;
        this.movie.imdb = `https://www.imdb.com/title/${sucesso.json().imdb_id}`;
        this.movie.imagens = await this.imagens(sucesso.json().images);
        this.movie.mediaVotos = sucesso.json().vote_average;
        this.movie.orcamento = sucesso.json().budget;
        this.movie.planoFundo = `https://image.tmdb.org/t/p/original${sucesso.json().backdrop_path}`;
        this.movie.poster = `https://image.tmdb.org/t/p/w300${sucesso.json().poster_path}`;
        this.movie.receita = sucesso.json().revenue;
        this.movie.sinopse = sucesso.json().overview;
        this.movie.tempo = sucesso.json().runtime;
        this.movie.titulo = sucesso.json().title;
        this.movie.tituloOrig = sucesso.json().original_title;
        this.movie.videos = await this.videos(sucesso.json().videos);
      },
      erro => { console.error(erro); }
    );

    this.buscaObjeto(id);
  }

  async carregaUser() {
    await this.usuario.getUser().subscribe((user) => this.userId = user.id);
  }

  async adicionarAssistir() {

    if (this.objAssistido !== undefined) {
      this.filme.filme.vezes = ++this.objAssistido.filme.vezes;
    } else {
      this.filme.filme.vezes = 0;
    }

    this.filme.user_id = this.userId;
    this.filme.data = moment(new Date()).format('DD/MM/YYYY');
    this.filme.filme.id = this.movie.id;
    this.filme.filme.poster = this.movie.poster;
    this.filme.filme.titulo = this.movie.titulo;
    this.filme.filme.tituloOrig = this.movie.tituloOrig;
    await this.firebase.db().collection('assistir').add(this.filme);
    this.buscaObjeto(this.filme.filme.id);
    this.filme = {};
    this.filme.filme = {};
    this.toastAssistir();
  }

  async adicionarAssistido() {

    if (this.objAssitir !== undefined) {
      await this.deletar(this.objAssitir);
    }
    if (this.objAssistido !== undefined) {
      this.objAssistido.filme.vezes++;
      this.objAssistido.data = moment(new Date()).format('DD/MM/YYYY');
      console.log(this.objAssistido);
      await this.atualizar(this.objAssistido, this.objAssistido);
      this.buscaObjeto(this.objAssistido.filme.id);
    } else {
      this.filme.user_id = this.userId;
      this.filme.data = moment(new Date()).format('DD/MM/YYYY');
      this.filme.filme.id = this.movie.id;
      this.filme.filme.poster = this.movie.poster;
      this.filme.filme.titulo = this.movie.titulo;
      this.filme.filme.tituloOrig = this.movie.tituloOrig;
      this.filme.filme.vezes = 1;
      await this.firebase.db().collection('assistido').add(this.filme);
      this.buscaObjeto(this.filme.filme.id);
    }
    this.filme = {};
    this.filme.filme = {};
    this.toastAssistido();
  }

  async deletar(m) {
    await this.firebase.db().collection('assistir').doc(m.id).delete();

  }

  async atualizar(m, fil) {
    await this.firebase.db().collection('assistido').doc(m.id).update({
      data: fil.data,
      filme: {
        id: fil.filme.id,
        poster: fil.filme.poster,
        titulo: fil.filme.titulo,
        tituloOrig: fil.filme.tituloOrig,
        vezes: fil.filme.vezes
      }
    });
  }

  async buscaObjeto(id) {
    this.objAssistido = undefined;
    this.objAssitir = undefined;
    const resultsAssistir = await this.firebase.db().collection('assistir')
      .where('user_id', '==', this.userId).get();
    const resultsAssistido = await this.firebase.db().collection('assistido')
      .where('user_id', '==', this.userId).get();

    id = parseInt(id, 10);
    await resultsAssistir.docs.forEach(doc => {
      if (doc.data().filme.id === id) {
        this.objAssitir = { id: doc.id, ...doc.data() };
      }
    });

    await resultsAssistido.docs.forEach(doc => {
      if (doc.data().filme.id === id) {
        this.objAssistido = { id: doc.id, ...doc.data() };
      }
    });

    this.assistir = this.objAssitir !== undefined;
    this.assistido = this.objAssistido !== undefined;

  }

  async imagens(images) {
    const imgs = [];
    images = images.backdrops.splice(0, 5);
    await images.forEach(element => {
      imgs.push(`https://image.tmdb.org/t/p/original${element.file_path}`);
    });
    return imgs;
  }

  async videos(videos) {
    const vds = [];
    videos = videos.results.splice(0, 3);
    await videos.forEach(element => {
      if (element.site === 'YouTube') {
        vds.push({ url: `https://www.youtube.com/watch?v=${element.key}`, tipo: element.type });
      }
    });
    return vds;
  }

  async toastAssistir() {
    const notificacao = await this.toast.create({
      message: 'Filme adicionado á Assistir!',
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Fechar',
      duration: 3000
    });
    notificacao.present();
  }

  async toastAssistido() {
    const notificacao = await this.toast.create({
      message: 'Filme adicionado aos Assistidos!',
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Fechar',
      duration: 3000
    });
    notificacao.present();
  }

  async openBrowser(link) {
    const browser = this.iab;
    browser.create(link, '_blank');
  }

  isSimilar(movie) {
    const navigation: NavigationExtras = {
      queryParams: {
        id: movie.id,
        movie: movie.titulo
      }
    };
    this.router.navigate(['/menu/similar'], navigation);
  }
}
