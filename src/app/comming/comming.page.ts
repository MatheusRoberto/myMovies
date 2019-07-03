import { TheMovieService } from './../services/the-movie.service';
import { Router, NavigationExtras } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-comming',
  templateUrl: './comming.page.html',
  styleUrls: ['./comming.page.scss'],
})
export class CommingPage implements OnInit {

  public lancamentos = [];
  public inicio;
  public fim;

  constructor(private http: Http, private router: Router, private theMovieService: TheMovieService) {
    this.getLancamentos();
  }

  ngOnInit() { }

  async getLancamentos() {
    const apiKey = 'f6ab6a4a601bf61874516efcb8a6f282';

    const url = `movie/upcoming?api_key=${apiKey}&language=pt-BR&page=1&region=br`;

    this.lancamentos = [];

    await this.theMovieService.getData(url).subscribe(
      async (sucesso: any) => {
        const filmes = sucesso.results;

        this.inicio = moment(sucesso.dates.minimum).format('DD/MM');
        this.fim = moment(sucesso.dates.maximum).format('DD/MM');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < filmes.length; i++) {
          let lPoster;
          if (filmes[i].poster_path === null) {
            lPoster = 'assets/img/no-image.jpg';
          } else {
            lPoster = `https://image.tmdb.org/t/p/w500${filmes[i].poster_path}`;
          }
          this.lancamentos.push({
            dataLanc: moment(filmes[i].release_date).format('DD/MM/YYYY'),
            id: filmes[i].id,
            mediaVotos: filmes[i].vote_average,
            poster: lPoster,
            sinopse: await this.doTruncarStr(filmes[i].overview, filmes[i].overview.length / 2),
            titulo: filmes[i].title
          });
        }
      },
      erro => { console.error(erro); }
    );
  }


  isSelected(movie) {
    const navigation: NavigationExtras = {
      queryParams: {
        id: movie.id
      }
    };
    this.router.navigate(['/menu/movie-card'], navigation);
  }

  doTruncarStr(str, size) {
    if (str === undefined || str === 'undefined' || str === '' || size === undefined || size === 'undefined' || size === '') {
      return str;
    }

    let shortText = str;
    if (shortText.length > size) {
      size--;
      let last = shortText.substr(size - 1, 1);
      while (last !== ' ' && size > 0) {
        size--;
        last = shortText.substr(size - 1, 1);
      }
      last = shortText.substr(size - 2, 1);
      if (last === ',' || last === ';' || last === ':') {
        shortText = shortText.substr(0, size - 2) + '...';
      } else if (last === '.' || last === '?' || last === '!') {
        shortText = shortText.substr(0, size - 1);
      } else {
        shortText = shortText.substr(0, size - 1) + '...';
      }
    }
    return shortText;
  }
}
