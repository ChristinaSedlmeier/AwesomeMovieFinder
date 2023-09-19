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

  /**
   * Retrieves the list of movies as an observable stream.
   *
   * @returns {Observable<MovieModel[]>} An observable stream of movie data.
   * Use this method to access and subscribe to the list of movies.
   * Changes to the movie list will be automatically reflected in the emitted data.
   */
  public getMovieList(): Observable<MovieModel[]> {
    return this.movieDataSubject.asObservable();
  }

  /**
   * Retrieves detailed information about a movie by its IMDb ID.
   *
   * @param {string} imbdId - The IMDb ID of the movie to retrieve details for.
   * @returns {Observable<MovieDetailsModel>} An observable stream of movie details.
   * Use this method to fetch and subscribe to detailed information about a specific movie.
   */
  public getMovieDetails(imbdId: string): Observable<MovieDetailsModel> {
    return this.http.get<any>(`${environment.apiUrl}/?tt=${imbdId}`).pipe(
      map((response) => this.mapMovieDetailsDataToModel(response.short)),
      catchError((error) => {
        console.error('Error loading movie details:', error);
        return [];
      })
    );
  }

  /**
   * Loads movies from an API based on a search string and updates the movieDataSubject.
   *
   * @param {string} searchString - The search string used to query movies from the API.
   * This method fetches movies matching the search and updates the movieDataSubject with the results.
   * If successful, the movieDataSubject emits an updated list of movie models.
   */
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

  /**
   * Maps raw movie data to a MovieModel object.
   */
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

  /**
   * Maps raw movie detail data to a MovieDetailsModel object.
   */
  private mapMovieDetailsDataToModel(movieData: any): MovieDetailsModel {
    return {
      duration: movieData.duration,
      datePublished: movieData.datePublished,
      description: movieData.description,
    };
  }
}
