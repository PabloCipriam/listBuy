import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../../services/list.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.page.html',
  styleUrls: ['./edit-list.page.scss'],
})
export class EditListPage implements OnInit {

  listId: string | null = null;
  @Input() list: any = { title: '', items: [] }; // Recibe la lista desde el padre


  fireBaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  listService = inject(ListService);

  constructor(
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
    this.listId = this.route.snapshot.paramMap.get('id');
    if (this.listId) {
      this.listService.getLists().subscribe((data) => {
        this.list = data.find((list) => list.id === this.listId) || this.list;
      });
    }
  }


  addItem() {
    this.list.items.push({ name: '', completed: false });
  }

  removeItem(index: number) {
    this.list.items.splice(index, 1);
  }

saveList() {
  // Asegurarse de que cada ítem tenga las propiedades 'name' y 'completed'
  this.list.items = this.list.items.map((item: any) => ({
    name: item.name || '', // Si no tiene 'name', asigna un valor vacío
    completed: item.completed || false // Si no tiene 'completed', asigna 'false'
  }));

  if (this.listId) {
    // Actualizar lista existente
    this.listService.updateList(this.listId, this.list).then(() => {
      this.router.navigate(['/lists']);
    });
  } else {
    // Crear nueva lista
    this.listService.addList(this.list).then(() => {
      this.router.navigate(['/lists']);
    });
  }
}


  deleteList() {
    if (this.listId) {
      this.listService.deleteList(this.listId).then(() => {
        this.router.navigate(['/lists']);
      });
    }
  }

}
