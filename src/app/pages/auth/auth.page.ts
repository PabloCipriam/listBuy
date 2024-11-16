import { User } from './../../models/user.model';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  fireBaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  navCtrl = inject(NavController);

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  constructor() { }

  ngOnInit() {
  }

  async submit(){

    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();


      this.fireBaseSvc.login(this.form.value.email,this.form.value.password)
      .then( (res: any) =>{


        this.getUSerInfo(res.user.uid);
      //  this.navCtrl.navigateForward('/lists');

      }).catch(error =>{

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });

      }).finally(() => {
         loading.dismiss();
      });




    }




  }




  async getUSerInfo(uid:string){

    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`


      this.fireBaseSvc.getDocument(path)
      .then( (user: User) =>{


        this.utilsSvc.saveInLocalStorage('user', user)
;
        // this.navCtrl.navigateForward('/lists');
        this.utilsSvc.routerLInk('/lists');
        this.form.reset()


        this.utilsSvc.presentToast({
          message: `Te damos la bienvenida ${user.email} `,
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'person-circle-outline'
        });



      }).catch(error =>{

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });

      }).finally(() => {
         loading.dismiss();
      });




    }




  }


}
