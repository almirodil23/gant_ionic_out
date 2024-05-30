import { Component, OnInit } from '@angular/core';
import { DxSortableTypes } from 'devextreme-angular/ui/sortable';
import { KanbanService } from '../kanban.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})


export class KanbanComponent implements OnInit {
  i: number=0;
  url:any;
  lists:any[][]= [];
  tasks:any[][]=[]
  showDetails: boolean = false;
  statusesStr = ['Estudio','Desarrollo','Test','Finalizado'];
  statusesInt = [0,1,2,3]
  nombres:any;
  constructor(private service: KanbanService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.i = +params['i'];
      this.selectProyecto(this.i);
      console.log(this.i)
    });
  }  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.i = +params['i'];
      this.selectProyecto(this.i);
    });
  }

  getNombres(){
    this.nombres=this.service.getNames()
  }

  selectProyecto(i:number){
    const tasks = this.service.getTasks()[this.i];

    this.statusesInt.forEach((status) => {
      this.lists.push(tasks.ramas.filter((task:any) => task.estado === status));
    });
  }
  
  onListReorder(e: DxSortableTypes.ReorderEvent) {
    const list = this.lists.splice(e.fromIndex, 1)[0];
    this.lists.splice(e.toIndex, 0, list);

    const status = this.statusesStr.splice(e.fromIndex, 1)[0];
    this.statusesStr.splice(e.toIndex, 0, status)
   
  }

  onTaskDragStart(e: DxSortableTypes.DragStartEvent) {
    e.itemData = e.fromData[e.fromIndex];
  }

  onTaskDrop(e: DxSortableTypes.DragEndEvent) {
    const movedItem = e.fromData.splice(e.fromIndex, 1)[0];
    e.fromData.splice(e.fromIndex, 0);
    e.toData.splice(e.toIndex, 0, e.itemData);
    movedItem.estado = this.lists.findIndex((list:any[])=> list === e.toData);
  }

  salvado()  {
    let exportData = this.lists;
    console.log(exportData);
    this.service.saveTasks(exportData)
    }


}
