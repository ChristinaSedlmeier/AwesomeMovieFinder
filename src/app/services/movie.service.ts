import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { MovieModel } from '../models/movieModel';
import { environment } from 'src/environments/environment';
import { MovieDetailsModel } from '../models/movieDetailsModel';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movieDataSubject = new BehaviorSubject<MovieModel[]>([]);

  constructor(private http: HttpClient) {}

  public getMovieList(): Observable<MovieModel[]> {
    return this.movieDataSubject.asObservable();
  }

  public getMovieDetails(imbdId: string): Observable<MovieDetailsModel> {
    return this.http.get<any>(`${environment.apiUrl}/?tt=${imbdId}`).pipe(
      map((response) => this.mapMovieDetailsDataToModel(response.short)),
      catchError((error) => {
        console.error('Error loading movie details:', error);
        return [];
      })
    );
  }

  public loadMoviesBySearchString(searchString: string): void {
    this.http
      .get<any>(`${environment.apiUrl}/?q=${searchString}`)
      .pipe(
        map((response) =>
          response.description.map((movieData: any) =>
            this.mapMovieDataToModel(movieData)
          )
        ),
        catchError((error) => {
          console.error('Error loading movies:', error);
          return [];
        })
      )
      .subscribe((data) => {
        this.movieDataSubject.next(data);
      });
  }

  private mapMovieDataToModel(movieData: any): MovieModel {
    return {
      title: movieData['#TITLE'],
      year: movieData['#YEAR'],
      imdbId: movieData['#IMDB_ID'],
      rank: movieData['#RANK'],
      actors: movieData['#ACTORS'],
      aka: movieData['#AKA'],
      imdbUrl: movieData['#IMDB_URL'],
      imdbIv: movieData['#IMDB_IV'],
      imgPoster: movieData['#IMG_POSTER'],
      photoWidth: movieData.photo_width,
      photoHeight: movieData.photo_height,
    };
  }

  private mapMovieDetailsDataToModel(movieData: any): MovieDetailsModel {
    return {
      duration: movieData.duration,
      datePublished: movieData.datePublished,
      description: movieData.description,
    };
  }
}
