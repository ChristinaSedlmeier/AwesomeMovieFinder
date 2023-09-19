import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MovieModel } from '../models/movieModel';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://search.imdbot.workers.dev/';
  private movieDataSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  public getMovieData(): Observable<any> {
    return this.movieDataSubject.asObservable();
  }

  public loadMoviesBySearchString(searchString: string): void {
    const url = `${this.apiUrl}/?q=${searchString}`;

    this.http
      .get<any>(url)
      .pipe(
        map((response) =>
          response.description.map(
            (movieData: any) =>
              ({
                title: movieData['#TITLE'],
                year: movieData['#YEAR'],
                imbd_id: movieData['#IMDB_ID'],
                rank: movieData['#RANK'],
                actors: movieData['#ACTORS'],
                aka: movieData['#AKA'],
                imbd_url: movieData['#IMDB_URL'],
                imbd_iv: movieData['#IMDB_IV'],
                img_poster: movieData['#IMG_POSTER'],
                photo_width: movieData.photo_width,
                photo_height: movieData.photo_height,
              } as MovieModel)
          )
        )
      )
      .subscribe((data) => {
        this.movieDataSubject.next(data);
      });
  }
}
