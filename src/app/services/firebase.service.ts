import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore,setDoc,doc ,getDoc} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  private afAuth = inject(AngularFireAuth);
  private firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  constructor() {}

  getAuth(){
    return getAuth();
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);

  }

setDocument(path:string, data: any){

  return setDoc(doc(getFirestore(),path), data)

}



async getDocument(path:string){

   return (await getDoc(doc(getFirestore(),path))).data();

}

sendRecoveryEmail(email:string){
  return sendPasswordResetEmail(getAuth(), email)
}


signOut(){
  getAuth().signOut();
  localStorage.removeItem('user');
  this.utilsSvc.routerLInk('/auth');
}



}







