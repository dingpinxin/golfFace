import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, catchError, concatMap, tap } from 'rxjs/operators';
import { AlertOptions } from '@ionic/core';
import { NavController,LoadingController } from '@ionic/angular';
import { ShareDataService } from 'src/app/providers/share-data.service';
import { AlertService } from 'src/app/providers/alert.service';

@Injectable({
  providedIn: 'root'
})
export class NecEvaService {

  //固定パラメータ
  private readonly URL = 'https://192.168.100.106:24328/';

  constructor(private http: HttpClient,
    private alertService: AlertService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController) {
    }
  
  
  /**
   * APIヘッダーに設定するauthTokenを取得する
   */
  async getAuthToken() {
      try{
      const res: any = await this.http.get(this._makeURL('persons/count'), {
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Basic cm9vdHVzZXI6cm9vdHVzZXI=',
        }
      }).toPromise();
      console.log(res.count);
    } catch(error){
      console.log('認証に失敗しました');
      console.error(error)
    }
  }

  /**
   * 登録した人数分の fetchメソッド
   */
  getPersonsCount() {
    return this.http.get<{count}>(
      this._makeURL('persons/count'),
      this._makeOptions()
    ).pipe(take(1));
  }

  /**
   * 登録した人数分の fetchメソッド
   */
  getPersonInfo(personId:String) {
    return this.http.get<{personId}>(
      this._makeURL('persons/' + personId + '/'),
      this._makeOptions()
    ).pipe(take(1));
  }

  /**
   * 撮影した顔のサーチメソッド
   * @param quote 写真
   */
  postPictureAndGetPerson(file) {
      const body = new FormData();
      body.append('picture', file);
      body.append('Content-Type', 'multipart/form-data');
      body.append('Authorization', 'Basic cm9vdHVzZXI6cm9vdHVzZXI=');
      return this.http.post<{personId:string,matchScore:number}>(
        this.URL + 'persons/search/picture',
        body,
        {}
      ).pipe(
        take(1),
        concatMap((res: { personId:string,matchScore:number }) => {
          console.log(res);
          if(res.matchScore > 0.8){
            return this.getPersonInfo(res.personId)
          }else{

          }
        }),
        catchError(err => this.handleError(err))
      )
  }

    /**
   * APIのURLを作成
   * @param apiName fetchするAPIの名前
   */
  private _makeURL(apiName: string) {
    let url = this.URL;
    return url + apiName;
  }
  
  /**
   * リクエストの引数に設定するHttpOptionを作成する
   * @param params リクエストパラメータ
   */
  private _makeOptions(params?: { [param: string]: string }) {
    const option = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Basic cm9vdHVzZXI6cm9vdHVzZXI=',
      })
    }
    if (params) {
      option['params'] = params;
    }
    return option;
  }

  private _makeOptionsPostImage(params?: { [param: string]: string }) {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Basic cm9vdHVzZXI6cm9vdHVzZXI=',
      })
    }
    if (params) {
      option['params'] = params;
    }
    return option;
  }
  
  handleError(err){
    console.log(err);
    return new Promise<any>(async (resolve, reject) => {
      const loading = await this.loadingCtrl.getTop();
      if(err.status.toString() === "401"){
        let opts: AlertOptions = {
          message:'大変申し訳ありませんが、入力がない状態が一定時間経過したため、認証を解除しました。最初の画面から再度申込を実施してください。',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.navCtrl.navigateBack("quotation/input");
                reject();
              }
            }
          ]
        }
        this.getAuthToken();
        if(loading){
          loading.dismiss();
        }
        this.alertService.present(opts);
      }else{
        if(loading){
          loading.dismiss();
        }
        this.alertService.unexpected();
      }
    })
  }


}