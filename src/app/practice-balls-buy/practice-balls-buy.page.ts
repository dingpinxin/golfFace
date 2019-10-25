import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/providers/share-data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-practice-balls-buy',
  templateUrl: './practice-balls-buy.page.html',
  styleUrls: ['./practice-balls-buy.page.scss'],
})
export class PracticeBallsBuyPage implements OnInit {

  balls: number;

  constructor(private shareData: ShareDataService,
    private navCtrl: NavController,) { }

  ngOnInit() {
    this.balls = this.shareData.getballs();
  }

  goNextPage(){
    this.navCtrl.navigateForward('practice-balls-start');
  }
}
