import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DiffMappingComponent } from './diff-mapping/diff-mapping.component';

@NgModule({
  declarations: [
    AppComponent,
    DiffMappingComponent
    ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
