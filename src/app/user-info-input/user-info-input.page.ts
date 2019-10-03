import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { take } from 'rxjs/operators'

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

  constructor(
    private formBuilder: FormBuilder,) { 
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
  }

}
