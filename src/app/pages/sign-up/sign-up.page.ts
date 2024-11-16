import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {


  fireBaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  navCtrl = inject(NavController);


  form = new FormGroup({
    uid: new FormControl('',[]),
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


      this.fireBaseSvc.register(this.form.value.email,this.form.value.password)
      .then( (res: any) =>{

        let uid = res.user.uid;

        this.form.controls.uid.setValue(uid);

        this.setUSerInfo(uid);


        // this.navCtrl.navigateForward('/lists');

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





  async setUSerInfo(uid:string){

    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`
      delete this.form.value.password;


      this.fireBaseSvc.setDocument(path,this.form.value)
      .then( (res: any) =>{


        this.utilsSvc.saveInLocalStorage('user', this.form.value)
;
        // this.navCtrl.navigateForward('/lists');
        this.utilsSvc.routerLInk('/lists');
        this.form.reset()
;


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
