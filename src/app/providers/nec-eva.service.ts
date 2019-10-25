import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, catchError, concatMap, tap } from 'rxjs/operators';
import { AlertOptions } from '@ionic/core';
import { NavController,LoadingController } from '@ionic/angular';
import { ShareDataService } from 'src/app/providers/share-data.service';

@Injectable({
  providedIn: 'root'
})
export class NecEvaService {

  //固定パラメータ
  private readonly URL = 'https://192.168.100.106:24328/persons/count/';

  constructor(private http: HttpClient,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private shareDataService: ShareDataService) {
      this.getAuthToken();
    }
  
  
  /**
   * APIヘッダーに設定するauthTokenを取得する
   */
  async getAuthToken() {
      try{
      const res: any = await this.http.get(this.URL, {
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded,X-Requested-With,content-type,application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Authorization': 'Basic' + btoa('rootuser:rootuser'),
        }
      }).toPromise();
      console.log(res);
    } catch(error){
      console.log('認証に失敗しました');
      console.error(error)
    }
  }

  /**
   * 商品ゲットAPI fetchメソッド
   * @param userId sureify内のkey値となるuserId(postQuoteメソッドで取得)
   */
  getPersonsCount() {
    return this.http.get<{count}>(
      this._makeURL('persons/count'),
      this._makeOptions()
    ).pipe(take(1));
  }

    /**
   * APIのURLを作成
   * @param apiName fetchするAPIの名前
   * @param userId sureify内のkey値となるuserId(postQuoteメソッドで取得)
   */
  private _makeURL(apiName: string) {
    let url = this.URL;
    return url + apiName;
  }
  
  /**
   * リクエストの引数に設定するHttpOptionを作成する
   * @param authorization headerのauthorizationに指定する値。Token取得の場合はapikey, Token取得後はauthTokenを指定
   * @param params リクエストパラメータ
   */
  private _makeOptions(params?: { [param: string]: string }) {
    const option = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Headers': 'Origin',
        'Content-Type': 'application/json',
        'Authorization': 'Basic' + btoa('rootuser:rootuser')
      })
    }
    if (params) {
      option['params'] = params;
    }
    return option;
  }


}
