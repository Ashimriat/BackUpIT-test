import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FavouriteMovie } from '../../../interfaces';
import { addFavourite, removeFavourite } from '../../modules/store/actions';

@Component({
  selector: 'app-favourite-star',
  templateUrl: './favourite-star.component.html',
  styleUrls: ['./favourite-star.component.sass']
})
export class FavouriteStarComponent implements OnInit, OnDestroy {
  @Input() movie_id: number;
  @Input() movie_title: string;
  public isFavourite: boolean;
  public tooltipText: string;
  private _destroyed$ = new Subject();
  @select() favourite$: Observable<Array<FavouriteMovie>>;
  @dispatch() removeFavourite = removeFavourite;
  @dispatch() addFavourite = addFavourite;

  constructor() {}

  public ngOnInit(): void {
    this.favourite$
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe(favouriteMovies => {
        this.isFavourite = Boolean(favouriteMovies.find(movie => movie.id === this.movie_id));
        this.tooltipText = `Click to ${this.isFavourite ? 'remove from' : 'add to'} favourite`;
      });
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public toggleFavourite(event: Event): void {
    event.stopPropagation();
    this.isFavourite ?
      this.removeFavourite(this.movie_id) :
      this.addFavourite([{id: this.movie_id, title: this.movie_title}], true);
  }
}
