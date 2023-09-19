import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListViewComponent } from './views/movie-list-view/movie-list-view.component';
import { MovieDetailCardComponent } from './views/movie-detail-card/movie-detail-card.component';
import { SearchFieldComponent } from './views/search-field/search-field.component';

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    MovieDetailCardComponent,
    SearchFieldComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
