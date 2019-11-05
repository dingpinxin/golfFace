import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.page.html',
  styleUrls: ['./user-menu.page.scss'],
})
export class UserMenuPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private router:Router,) { }

  ngOnInit() {
  }

  gotoUserInfo() {
    this.navCtrl.navigateForward('user-info-input');
  }

  gotoCheckIn() {
    this.navCtrl.navigateForward('check-in');
  }

  gotoPracticeBall() {
    this.navCtrl.navigateForward('practice-balls-start');
  }

  gotoRestaurant() {
    this.navCtrl.navigateForward('restaurant-start');
  }
}
