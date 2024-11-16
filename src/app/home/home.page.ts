import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  fireBaseSvc = inject(FirebaseService);

  userData: User = {
    uid: 'dasdasdasdasd',
    email: 'gabrielbetinvaldes@gmail.com',
    password: '123456',
    name: 'Gabriel betin'
  }

  constructor() {}ß
  ngOnInit(): void {
    this.fireBaseSvc.login(this.userData.email,this.userData.password)
     .then( (res: any) =>{
      console.log(res)
     });
  }

}
