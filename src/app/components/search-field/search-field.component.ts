import {Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.sass']
})
export class SearchFieldComponent {
  @Output() setSearchValue = new EventEmitter<string>();
  public inputValue = '';
  private searchChangeTimeout;

  constructor() { }

  public resetInput(): void {
    this.inputValue = '';
    this.startSearch();
  }

  public startSearch(): void {
    if (this.searchChangeTimeout) {
      window.clearTimeout(this.searchChangeTimeout);
    }
    this.searchChangeTimeout = setTimeout(() => this.setSearchValue.emit(this.inputValue), 1000);
  }
}
