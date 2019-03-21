import { Component } from '@angular/core';
import {ListTrackerService} from '../../services/list-tracker.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.sass']
})
export class WelcomePageComponent {
  public abilityList: Array<string>;
  public imagePath = 'assets/images/camera.png';

  constructor(public listTrackerService: ListTrackerService) {
    this.abilityList = [
      'Look for currently popular movies',
      'Search movies by title or genre',
      'Get full information about concrete movie',
      'Make list of your own favourite movies'
    ];
  }
}
