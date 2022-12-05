import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule} from '@angular/material/button';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from "@angular/forms";
//import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from "./content/list-component/list.component";
import { CardDecorationComponent } from './content/card-decoration/card-decoration.component';
import { BackgroundComponent } from './background/background.component';
import { AddActivityCard } from './content/add-activity-card/add-activity-card.component';
import { AddListCard } from "./content/add-list-card/add-list-card.component";
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './content/create-user-component/create-user.component';
import { DecorationComponent } from './content/decoration-component/decoration.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    ListComponent,
    CardDecorationComponent,
    BackgroundComponent,
    AddActivityCard,
    AddListCard,
    LoginComponent,
    CreateUserComponent,
    DecorationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule
    //FormsModule
  ],
  providers: [
    /*{ provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
