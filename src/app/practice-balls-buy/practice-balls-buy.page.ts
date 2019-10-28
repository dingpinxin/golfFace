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
  username: string;

  constructor(private shareDataService: ShareDataService,
    private navCtrl: NavController,) { }

  ngOnInit() {
    this.balls = this.shareDataService.getballs();
    this.username = this.shareDataService.getUserName();
  }

  goNextPage(){
    this.navCtrl.navigateForward('practice-balls-start');
  }
}
