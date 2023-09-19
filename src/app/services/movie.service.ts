import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { MovieModel } from '../models/movieModel';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://search.imdbot.workers.dev/';

  private movieDataSubject = new BehaviorSubject<any>(null);
  movieData$ = this.movieDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  public getMoviesBySearchString(userInput: string): void {
    const url = `${this.apiUrl}/?q=${userInput}`;

    this.http.get<any>(url)
    .pipe(
      map((data) => data.description.map((movie: any) => this.mapMovieToMovieModel(movie)))
    )
    .subscribe((data) => {
      this.movieDataSubject.next(data);
    });
  }

  private mapMovieToMovieModel(movie: any): MovieModel {
    return {
      title: movie['#TITLE'],
      year: movie['#YEAR'],
      imbd_id: movie['#IMDB_ID'],
      rank: movie['#RANK'],
      actors: movie['#ACTORS'],
      aka: movie['#AKA'],
      imbd_url: movie['#IMDB_URL'],
      imbd_iv: movie['#IMDB_IV'],
      img_poster: movie['#IMG_POSTER'],
      photo_width: movie.photo_width,
      photo_height: movie.photo_height,
    };
  }
}
