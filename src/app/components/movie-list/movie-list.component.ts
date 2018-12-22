import {Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MoviesList} from '../../../interfaces';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit, OnChanges {
  @Input() getMovies: Function;
  @Input() searchValue?: string;
  movies: MoviesList;
  loading = false;
  currentPage: number;
  constructor() {
    this.movies = null;
    this.currentPage = 0;
  }
  ngOnInit() {
    this.obtainNewMovies();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.searchValue && changes.searchValue.currentValue !== changes.searchValue.previousValue) {
      this.obtainNewMovies(1, true, this.searchValue);
    }
  }
  obtainNewMovies(page: number = 1, firstLaunch = true, search?: string) {
    this.loading = true;
    this.getMovies(
      res => {
        if (!firstLaunch) {
          this.currentPage += 1;
        }
        if (firstLaunch) {
          this.movies = res;
        } else {
          this.movies.results.push(...res.results);
        }
        setTimeout(() =>  this.loading = false, 500);
      },
      error => {
        console.log(error);
        setTimeout(() =>  this.loading = false, 500);
      },
      page,
      search
    );
  }
  onPageChange(event: PageEvent) {
    if (event.pageIndex < event.previousPageIndex) {
      this.currentPage -= 1;
    } else {
      if (event.pageIndex > (this.movies.results.length / 20 - 1)) {
        this.obtainNewMovies(event.pageIndex + 1, false);
      } else {
        this.currentPage += 1;
      }
    }

  }
}
