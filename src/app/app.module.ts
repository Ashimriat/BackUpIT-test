import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgReduxModule } from '@angular-redux/store';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MaterialUIModule} from './modules/material-ui/material-ui.module';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { StoreModule } from './modules/store/store.module';
import { FavouriteStarComponent } from './components/favourite-star/favourite-star.component';
import { MovieGenresComponent } from './components/movie-genres/movie-genres.component';
import { LoaderComponent } from './components/loader/loader.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import {ApiService} from './services/api.service';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import {ListTrackerService} from './services/list-tracker.service';
import { FavouriteMoviesListComponent } from './components/favourite-movies-list/favourite-movies-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviePageComponent,
    MovieCardComponent,
    MoviesListComponent,
    FavouriteStarComponent,
    MovieGenresComponent,
    LoaderComponent,
    WelcomePageComponent,
    SearchFieldComponent,
    FavouriteMoviesListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialUIModule,
    NgReduxModule,
    StoreModule,
    RouterModule
  ],
  providers: [ApiService, ListTrackerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
