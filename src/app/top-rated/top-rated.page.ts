import { TheMovieService } from './../services/the-movie.service';
import { MovieCardPage } from './../movie-card/movie-card.page';
import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as moment from 'moment';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.page.html',
  styleUrls: ['./top-rated.page.scss'],
})
export class TopRatedPage implements OnInit {

  public movies = [];
  public pagina = 1;
  public totalPagina = 1;

  movieCard = MovieCardPage;

  constructor(private http: Http, private router: Router, private theMovieService: TheMovieService) {
    this.getTopRated();
  }

  ngOnInit() {
  }

  async getTopRated() {

    const apiKey = 'f6ab6a4a601bf61874516efcb8a6f282';

    const url = `movie/top_rated?api_key=${apiKey}&language=pt-BR&page=${this.pagina}&region=br`;

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
          this.movies.push({
            dataLanc: moment(filmes[i].release_date).format('DD/MM/YYYY'),
            id: filmes[i].id,
            mediaVotos: filmes[i].vote_average,
            sinopse: await this.doTruncarStr(filmes[i].overview, filmes[i].overview.length / 4),
            poster: lPoster,
            titulo: filmes[i].title
          });
          this.totalPagina = sucesso.total_pages;
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

  loadData(event) {
    setTimeout(() => {
      if (this.pagina < this.totalPagina) {
        this.pagina++;
        this.getTopRated();
        event.target.complete();
      }
    }, 2000);
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
