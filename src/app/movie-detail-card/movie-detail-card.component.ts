import { Component, Input, OnInit } from '@angular/core';
import { MovieModel } from '../models/movieModel';

@Component({
  selector: 'movie-detail-card',
  templateUrl: './movie-detail-card.component.html',
  styleUrls: ['./movie-detail-card.component.scss'],
})
export class MovieDetailCardComponent implements OnInit {
  @Input()
  public movie: MovieModel;

  constructor() {}

  public ngOnInit(): void {}
}
