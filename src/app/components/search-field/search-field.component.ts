import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit{
  private defaultSearchString: string = '1997';
  public placeholderString: string = 'Harry Potter';
  public userInput: string = '';

  constructor(private movieService: MovieService) { 
  }

  public ngOnInit(): void {
    this.updateMovieData();
  }  

  public updateMovieData() {
    let searchString = this.userInput != '' ? this.userInput: this.defaultSearchString;
    this.movieService.getMoviesBySearchString(searchString);
  }
}
