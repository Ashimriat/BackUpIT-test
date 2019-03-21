import { Component, OnInit, OnDestroy } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import {Observable, Subject} from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MoviesList } from '../interfaces';
import { setCurrentMovie, addGenres, setError } from './modules/store/actions';
import { ApiService } from './services/api.service';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [ApiService]
})

export class AppComponent implements OnInit, OnDestroy {
  public loading = false;
  private _destroyed$ = new Subject();
  @select() favourite$: Observable<Array<number>>;
  @select() currentMovie$: Observable<number>;
  @select() error$: Observable<string>;
  @dispatch() addGenres = addGenres;
  @dispatch() setError = setError;

  constructor(public snackBar: MatSnackBar, private apiService: ApiService) { }

  public ngOnInit(): void {
    this.error$
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe(message => {
        if (message) {
          this.showSnackBar(message);
        }
      });
    this.loading = true;
    this.getGenres();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public async getGenres() {
    try {
      const res = await this.apiService.makeRequest('GENRE');
      this.addGenres(res.genres);
    } catch (error) {
      this.setError(`Couldn't obtain genres list, please try again later`);
    }
  }

  public showSnackBar(message: string) {
    const snackBarRef = this.snackBar.open(message, 'Close');
    snackBarRef
      .onAction()
      .subscribe(
        action => this.setError('')
      );
  }
}
