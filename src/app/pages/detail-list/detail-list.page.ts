import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.page.html',
  styleUrls: ['./detail-list.page.scss'],
})
export class DetailListPage implements OnInit {

  list: any; // Eliminamos @Input porque no se pasa desde el padre

  constructor(private route: ActivatedRoute, private listService: ListService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');


    if (id) {
      this.listService.getLists().subscribe((data) => {
        this.list = data.find((list) => list.id === id);

        // console.log(this.list)
      });
    }
  }

  toggleItem(index: number) {
    this.list.items[index].completed = !this.list.items[index].completed;
  }

}
