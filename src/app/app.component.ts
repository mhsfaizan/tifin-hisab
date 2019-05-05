import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages =  [
    // {
    //   title: 'Home',
    //   url: '/home',
    //   icon: 'home',
    // },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'speedometer',
    },
    {
      title: 'Add Data',
      url: "/add-item",
      icon: "pricetag",
    },
    {
      title: 'Calendar',
      url: "/calendar",
      icon: "calendar",
    },
    {
      title: 'All Transaction',
      url: '/transaction',
      icon: "trending-up",
    },
    {
      title: 'Sign Out',
      url: '/home',
      icon: "log-out",
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _auth: AuthenticationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  signout() {
    this._auth.logout();
  }
 
}
