import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {

  @Input() control!:  FormControl;
  @Input() type!:  string;
  @Input() label!:  string;
  @Input() icon!:  string;
  @Input() autocomplete!:  string;

  isPassword!:boolean;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {

    this.isPassword = this.type === 'password' ? true : false;
  }

  showOrHidePassword(){

    this.hide = !this.hide;

    this.type = this.hide ? this.type = 'password' : this.type = 'text';

  }

}
