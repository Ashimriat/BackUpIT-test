import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteMoviesListComponent } from './favourite-movies-list.component';

describe('FavouriteMoviesListComponent', () => {
  let component: FavouriteMoviesListComponent;
  let fixture: ComponentFixture<FavouriteMoviesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteMoviesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteMoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
