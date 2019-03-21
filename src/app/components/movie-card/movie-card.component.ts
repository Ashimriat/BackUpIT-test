import { Component, OnInit, Input } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { MovieShort } from '../../../interfaces';
import { setCurrentMovie } from '../../modules/store/actions';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.sass']
})

export class MovieCardComponent implements OnInit {
  @Input() movie: MovieShort;
  public imagePath = '';
  @dispatch() setCurrentMovie = (movieId: number) => setCurrentMovie(movieId);

  constructor() { }

  public ngOnInit(): void {
    if (!this.movie.backdrop_path && !this.movie.poster_path) {
      this.imagePath = 'assets/images/placeholder.png';
    } else {
      this.imagePath = `https://image.tmdb.org/t/p/w300${this.movie.backdrop_path || this.movie.poster_path}`;
    }
  }
}
