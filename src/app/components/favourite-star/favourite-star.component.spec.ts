import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteStarComponent } from './favourite-star.component';

describe('FavouriteStarComponent', () => {
  let component: FavouriteStarComponent;
  let fixture: ComponentFixture<FavouriteStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
