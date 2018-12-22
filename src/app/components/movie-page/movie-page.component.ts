import { Component, OnInit } from '@angular/core';
import {dispatch, select} from '@angular-redux/store';
import { Observable } from 'rxjs';
import {MovieFull, MoviesList} from '../../../interfaces';
import { API } from '../../../consts';
import { setError } from '../../modules/store/actions';
import {formBudget} from '../../../utils';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})

export class MoviePageComponent implements OnInit {
  @select() currentMovie$: Observable<number>;
  movieId: number;
  movieInfo: MovieFull;
  movieInfoList: Array<{fieldName: string, value: any}>;
  imagePath = '';
  showRecommended = false;
  recommendedFirstShow = false;
  loading = false;
  @dispatch() setError = setError;
  constructor() {
    this.movieInfoList = [];
    this.movieId = -1;
  }
  ngOnInit() {
    this.loading = true;
    this.currentMovie$.subscribe(movieId => {
      this.showRecommended = false;
      this.recommendedFirstShow = false;
      this.movieId = movieId;
      fetch(API.MOVIE_DETAILS(this.movieId))
        .then(res => res.json())
        .then(res => {
          this.preparePageInfo(res);
          this.loading = false;
        })
        .catch(error => {
          this.setError(`Couldn't obtain movie information due to server error, please try again later`);
          console.log(error);
        });
    });
  }
  preparePageInfo(info: MovieFull) {
    this.movieInfo = info;
    this.imagePath = (this.movieInfo && this.movieInfo.poster_path) ?
      `https://image.tmdb.org/t/p/w400${ this.movieInfo.poster_path }`
      : 'assets/placeholder.png';
    this.movieInfoList = [];
    const infoPointsNames = [
      'Status', 'Release date', 'Official site',
      'Tagline', 'Budget', 'Runtime'
    ];
    const infoPointsValues = [
      this.movieInfo.status,
      this.movieInfo.release_date,
      `${this.movieInfo.homepage || 'Homepage is absent'}`,
      `${this.movieInfo.tagline || 'Tagline is absent'}`,
      `
              ${this.movieInfo.budget ? formBudget(this.movieInfo.budget) : 'Unknown'}
              ${this.movieInfo.budget && ' $'}
            `,
      `
              ${this.movieInfo.runtime / 60 > 0 && `${Math.floor(this.movieInfo.runtime / 60)} hours `}
              ${this.movieInfo.runtime % 60} minutes
            `
    ];
    infoPointsNames.forEach((point, index) => {
      this.movieInfoList.push({
        fieldName: point,
        value: infoPointsValues[index]
      });
    });
  }
  toggleRecommended() {
    if (!this.recommendedFirstShow) {
      this.recommendedFirstShow = true;
    }
    this.showRecommended = !this.showRecommended;
  }
  getRecommendedMovies(sucCallback: Function, errCallback: Function, page: number = 1) {
    fetch(API.MOVIE_RECOMMENDATIONS(this.movieId, page))
      .then(res => res.json())
      .then(res => sucCallback(res))
      .catch(error => {
        this.setError(`Couldn't obtain recommended movies due to server error, please try again later`);
        errCallback(error);
      });
  }
}
