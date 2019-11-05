import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/providers/shopping-cart.service';
import { NavController } from '@ionic/angular';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.page.html',
  styleUrls: ['./restaurant-menu.page.scss'],
})
export class RestaurantMenuPage implements OnInit {
  productlists = [];
  mycarts = [];

  private count = this.productlists.length;
  constructor(private shoppingcartservice: CartService, private navCtrl: NavController, public events: Events) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.shoppingcartservice.productlists.subscribe(productlists => {
      this.productlists = productlists;
    });
  }

  // addQuantity(index){
  //   this.productList[index].quantity += 1
  // }

  addItems(i) {
    this.shoppingcartservice.addItems(i);
  }

  minusItems(index) {
    if (this.productlists[index].quantity > 0) {
      this.productlists[index].quantity -= 1;
    }
  }

  addToCart(i) {
    this.shoppingcartservice.addToCart(i);
    this.shoppingcartservice.mycarts.subscribe(carts => {
      this.events.publish('cart:updated',  carts.length);
    });

  }

  navigate(index) {
    this.navCtrl.navigateForward('/product-details/' + index);
  }

}
