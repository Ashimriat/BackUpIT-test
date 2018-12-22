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
  constructor() { }
  ngOnInit() {}
  showMovieInfo() {
    this.setCurrentMovie(this.movie.id);
  }
}
