import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { PageEvent } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MoviesList } from '../../../interfaces';
import { ApiService } from '../../services/api.service';
import { ListTrackerService } from '../../services/list-tracker.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.sass']
})

export class MoviesListComponent implements OnInit, OnDestroy {
  @Input() moviesType: 'POPULAR' | 'RECOMMENDED';
  public movies: MoviesList = null;
  public loading = false;
  public currentPage = 0;
  public searchValue = '';
  private movieId: number;
  private _destroyed$ = new Subject();
  @select() currentMovie$: Observable<number>;

  constructor(private apiService: ApiService, public listTrackerService: ListTrackerService) {}

  public ngOnInit(): void {
    this.currentMovie$
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe(movieId => {
        this.movieId = movieId;
      });
    this.obtainMovies();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public changeSearchValue(newValue: string): void {
    if (newValue !== this.searchValue) {
      this.searchValue = newValue;
      this.currentPage = 0;
      this.obtainMovies();
    }
  }

  private async obtainMovies(clearResults: boolean = true) {
    this.loading = true;
    let movies;
    try {
      if (this.searchValue) {
        movies = await this.apiService.makeRequest('SEARCH', this.searchValue, this.currentPage + 1);
      } else if (this.moviesType === 'POPULAR') {
        movies = await this.apiService.makeRequest('POPULAR', this.currentPage + 1);
      } else {
        movies = await this.apiService.makeRequest('RECOMMENDED', this.movieId, this.currentPage + 1);
      }
      if (clearResults) {
        this.movies = movies;
      } else {
        this.movies.results.push(...movies.results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() =>  this.loading = false, 1000);
    }
  }

  public onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    if (this.currentPage > (this.movies.results.length / 20 - 1)) {
      this.obtainMovies(false);
    }
  }
}
