import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DetailedViewComponent } from './detailed-view/detailed-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorTableComponent } from './error-table/error-table.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailedViewComponent,
    ErrorTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatPaginatorModule, 
    MatProgressSpinnerModule, 
    MatSortModule, 
    MatTableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
