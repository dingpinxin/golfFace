import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/providers/shopping-cart.service';
import { Events } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restaurant-order',
  templateUrl: './restaurant-order.page.html',
  styleUrls: ['./restaurant-order.page.scss'],
})
export class RestaurantOrderPage implements OnInit {

  mycarts = [];
  totalAmount = 0;
  itemQuantity = 0;

  private count = 0;

  constructor(private shoppingcartservice: CartService, public events: Events, public alertController: AlertController) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.shoppingcartservice.mycarts.subscribe(mycart => {
      this.mycarts = mycart;
    });

    this.shoppingcartservice.totalAmount.subscribe(mycart => {
      this.totalAmount = mycart;
    });

    this.shoppingcartservice.itemQuantity.subscribe(quantity => {
      this.itemQuantity = quantity;
    });
  }

  removeItems(i) {
    this.shoppingcartservice.removeFromCart(i);
    this.events.publish('cart:updated', this.mycarts.length);

  }

  doSend() {
    this.sendConfirm();


  }
  doClear() {
    this.clearConfirm();

  }

  async sendConfirm() {
    const alert = await this.alertController.create({
      header: '注文送信',
      subHeader: 'ご確認',
      message: '上記の注文でよろしいでしょうか？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '注文送信',
          handler: () => {
            this.shoppingcartservice.clearCart();
            this.events.publish('cart:updated', this.mycarts.length);
            this.presentAlert();
          }
        }
        ]
    });

    await alert.present();
  }

  async clearConfirm() {
    const alert = await this.alertController.create({
      header: '注文クリア',
      subHeader: 'ご確認',
      message: '上記注文内容をクリアでよろしいでしょうか？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '注文クリア',
          handler: () => {
            this.shoppingcartservice.clearCart();
            this.events.publish('cart:updated', this.mycarts.length);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '注文成功',
      message: 'しばらくお待ちくださいませ.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
