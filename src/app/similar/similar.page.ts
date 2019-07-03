import { TheMovieService } from './../services/the-movie.service';
import { Http, Headers } from '@angular/http';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.page.html',
  styleUrls: ['./similar.page.scss'],
})
export class SimilarPage implements OnInit {

  public similares = [];
  public filme = '';

  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private theMovieService: TheMovieService) {
    this.route.queryParams.subscribe(params => {
      if (params && params.id && params.movie) {
        this.filme = params.movie;
        this.getSimilares(params.id);
      }
    });
  }

  ngOnInit() {
  }

  async getSimilares(id) {
    const apiKey = 'f6ab6a4a601bf61874516efcb8a6f282';


    const url = `movie/${id}/similar?api_key=${apiKey}&language=pt-BR&page=1&region=br`;

    this.similares = [];

    await this.theMovieService.getData(url).subscribe(
      async (sucesso: any) => {
        const filmes = sucesso.results;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < filmes.length; i++) {
          this.similares.push({
            dataLanc: moment(filmes[i].release_date).format('DD/MM/YYYY'),
            id: filmes[i].id,
            mediaVotos: filmes[i].vote_average,
            poster: `https://image.tmdb.org/t/p/w500${filmes[i].poster_path}`,
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
