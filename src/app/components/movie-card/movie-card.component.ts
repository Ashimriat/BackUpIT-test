import { Component, OnInit, Input } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { MovieShort } from '../../../interfaces';
import { setCurrentMovie } from '../../modules/store/actions';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})

export class MovieCardComponent implements OnInit {
  @Input() movie: MovieShort;
  @dispatch() setCurrentMovie = setCurrentMovie;
  imagePath = '';
  constructor() { }
  ngOnInit() {
    this.imagePath = !this.movie.backdrop_path && !this.movie.poster_path ?
      'assets/placeholder.png'
      : `https://image.tmdb.org/t/p/w300${this.movie.backdrop_path || this.movie.poster_path}`;
  }
  showMovieInfo() {
    this.setCurrentMovie(this.movie.id);
  }
}
