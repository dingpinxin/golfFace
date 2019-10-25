import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ShareDataService } from 'src/app/providers/share-data.service';
import { AlertController } from '@ionic/angular';
import { NecEvaService } from 'src/app/providers/nec-eva.service';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage implements OnInit {

  constructor(public alertController: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private shareDataService: ShareDataService,
    private necEvaService: NecEvaService,) { }

  ngOnInit() {
  }

  async onChangeInput(event) {
    this.commonOnChangeInput(event,this.applyEvent.bind(this));
  }

  async applyEvent() {
      this.navCtrl.navigateForward('check-in-success');
  }
  
  async submitPhoto(file: File){
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      message: '顔認証中です、少々待ちください。'
    });
    loading.present();
    let photo = this.shareDataService.getPhotos();
    this.necEvaService.postPictureAndGetPerson(file).pipe(take(1)).subscribe(ref =>{
      console.log(ref);
      loading.dismiss();
      if(ref.firstName){
        this.shareDataService.setUserName(ref.firstName)
        this.applyEvent();
      }else{
        this.navCtrl.navigateForward('check-in-ng');
      }
    }); 
  }

   /**
   * 選択された画像を取得する
   * @param event : 選択された画像の情報
   * @param onLoadCallback : (必須）遷移前に実施したい処理
   * @param isFirstCallback : (任意）１回だけ実施したい処理
   * @param photos : (任意）写真データの配列
   */
  commonOnChangeInput(event,onLoadCallback:Function,isFirstCallback?:Function,photos?:{ image : string }[]) {
    // 画像読み込み用
    let reader = new FileReader();
    let tmpPhotos: { image : string }[] = photos || [];

    const file = event.target.files[0];
    reader.onload = ((e) => {
      const img_upload:any = new Image();
      const img_transformed :any = new Image();
      img_upload.src = reader.result;
      img_upload.onload = () => {
        img_transformed.src = img_upload.src;
        img_transformed.onload = () => {
          this.shareDataService.setPhotos({image:img_transformed.src});
          this.submitPhoto(file);
        }
      }
    });
    reader.readAsDataURL(file);
  }

}
