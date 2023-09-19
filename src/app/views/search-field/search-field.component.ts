import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit {
  private defaultSearchString: string = '2000';
  public userInput: string = '';

  constructor(private movieService: MovieService) {}

  public ngOnInit(): void {
    this.updateMovieData();
  }

  public updateMovieData() {
    const searchString = this.userInput != '' ? this.userInput : this.defaultSearchString;
    this.movieService.loadMoviesBySearchString(searchString);
  }
}
