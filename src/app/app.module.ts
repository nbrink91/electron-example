import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QueueFormComponent } from './queue-form/queue-form.component';
import { ContentDirective } from './content.directive';

@NgModule({
  declarations: [
    AppComponent,
    QueueFormComponent,

    ContentDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  entryComponents: [
    QueueFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
