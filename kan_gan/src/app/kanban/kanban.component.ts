import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { DxSortableTypes } from 'devextreme-angular/ui/sortable';
import { KanbanService } from '../kanban.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { TabService } from '../tab-service.service';
import { FormControl, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
  encapsulation:ViewEncapsulation.None

})


export class KanbanComponent implements OnInit{
  i: number=0;
  url:any;
  lists:any[][]= [];
  tasks:any[][]=[]
  showDetails: boolean = false;
  statusesStr = ['Estudio','Desarrollo','Test','Finalizado'];
  statusesInt = [0,1,2,3]
  nombres:any;
  selectedDates: any[] = []; 
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private service: KanbanService, private route: ActivatedRoute, private tab:TabService) {
  }
  

  showDate(event: Event) {

  /*const target = event.currentTarget as HTMLElement;
    const cardDetails = target.closest('.card-details');
    if (cardDetails) {
      const grafElement = cardDetails.querySelector('.graf');
      const showDateElement = cardDetails.querySelector('.showdate');
  
      if (grafElement) {
        grafElement.classList.replace('graf', 'showdate');
      } else if (showDateElement) {
        showDateElement.classList.replace('showdate', 'graf');
      }
    }
    */
  }
  

/*dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  if (view == 'month') {
    let dateToFind = this.getDateOnly(cellDate)
    let i = this.selectedDates.indexOf(dateToFind)
    console.log('n')

    if (this.selectedDates.filter(data=>{dateToFind===this.getDateOnly(data)})) {
      return 'selected'
    }
  }
  return ''
}
*/

daySelected(inicio: Date ,fin: Date,calendar: any) {
  this.selectedDates=[]
   var loop = new Date(inicio);
   var end = new Date(fin)
  this.range.setValue({start:inicio,end:fin})

}

getDateOnly(date: Date):string {
  return new Date(date).toISOString().split('T')[0];
}


  
  ngOnInit(): void {
    this.route.params.subscribe((data)=>{
      this.i=data['i']
    })
    setTimeout(()=>{
      this.selectProyecto(this.i)},200 )
  }



  getNombres(){
    this.nombres=this.service.getNames()
  }
  selectProyecto(i:number){
    let taskis:any
    if (i==-1){taskis=this.service.getTasks();
      for (let c=0;c<taskis.length;c++) {
        this.statusesInt.forEach((status) => {
          this.lists.push(taskis[c].ramas.filter((task: any) => task.estado === status));
      })}
    }
    
    
    
    else {taskis = this.service.getTasks()[this.i];
      this.statusesInt.forEach((status) => {
        this.lists.push(taskis.ramas.filter((task:any) => task.estado === status));
      });
    };
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

  salvado(i:number)  {
    let exportData = this.lists;
    this.service.saveTasks(exportData,i)
    
    }

fechas(){}
}
