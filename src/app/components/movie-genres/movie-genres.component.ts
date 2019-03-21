import { Component, Input, OnInit} from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Genre } from '../../../interfaces';
import { ListTrackerService } from '../../services/list-tracker.service';

@Component({
  selector: 'app-movie-genres',
  templateUrl: './movie-genres.component.html',
  styleUrls: ['./movie-genres.component.sass']
})

export class MovieGenresComponent implements OnInit {
  @Input() movieGenresIds: number[];
  public genresList$;
  @select() genres$: Observable<Array<Genre>>;

  constructor(public listTrackerService: ListTrackerService) {}

  public ngOnInit(): void {
    this.genresList$ = this.genres$
      .pipe(
        map(genres => this.getGenresByIds(genres))
      );
  }

  private getGenresByIds(genres: Array<Genre>): Array<string> {
    const correspondingGenres = genres.map(genre => {
      if (this.movieGenresIds.find(genreId => genreId === genre.id)) {
        return genre.name;
      }
    });
    return correspondingGenres.filter(Boolean);
  }
}
