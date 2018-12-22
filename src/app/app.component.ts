import { Component, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material';

import { MoviesList } from '../interfaces';
import { API } from '../consts';
import { setCurrentMovie, addGenres, setError } from './modules/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @select() favourite$: Observable<Array<number>>;
  @select() currentMovie$: Observable<number>;
  @select() error$: Observable<string>;
  popularMovies: MoviesList;
  loading = false;
  inputValue = '';
  searchValue = '';
  searchChangeTimeout: number;
  @dispatch() addGenres = addGenres;
  @dispatch() setError = setError;
  @dispatch() setCurrentMovie = setCurrentMovie;
  constructor(public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.error$.subscribe(message => {
      if (message) {
        this.showSnackBar(message);
      }
    })
    this.loading = true;
    this.getGenres();
    this.getPopularMovies(res => {
      this.loading = false;
      this.popularMovies = res;
    }, error => console.log(error));
  }
  changeSearchValue(newValue: string) {
    this.inputValue = newValue;
    if (this.searchChangeTimeout) {
      window.clearTimeout(this.searchChangeTimeout);
      this.searchChangeTimeout = null;
    }
    this.searchChangeTimeout = setTimeout(() => this.searchValue = newValue, 1000);
  }
  getSearchMovies(sucCallback: Function, errCallback: Function, page: number = 1, searchValue: string) {
    fetch(API.SEARCH(searchValue, page))
      .then(res => res.json())
      .then(res => sucCallback(res))
      .catch(error => {
        this.setError(`Couldn't find movies due to server error, please try again later`)
        errCallback(error);
      });
  }
  getPopularMovies(sucCallback: Function, errCallback: Function, page: number = 1) {
    fetch(API.POPULAR(page))
      .then(res => res.json())
      .then(res => sucCallback(res))
      .catch(error => {
        this.setError(`Couldn't obtain popular movies due to server error, please try again later`);
        errCallback(error);
      });
  }
  getGenres() {
    fetch(API.GENRE)
      .then(res => res.json())
      .then(res => this.addGenres(res.genres))
      .catch(error => {
        this.setError(`Couldn't obtain genres list due to server error, please try again later`);
        console.log(error);
      });
  }
  showSnackBar(message: string) {
    const snackBarRef = this.snackBar.open(message, 'Close');
    snackBarRef.onAction().subscribe(action => {
      this.setError('');
    });
  }
}
