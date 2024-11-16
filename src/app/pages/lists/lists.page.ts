import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ListService } from 'src/app/services/list.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {
  lists: any[] = [];
  filteredLists: any[] = [];


  fireBaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);



  constructor(private listService: ListService, private router: Router) {}

  ngOnInit() {

    const storedUserId = localStorage.getItem('user');



    this.listService.getLists().subscribe((data) => {

      console.log(data)

      this.lists = data.filter((list) => list.userId === JSON.parse(storedUserId).uid);
    this.filteredLists = [...this.lists]; // Para búsquedas
    });
  }

  filterLists(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredLists = this.lists.filter((list) =>
      list.title.toLowerCase().includes(searchTerm)
    );
  }

  navigateToDetail(listId: string) {
    this.router.navigate(['/detalle-lista', listId]);

  }

  navigateToCreateList() {
    this.router.navigate(['/editar-lista']);
  }


  signOut() {
    this.fireBaseSvc.signOut();
  }
}
