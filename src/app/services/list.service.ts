import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private firestore: AngularFirestore) {


  }

  getLists(): Observable<any[]> {

    return this.firestore.collection('lists').valueChanges({ idField: 'id' });
  }

  updateList(listId: string, list: any) {


    const storedUserId = localStorage.getItem('user');

    list.userId = JSON.parse(storedUserId).uid;

    // Asegurarse de que los ítems tengan las propiedades requeridas
    list.items = list.items.map((item: any) => ({
      name: item.name || '',
      completed: item.completed || false,

    }));

    return this.firestore.collection('lists').doc(listId).update(list);
  }

  addList(list: any) {


    const storedUserId = localStorage.getItem('user');

    list.userId = JSON.parse(storedUserId).uid;
    // Asegurarse de que los ítems tengan las propiedades requeridas
    list.items = list.items.map((item: any) => ({
      name: item.name || '',
      completed: item.completed || false,

    }));

    return this.firestore.collection('lists').add(list);
  }
  deleteList(id: string) {
    return this.firestore.collection('lists').doc(id).delete();
  }
}
