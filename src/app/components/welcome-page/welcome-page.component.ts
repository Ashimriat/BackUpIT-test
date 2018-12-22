import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})

export class WelcomePageComponent implements OnInit {
  abilitiesList: Array<string>;
  constructor() {
    this.abilitiesList = [
      'Look for currently popular movies',
      'Search movies by title or genre',
      'Get full information about concrete movie',
      'Make list of your own favourite movies'
    ];
  }
  ngOnInit() { }
}
