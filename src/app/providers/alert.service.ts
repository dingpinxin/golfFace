import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  static readonly ALERT_CUSTOM_CSS_CLASS = 'custom-alert';
  static readonly CONFIRM_CSS_CLASS = 'custom-confirm';

  constructor(private alertCtrl: AlertController) { }

  /**

   * 
   * @param opts AlertOptions
   */
  async present(opts?: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    await alert.present(); 
  }

  unexpected(){
    this.present({
      message: '予期せぬエラーが発生しました',
      buttons:['OK']
    })
  }
}
