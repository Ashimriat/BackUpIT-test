import {Component, Input, OnInit} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {Genre} from '../../../interfaces';

@Component({
  selector: 'app-movie-genres',
  templateUrl: './movie-genres.component.html',
  styleUrls: ['./movie-genres.component.css']
})

export class MovieGenresComponent implements OnInit {
  @select() genres$: Observable<Array<Genre>>;
  @Input() movieGenresIds?: Array<number>;
  @Input() movieGenres: Array<Genre>;
  genresList: Array<string>;
  constructor() {
    this.genresList = [];
  }
  ngOnInit() {
    if (this.movieGenresIds) {
      this.genres$.subscribe(genres => {
        this.genresList = this.movieGenresIds.map(id => genres.find(genre => genre.id === id).name);
      });
    } else {
      this.genresList = this.movieGenres.map(genre => genre.name);
    }
  }
}
