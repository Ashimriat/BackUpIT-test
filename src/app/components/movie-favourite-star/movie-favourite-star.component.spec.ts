import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFavouriteStarComponent } from './movie-favourite-star.component';

describe('MovieFavouriteStarComponent', () => {
  let component: MovieFavouriteStarComponent;
  let fixture: ComponentFixture<MovieFavouriteStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieFavouriteStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFavouriteStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
