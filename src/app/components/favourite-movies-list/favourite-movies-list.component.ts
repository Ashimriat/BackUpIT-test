import { Component, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { setCurrentMovie } from '../../modules/store/actions';
import { FavouriteMovie } from '../../../interfaces';
import { ListTrackerService } from '../../services/list-tracker.service';

@Component({
  selector: 'app-favourite-movies-list',
  templateUrl: './favourite-movies-list.component.html',
  styleUrls: ['./favourite-movies-list.component.sass']
})
export class FavouriteMoviesListComponent implements OnInit {
  public favouriteMovies$: Observable<Array<FavouriteMovie>>;
  @select() favourite$: Observable<Array<FavouriteMovie>>;
  @dispatch() setCurrentMovie = setCurrentMovie;
  constructor(public listTrackerService: ListTrackerService) { }

  public ngOnInit(): void {
   this.favouriteMovies$ = this.favourite$.pipe();
  }

  public setCurrent(movieId: number) {
    this.setCurrentMovie(movieId);
  }
}
