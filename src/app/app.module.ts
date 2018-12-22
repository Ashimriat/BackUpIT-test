import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgReduxModule } from '@angular-redux/store';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MaterialUIModule} from './modules/material-ui/material-ui.module';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { StoreModule } from './modules/store/store.module';
import { MovieFavouriteStarComponent } from './components/movie-favourite-star/movie-favourite-star.component';
import { MovieGenresComponent } from './components/movie-genres/movie-genres.component';
import { LoaderComponent } from './components/loader/loader.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviePageComponent,
    MovieCardComponent,
    MovieListComponent,
    MovieFavouriteStarComponent,
    MovieGenresComponent,
    LoaderComponent,
    WelcomePageComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
