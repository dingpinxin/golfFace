import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NecEvaService } from 'src/app/providers/nec-eva.service';

@Component({
  selector: 'app-user-info-input',
  templateUrl: './user-info-input.page.html',
  styleUrls: ['./user-info-input.page.scss'],
})
export class UserInfoInputPage implements OnInit {

  public static readonly NUMBER_REGEXP = /^[0-9]+$/;  // 数字のみの入力に限定する場合に使用
  public static readonly EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i; // Email形式の入力に限定する場合に使用

  // 入力フォーム
  quotationForm: FormGroup;
  lastNameKanji: FormControl;
  firstNameKanji: FormControl;
  lastNameKana: FormControl;
  firstNameKana: FormControl;
  gender: FormControl;
  birthday: FormControl;
  zip1: FormControl;
  zip2: FormControl;
  address1: FormControl;
  address2: FormControl;
  phone1: FormControl;
  phone2: FormControl;
  phone3: FormControl;
  email: FormControl;

  data : any;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private _HTTP: HttpClient,
    private necEvaService: NecEvaService,) { 
    this.lastNameKanji = new FormControl(
      '姓', [Validators.required]
    )
    this.firstNameKanji = new FormControl(
      '名', [Validators.required]
    )
    this.lastNameKana = new FormControl(
      'せい', [Validators.required]
    )
    this.firstNameKana = new FormControl(
      'めい', [Validators.required]
    )
    this.gender = new FormControl(
      'male', [Validators.required]
    )
    this.birthday = new FormControl(
      new Date(), [Validators.required]
    )
    this.zip1 = new FormControl(
      '', [Validators.required, Validators.pattern(UserInfoInputPage.NUMBER_REGEXP)]
    )
    this.zip2 = new FormControl(
      '', [Validators.required, Validators.pattern(UserInfoInputPage.NUMBER_REGEXP)]
    )
    this.address1 = new FormControl(
      '', [Validators.required]
    )
    this.address2 = new FormControl(
      '', [Validators.required]
    )
    this.phone1 = new FormControl(
      '', [Validators.required, Validators.pattern(UserInfoInputPage.NUMBER_REGEXP)]
    )
    this.phone2 = new FormControl(
      '', [Validators.required, Validators.pattern(UserInfoInputPage.NUMBER_REGEXP)]
    )
    this.phone3 = new FormControl(
      '', [Validators.required, Validators.pattern(UserInfoInputPage.NUMBER_REGEXP)]
    )
    this.email = new FormControl(
      '', [Validators.required, Validators.pattern(UserInfoInputPage.EMAIL_REGEXP)]
    )
 
    this.quotationForm = this.formBuilder.group({
      lastNameKanji: this.lastNameKanji,
      firstNameKanji: this.firstNameKanji,
      lastNameKana: this.lastNameKana,
      firstNameKana: this.firstNameKana,
      gender: this.gender,
      birthday: this.birthday,
      zip1: this.zip1,
      zip2: this.zip2,
      address1: this.address1,
      address2: this.address2,
      phone1: this.phone1,
      phone2: this.phone2,
      phone3: this.phone3,
      email: this.email,
    });
  }

  ngOnInit() {
    this.retrieve_Obser_service()
      .subscribe(res => {
        this.data = res;
        console.log(res);
      });
  }

  cancel() {
    this.navCtrl.navigateForward('user-menu');
  }

  retrieve() : void
   {
      this._HTTP
      .get("http://localhost:3000/api/gallery/")
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         console.log(data.records);
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }

   retrieve_Obser_service (): Observable<any> {
    return this._HTTP.get<any>("http://localhost:3000/api/gallery/")
      .pipe(
        tap(),
        catchError(this.handleError([]))
      );
  }
  
  retrieve_Obser() {
    console.log(this.data);
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  delete(){
    // Retrieve the document ID from the supplied parameter and
    // define the URL which triggers the node route for deleting the document
    let recordID 		: string		= "5d9b0c07f1d6dc3f28f8cb05",
        url       	: any      	 	= "http://localhost:3000/api/gallery/" + recordID;

    // Use Angular's Http module's delete method
    this._HTTP
    .delete(url)
    .subscribe((data : any) =>
    {
       // If the request was successful notify the user
    },
    (error : any) =>
    {
       console.dir(error);
    });
  }

  update(){
    let name: any        = "testXXXXXX",
        description: any  = "description",
        thumbnail: any  = "thumbnail",
        displayed: any  = true,
        headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any	  = { name : name, description : description, thumbnail : thumbnail, displayed: displayed },
        url: any      	= "http://localhost:3000/api/gallery";

    // Use the HttpClient put method to update the existing record
    this._HTTP
    .put(url + '/' + "5d9b0c07f1d6dc3f28f8cb05", options, headers)
    .subscribe((data : any) =>
    {
       // If the request was successful clear the form of data
       // and notify the user
    },
    (error : any) =>
    {
       console.dir(error);
    });
  }

  insert(){
    let name: any        = "test1",
        description: any  = "description",
        thumbnail: any  = "thumbnail",
        displayed: any  = true,
        headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any	  = { name : name, description : description, thumbnail : thumbnail, displayed: displayed },
        url: any      	= "http://localhost:3000/api/gallery";

    // Use the HttpClient post method to create a new record
    this._HTTP
    .post(url, options, headers)
    .subscribe((data : any) =>
    {
       // If the request was successful clear the form of data
       // and notify the user
    },
    (error : any) =>
    {
       console.dir(error);
    });
  }

  getCount(){
    this.necEvaService.getPersonsCount().subscribe(res =>{
    this.quotationForm = this.formBuilder.group({
      firstNameKanji: res.count,
    });
      console.log(res);
    }); 
  }
}
