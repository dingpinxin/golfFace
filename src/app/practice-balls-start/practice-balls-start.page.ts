import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ShareDataService } from 'src/app/providers/share-data.service';
import { AlertController } from '@ionic/angular';
import { NecEvaService } from 'src/app/providers/nec-eva.service';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-practice-balls-start',
  templateUrl: './practice-balls-start.page.html',
  styleUrls: ['./practice-balls-start.page.scss'],
})
export class PracticeBallsStartPage implements OnInit {

  constructor(public alertController: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private shareDataService: ShareDataService,
    private necEvaService: NecEvaService,) { }

  ngOnInit() {
  }

  onChangeInput(event) {
    this.commonOnChangeInput(event,this.applyEvent.bind(this));
  }

  applyEvent() {
    this.navCtrl.navigateForward('practice-balls-success');
  }

  async submitPhoto(file: any){
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      message: '顔認証中です、少々待ちください。'
    });
    loading.present();
    let photo = this.shareDataService.getPhotos();
    this.necEvaService.postPictureAndGetPerson(file,'practice-balls-ng').pipe(take(1)).subscribe(ref =>{
      console.log(ref);
      loading.dismiss();
      if(ref.firstName){
        this.shareDataService.setUserName(ref.firstName)
        this.applyEvent();
      }else{
        this.navCtrl.navigateForward('practice-balls-ng');
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
      const orientation = this.getOrientation(reader.result);
      const imageQuanlity = this.getImageQuanlity(file.size);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img_upload:any = new Image();
      const img_transformed :any = new Image();
      img_upload.src = reader.result;
      img_upload.onload = () => {
        canvas.width = img_upload.height;
        canvas.height = img_upload.width;
        if(orientation){
          if ([5, 6, 7, 8].indexOf(orientation) > -1) {
            canvas.width = img_upload.height;
            canvas.height = img_upload.width;
          } else {
            canvas.width = img_upload.width;
            canvas.height = img_upload.height;
          }
          switch (orientation) {
            case 2: ctx.setTransform(-1, 0, 0, 1, img_upload.width, 0); break;
            case 3: ctx.setTransform(-1, 0, 0, -1, img_upload.width, img_upload.height); break;
            case 4: ctx.setTransform(1, 0, 0, -1, 0, img_upload.height); break;
            case 5: ctx.setTransform(0, 1, 1, 0, 0, 0); break;
            case 6: ctx.setTransform(0, 1, -1, 0, img_upload.height, 0); break;
            case 7: ctx.setTransform(0, -1, -1, 0, img_upload.height, img_upload.width); break;
            case 8: ctx.setTransform(0, -1, 1, 0, 0, img_upload.width); break;
          }
        }
        ctx.drawImage(img_upload, 0, 0);
        img_transformed.src = canvas.toDataURL("image/jpeg", 1);
       
        const bese64Data = canvas.toDataURL("image/jpeg", 1).split(',')[1];
        const data = window.atob(bese64Data);
        const buff = new ArrayBuffer(data.length);
        const arry = new Uint8Array(buff);

        for(let i=0; i<data.length; i++){
               arry[i] = data.charCodeAt(i);
        }
        const blob = new Blob([arry],{type:'image/jpg'});

        img_transformed.onload = () => {
          this.shareDataService.setPhotos({image:img_transformed.src});
          this.submitPhoto(blob);
        }
      }
    });
    reader.readAsDataURL(file);
  }
  
  /**
   * 画像の向き取得
   * @param buffer : 選択された画像のDataURL
   */
  getOrientation(imgDataURL){
    let byteString = atob(imgDataURL.split(',')[1]);
    let orientaion = byteStringToOrientation(byteString);
    return orientaion;
  
    function byteStringToOrientation(img){
        let head = 0;
        let orientation;
        while (1){
            if (img.charCodeAt(head) == 255 && img.charCodeAt(head + 1) == 218) {break;}
            if (img.charCodeAt(head) == 255 && img.charCodeAt(head + 1) == 216) {
                head += 2;
            }
            else {
                let length = img.charCodeAt(head + 2) * 256 + img.charCodeAt(head + 3);
                let endPoint = head + length + 2;
                if (img.charCodeAt(head) == 255 && img.charCodeAt(head + 1) == 225) {
                    let segment = img.slice(head, endPoint);
                    let bigEndian = segment.charCodeAt(10) == 77;
                    let count;
                    if (bigEndian) {
                        count = segment.charCodeAt(18) * 256 + segment.charCodeAt(19);
                    } else {
                        count = segment.charCodeAt(18) + segment.charCodeAt(19) * 256;
                    }
                    for (let i=0; i < count; i++){
                        var field = segment.slice(20 + 12 * i, 32 + 12 * i);
                        if ((bigEndian && field.charCodeAt(1) == 18) || (!bigEndian && field.charCodeAt(0) == 18)) {
                            orientation = bigEndian ? field.charCodeAt(9) : field.charCodeAt(8);
                        }
                    }
                    break;
                }
                head = endPoint;
            }
            if (head > img.length){break;}
        }
        return orientation;
    }
  }
  
  /**
   * 画像の圧縮率を取得
   * @param size : アップロードされた画像のサイズ
   */
  getImageQuanlity(size){
    // 10M以上の場合
    if(size >= 10000000){
      return 0.1;
    }
    // 5M以上10M以下の場合
    if(size > 5000000 && size < 10000000){
      return 0.3
    }
    // 3M以上5M以下の場合
    if(size > 3000000 && size < 5000000){
      return 0.4;
    }
    // 2M以上3M以下の場合
    if(size > 2000000 && size < 3000000){
      return 0.5;
    }
    // 1M以上2M以下の場合
    if(size > 1000000 && size <= 2000000){
      return 0.6;
    }

    return 1;
  }
}
