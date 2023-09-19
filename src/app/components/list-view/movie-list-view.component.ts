import { Component, OnInit } from '@angular/core';
import { MovieModel } from 'src/app/models/movieModel';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'movie-list-view',
  templateUrl: './movie-list-view.component.html',
  styleUrls: ['./movie-list-view.component.scss']
})
export class ListViewComponent implements OnInit{
 public movieList: MovieModel[];

  constructor(private movieService: MovieService) { 
    
  }

  public ngOnInit(): void {
    this.movieService.movieData$.subscribe(data => this.movieList = data);
  }  
}
