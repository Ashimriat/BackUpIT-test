import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListTrackerService {

  constructor() { }

  public trackList(index, item) {
    return item.id;
  }
}
