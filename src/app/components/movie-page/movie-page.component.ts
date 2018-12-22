import { Component, OnInit } from '@angular/core';
import {dispatch, select} from '@angular-redux/store';
import { Observable } from 'rxjs';
import { MovieFull } from '../../../interfaces';
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
  showRecommended = false;
  loading = false;
  @dispatch() setError = setError;
  constructor() {
    this.movieInfoList = [];
    this.movieId = -1;
  }
  ngOnInit() {
    this.loading = true;
    this.currentMovie$.subscribe(movieId => {
      this.movieId = movieId;
      fetch(API.MOVIE_DETAILS(this.movieId))
        .then(res => res.json())
        .then(res => {
          this.loading = false;
          this.movieInfo = res;
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
        })
        .catch(error => {
          this.setError(`Couldn't obtain movie information due to server error, please try again later`);
          console.log(error);
        });
    });
  }
  toggleRecommended() {
    const temp = !this.showRecommended;
    this.showRecommended = temp;
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
