import { ModalSimilarPage } from './modal-similar/modal-similar.page';
import { ModalSimilarPageModule } from './modal-similar/modal-similar.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpModule } from '@angular/http';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { Facebook } from '@ionic-native/facebook/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [ModalSimilarPage],
  imports: [
    HttpModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ModalSimilarPageModule
  ],
  providers: [
    Facebook,
    Geolocation,
    GoogleMaps,
    StatusBar,
    SplashScreen,
    SocialSharing,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
