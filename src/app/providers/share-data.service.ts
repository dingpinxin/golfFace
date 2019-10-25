import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  
  private photos: { image : string };
  private balls: number;

  constructor() { }
  
  /**
   * 写真アップロード画面と写真加工画面との間で共有する写真データを設定
   * @param photos 
   */
  setPhotos(photos: {image: string}){
    this.photos = photos;
  }

  /**
   * 写真アップロード画面と写真加工画面との間で共有する写真データを取得
   */
  getPhotos(){
    if(this.photos){
      return this.photos;
    }
  }

  setBalls(balls){
    this.balls = balls;
  }

  getballs(){
    if(this.balls){
      return this.balls;
    }
  }
}
