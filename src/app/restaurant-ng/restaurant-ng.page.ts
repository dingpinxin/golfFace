import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/providers/share-data.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-restaurant-ng',
  templateUrl: './restaurant-ng.page.html',
  styleUrls: ['./restaurant-ng.page.scss'],
})
export class RestaurantNgPage implements OnInit {

  constructor(private shareDataService: ShareDataService,
    private navCtrl: NavController,) { }

  ngOnInit() {
  }

  goNextPage(){
    this.navCtrl.navigateForward('restaurant-start');
  }

}
