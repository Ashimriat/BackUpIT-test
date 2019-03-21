import { Component, OnInit, OnDestroy } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { MovieFull } from '../../../interfaces';
import { setError } from '../../modules/store/actions';
import { formBudget, formRuntime } from '../../../utils';
import { ApiService } from '../../services/api.service';
import { ListTrackerService } from '../../services/list-tracker.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.sass']
})
export class MoviePageComponent implements OnInit, OnDestroy {
  public movieId: number;
  public movieInfo: MovieFull;
  public movieGenresIds: Array<number>;
  public movieInfoList: Array<{fieldName: string, value: any}> = [];
  public imagePath = '';
  public loading: boolean;
  public showRecommended: boolean;
  public recommendedFirstShow: boolean;
  private _destroyed$ = new Subject();
  @select() currentMovie$: Observable<number>;
  @dispatch() setError = setError;

  constructor(private apiService: ApiService, public listTrackerService: ListTrackerService) {
    this.movieInfoList = [];
    this.movieId = -1;
  }

  public ngOnInit(): void {
    this.currentMovie$
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe(movieId => {
        this.movieId = movieId;
        this.resetPage();
        try {
          this.preparePageInfo();
        } catch (e) {
          this.setError(`Couldn't obtain movie information, please try again later`);
        } finally {
          setTimeout(() =>  this.loading = false, 1000);
        }
      });
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private async preparePageInfo() {
    this.movieInfo = await this.apiService.makeRequest('DETAILS', this.movieId);
    this.movieGenresIds = this.movieInfo.genres.map(genre => genre.id);
    this.imagePath = this.movieInfo.poster_path ?
      `https://image.tmdb.org/t/p/w400${this.movieInfo.poster_path}` :
      'assets/images/placeholder.png';
    const infoNames = [
      'Status', 'Release date', 'Official site', 'Tagline', 'Budget', 'Runtime'
    ];
    const infoValues = [
      this.movieInfo.status,
      this.movieInfo.release_date,
      this.movieInfo.homepage || 'Homepage is absent',
      this.movieInfo.tagline || 'Tagline is absent',
      formBudget(this.movieInfo.budget),
      formRuntime(this.movieInfo.runtime)
    ];
    infoNames.forEach((point, index) => {
      this.movieInfoList.push({
        fieldName: point,
        value: infoValues[index]
      });
    });
  }

  public toggleRecommended(): void {
    if (!this.recommendedFirstShow) {
      this.recommendedFirstShow = true;
    }
    this.showRecommended = !this.showRecommended;
  }

  private resetPage(): void {
    this.loading = true;
    this.showRecommended = false;
    this.recommendedFirstShow = false;
    this.movieInfoList = [];
  }
}
