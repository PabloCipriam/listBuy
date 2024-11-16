import { User } from './../../models/user.model';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  fireBaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  navCtrl = inject(NavController);

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),

  })

  constructor() { }

  ngOnInit() {
  }

  async submit(){

    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();


      this.fireBaseSvc.sendRecoveryEmail(this.form.value.email)
      .then( (res: any) =>{


        this.utilsSvc.presentToast({
          message:'Correo enviado con exito',
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'mail-outline'
        });

        this.utilsSvc.routerLInk('/auth');
        this.form.reset()



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
