import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService  {

  productlists = new BehaviorSubject([
    {
      // tslint:disable-next-line: max-line-length
      img: 'assets/imgs/food1_1800.jpg',
      label: 'パワーランチ',
      price: 1800,
      descriptions: ['ステーキ', '天ぷら'],
      itemSelected: false,
      quantity: 1,
      totalPrice: 1800,
      maximumQuantity: 10
    },
    {
      img: 'assets/imgs/food2_2600.jpeg',
      label: '富岡御膳',
      price: 2600,
      descriptions: ['麦豚', '旬野菜の鉄板やき'],
      itemSelected: false,
      quantity: 1,
      totalPrice: 2600,
      maximumQuantity: 10
    },
    {
      img: 'assets/imgs/food3_1630.jpg',
      label: 'トンテキ',
      price: 1630,
      descriptions: ['群馬県産豚ロースのトンテキ', 'とても美味しい'],
      itemSelected: false,
      quantity: 1,
      totalPrice: 1630,
      maximumQuantity: 10
    },
    {
      img: 'assets/imgs/food4_1500.jpeg',
      label: '中華コラボ',
      price: 1500,
      descriptions: ['マーポー豆腐', '小籠包'],
      itemSelected: false,
      quantity: 1,
      totalPrice: 1500,
      maximumQuantity: 10
    },
    {
      img: 'assets/imgs/orang_juice_500.jpg',
      label: 'オレンジジュース',
      price: 500,
      descriptions: ['手搾り', 'アメリカ産'],
      itemSelected: false,
      quantity: 1,
      totalPrice: 500,
      maximumQuantity: 10
    },
    {
      img: 'assets/imgs/kirinbeer_800.jpg',
      label: '生ビール',
      price: 800,
      descriptions: ['工場直送', '期間限定'],
      itemSelected: false,
      quantity: 1,
      totalPrice: 800,
      maximumQuantity: 10
    },
    {
      img: 'assets/imgs/white_red_wine_600.jpg',
      label: 'ワイン（赤１グラス）',
      price: 600,
      descriptions: ['イタリアン産', '直輸入品'],
      itemSelected: false,
      quantity: 1,
      totalPrice: 600,
      maximumQuantity: 10
    },
    {
      img: 'assets/imgs/white_red_wine_600.jpg',
      label: 'ワイン（白１グラス）',
      price: 600,
      descriptions: ['イタリアン産', '直輸入品'],
      itemSelected: false,
      quantity: 1,
      totalPrice: 600,
      maximumQuantity: 10
    },
  ]);

  mycarts = new BehaviorSubject([]);
  itemQuantity = new BehaviorSubject(0);
  totalAmount = new BehaviorSubject(0);



  constructor() { }

  addItems(index: number) {

    let product = this.productlists.getValue();
    if (product[index].quantity < product[index].maximumQuantity) {
      product[index].quantity += 1;
      product[index].totalPrice = product[index].quantity * product[index].price;

    }
  }

  minusItems(index: number) {
    let product = this.productlists.getValue();

    if (product[index].quantity > 0) {
      product[index].quantity -= 1;
      product[index].totalPrice = product[index].quantity * product[index].price;
    }
  }


  addToCart(index: number) {

    let product = this.productlists.getValue();
    let tempCart = this.mycarts.getValue();

//    tempCart.push(product.splice(index, 1)[0]);
    tempCart.push(product.slice(index)[0]); // get only
    this.calculateTotalPrice();

  }

  removeFromCart(idx: number) {
    let cart = this.mycarts.getValue();
    let tempCart = this.productlists.getValue();

    // tempCart.push(cart.splice(idx, 1)[0]);
    cart.splice(idx, 1); // remove only
    this.calculateTotalPrice();
  }


  calculateTotalPrice() {
    let cart = this.mycarts.getValue();
    let tempPrice = 0;
    for (let item of cart) {
      tempPrice += item.totalPrice;
    }
    this.totalAmount.next(tempPrice);
    this.itemQuantity.next(cart.length);
  }

  clearCart() {
    let cart = this.mycarts.getValue();
    let tempCart = this.productlists.getValue();

    cart.length = 0; // clear all
    this.calculateTotalPrice();
  }
}
