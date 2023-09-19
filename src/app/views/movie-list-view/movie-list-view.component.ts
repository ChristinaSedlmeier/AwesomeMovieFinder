import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MovieModel } from 'src/app/models/movieModel';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'movie-list-view',
  templateUrl: './movie-list-view.component.html',
  styleUrls: ['./movie-list-view.component.scss'],
})
export class ListViewComponent implements OnInit {
  public movieList$: Observable<MovieModel[]>;

  constructor(private movieService: MovieService) {}

  public ngOnInit(): void {
    this.movieList$ = this.movieService.getMovieList();
  }
}
