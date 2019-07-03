import { Router, NavigationExtras } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { TheMovieService } from '../services/the-movie.service';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  public busca = [];
  public query: string;
  public buscando = false;

  constructor(private http: Http, private router: Router, private theMovieService: TheMovieService) {
  }

  ngOnInit() {
  }

  async getBusca() {
    if (this.query === undefined || this.query === '' || this.query === '  ') {
      return;
    }
    this.buscando = true;
    const apiKey = 'f6ab6a4a601bf61874516efcb8a6f282';


    // tslint:disable-next-line:max-line-length
    const url = `search/movie?api_key=${apiKey}&language=pt-BR&page=1&include_adult=false&region=br&query=${this.query}`;

    this.busca = [];

    await this.theMovieService.getData(url).subscribe(
      async (sucesso: any) => {
        const filmes = sucesso.results;


        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < filmes.length; i++) {
          let lPoster;
          if (filmes[i].poster_path === null) {
            lPoster = 'assets/img/no-image.jpg';
          } else {
            lPoster = `https://image.tmdb.org/t/p/w500${filmes[i].poster_path}`;
          }
          this.busca.push({
            dataLanc: moment(filmes[i].release_date).format('DD/MM/YYYY'),
            id: filmes[i].id,
            mediaVotos: filmes[i].vote_average,
            poster: lPoster,
            titulo: filmes[i].title,
            titulo_orig: filmes[i].original_title
          });
        }
      },
      erro => { console.error(erro); }
    );
    this.buscando = false;
  }


  isSelected(movie) {
    const navigation: NavigationExtras = {
      queryParams: {
        id: movie.id
      }
    };
    this.router.navigate(['/menu/movie-card'], navigation);
  }

}
