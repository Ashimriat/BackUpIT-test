import {Component, Input, OnInit} from '@angular/core';
import {dispatch, NgRedux, select} from '@angular-redux/store';
import {FavouriteMovie} from '../../../interfaces';
import {addFavourite, removeFavourite} from '../../modules/store/actions';
import {Observable} from 'rxjs';
import {State} from '../../modules/store/reducers';

@Component({
  selector: 'app-movie-favourite-star',
  templateUrl: './movie-favourite-star.component.html',
  styleUrls: ['./movie-favourite-star.component.css']
})

export class MovieFavouriteStarComponent implements OnInit {
  @Input() movie_id: number;
  @Input() movie_title: string;
  @select() favourite$: Observable<Array<FavouriteMovie>>;
  isFavourite: boolean;
  @dispatch() removeFavourite = removeFavourite;
  @dispatch() addFavourite = (favourite: Array<FavouriteMovie>) => addFavourite(favourite, true);
  constructor() {  }
  ngOnInit() {
    this.favourite$.subscribe(favouriteMovies => {
      this.isFavourite = Boolean(favouriteMovies.find(movie => movie.id === this.movie_id));
    });
  }
  toggleFavourite(event: Event) {
    event.stopPropagation();
    if (this.isFavourite) {
      this.removeFavourite(this.movie_id);
    } else {
      this.addFavourite([{id: this.movie_id, title: this.movie_title}]);
    }
  }
}
