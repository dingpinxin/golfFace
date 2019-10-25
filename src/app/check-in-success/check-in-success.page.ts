import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/providers/share-data.service';

@Component({
  selector: 'app-check-in-success',
  templateUrl: './check-in-success.page.html',
  styleUrls: ['./check-in-success.page.scss'],
})
export class CheckInSuccessPage implements OnInit {
  photos: { image : string };
  username: string;

  constructor(
    private shareDataService: ShareDataService,) { }

  ngOnInit() {
    this.photos = this.shareDataService.getPhotos();
    this.username = this.shareDataService.getUserName();
  }

}
