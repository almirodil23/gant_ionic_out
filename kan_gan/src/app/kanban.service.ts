import { Injectable } from '@angular/core';
import kanban from '../assets/kanban.json'
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class KanbanService {


  constructor(private http:HttpClient){}
  url='http://localhost:3000/api/save'

	

  getTasks() {
    return kanban
  }

  getNames(){
    let names:string[]=[]
    const proyectos=this.getTasks()
    proyectos.forEach((nombre:any)=>{names.push(nombre.nombre)})
    return names
  }

  saveTasks(exportData: any): Observable<any> {
	return this.http.post<any>(this.url, exportData);
  }

}


