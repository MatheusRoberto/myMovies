import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TheMovieService {

  apiRoot = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient) { }

  getData(url) {
    return this.http.jsonp(`${this.apiRoot}${url}`, 'callback');
  }
}
