import { TheMovieService } from './../services/the-movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-similar',
  templateUrl: './modal-similar.page.html',
  styleUrls: ['./modal-similar.page.scss'],
})
export class ModalSimilarPage implements OnInit {

  @Input() filme: string;
  @Input() id: number;

  public similares = [];

  constructor(public modal: ModalController, private http: Http, private theMovieService: TheMovieService) { }

  ngOnInit() {
    this.getSimilares();
  }

  close() {
    this.modal.dismiss({
      retorno: 'Fechou'
    });
  }

  async getSimilares() {
    const apiKey = 'f6ab6a4a601bf61874516efcb8a6f282';

    const url = `movie/${this.id}/similar?api_key=${apiKey}&language=pt-BR&page=1&region=br`;

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
            sinopse: await this.doTruncarStr(filmes[i].overview, filmes[i].overview.length / 4),
            titulo: filmes[i].title
          });
        }
      },
      erro => { console.error(erro); }
    );
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
