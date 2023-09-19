import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../models/movieModel';
import { MovieService } from '../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'movie-list-view',
  templateUrl: './movie-list-view.component.html',
  styleUrls: ['./movie-list-view.component.scss'],
})
export class ListViewComponent implements OnInit {
  public movieList: MovieModel[];
  private subscription: Subscription;

  constructor(private movieService: MovieService) {}

  public ngOnInit(): void {
    this.subscription = this.movieService
      .getMovieData()
      .subscribe((data) => (this.movieList = data));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
