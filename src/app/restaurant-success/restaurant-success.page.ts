import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ShareDataService } from 'src/app/providers/share-data.service';

@Component({
  selector: 'app-restaurant-success',
  templateUrl: './restaurant-success.page.html',
  styleUrls: ['./restaurant-success.page.scss'],
})
export class RestaurantSuccessPage implements OnInit {
  username: string;

  public cartCount = 0;
  constructor(public events: Events,
    public alertController: AlertController,
    private navCtrl: NavController,
    private shareDataService: ShareDataService,) {
    this.events.subscribe('cart:updated', (count) => {
      this.cartCount = count;
    });
  }

  ngOnInit() {
    this.username = this.shareDataService.getUserName();
  }

}
