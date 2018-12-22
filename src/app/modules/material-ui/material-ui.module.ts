import { NgModule } from '@angular/core';
import {
  MatCardModule, MatGridListModule, MatListModule,
  MatChipsModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatTooltipModule, MatTabsModule, MatFormFieldModule,
  MatExpansionModule, MatInputModule, MatIconModule, MatToolbarModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatCardModule, MatGridListModule, MatListModule,
    MatChipsModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatTooltipModule, MatTabsModule, MatFormFieldModule,
    MatExpansionModule, MatInputModule, MatIconModule, MatToolbarModule,
    MatSnackBarModule
  ],
  exports: [
    MatCardModule, MatGridListModule, MatListModule,
    MatChipsModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatTooltipModule, MatTabsModule, MatFormFieldModule,
    MatExpansionModule, MatInputModule, MatIconModule, MatToolbarModule,
    MatSnackBarModule
  ]
})
export class MaterialUIModule { }
