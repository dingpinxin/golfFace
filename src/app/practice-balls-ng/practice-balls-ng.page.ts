import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/providers/share-data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-practice-balls-ng',
  templateUrl: './practice-balls-ng.page.html',
  styleUrls: ['./practice-balls-ng.page.scss'],
})
export class PracticeBallsNgPage implements OnInit {

  constructor(private shareDataService: ShareDataService,
    private navCtrl: NavController,) { }

  ngOnInit() {
  }

  goNextPage(){
    this.navCtrl.navigateForward('restaurant-start');
  }

}
