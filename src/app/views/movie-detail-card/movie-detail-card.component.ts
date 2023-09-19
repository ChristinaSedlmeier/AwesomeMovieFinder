import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetailsModel } from 'src/app/models/movieDetailsModel';
import { MovieModel } from 'src/app/models/movieModel';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'movie-detail-card',
  templateUrl: './movie-detail-card.component.html',
  styleUrls: ['./movie-detail-card.component.scss'],
})
export class MovieDetailCardComponent implements OnInit {
  @Input()
  public movie: MovieModel;

  public movieDetails$: Observable<MovieDetailsModel>;

  constructor(private movieService: MovieService) {}

  public ngOnInit(): void {
    this.movieDetails$ = this.movieService.getMovieDetails(this.movie.imdbId);
  }
}
