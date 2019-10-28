import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ShareDataService } from 'src/app/providers/share-data.service';

@Component({
  selector: 'app-practice-balls-success',
  templateUrl: './practice-balls-success.page.html',
  styleUrls: ['./practice-balls-success.page.scss'],
})
export class PracticeBallsSuccessPage implements OnInit {
  username: string;

  constructor(public alertController: AlertController,
    private navCtrl: NavController,
    private shareDataService: ShareDataService,) { }

  ngOnInit() {
    this.username = this.shareDataService.getUserName();
  }

  async presentAlertConfirm(mode) {
    let strMessage = 'ボール20球(400円)を購入しますか？';
    if(mode == 1){
      strMessage = 'ボール20球(400円)を購入しますか？';

    }else if(mode == 2){
      strMessage = 'ボール40球(800円)を購入しますか？';

    }else{
      strMessage = 'ボール60球(1200円)を購入しますか？';
    }

    const alert = await this.alertController.create({
      header: '購入内容確認',
      message: strMessage,
      buttons: [
        {
          text: '戻る',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            if(mode == 1){
              this.shareDataService.setBalls(20);
        
            }else if(mode == 2){
              this.shareDataService.setBalls(40);
        
            }else{
              this.shareDataService.setBalls(60);
            }
            this.gotoNextPage(mode);
          }
        }
      ]
    });

    await alert.present();
  }

  gotoNextPage(mode) {
    this.navCtrl.navigateForward('practice-balls-buy');
  }
}
