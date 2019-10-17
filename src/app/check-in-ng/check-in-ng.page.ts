import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ShareDataService } from 'src/app/providers/share-data.service';

@Component({
  selector: 'app-check-in-ng',
  templateUrl: './check-in-ng.page.html',
  styleUrls: ['./check-in-ng.page.scss'],
})
export class CheckInNgPage implements OnInit {
  photos: { image : string }[];

  constructor(
    private shareDataService: ShareDataService,
    private navCtrl: NavController,) { }

  ngOnInit() {
    this.photos = this.shareDataService.getPhotos();
  }

  goNextPage(){
    this.navCtrl.navigateForward('check-in');
  }


}
