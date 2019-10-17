import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ShareDataService } from 'src/app/providers/share-data.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private shareDataService: ShareDataService,) { }

  ngOnInit() {
  }

  onChangeInput(event) {
    this.commonOnChangeInput(event,this.applyEvent.bind(this));
  }

  applyEvent() {
        this.navCtrl.navigateForward('check-in-success');
  }

  onChangeInput_false(event) {
    this.commonOnChangeInput(event,this.applyEvent_fail.bind(this));
  }

  applyEvent_fail() {
        this.navCtrl.navigateForward('check-in-ng');
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
          tmpPhotos.push({image:img_transformed.src});
          this.shareDataService.setPhotos(tmpPhotos);
          onLoadCallback();
          setTimeout(()=>{
            if(tmpPhotos.length === 1){
              if ( isFirstCallback ) {
                isFirstCallback();
              }
            }
          }, 200)
        }
      }
    });
    reader.readAsDataURL(file);
  }

}
