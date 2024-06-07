import { Injectable } from '@angular/core';
import kanban from '../assets/kanban.json';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  newData: any;

  constructor(private http: HttpClient) {
    this.newData = kanban;
  }
  url = 'http://localhost:3000/api/save';

  getTasks() {
    return this.newData;
  }

  getNames() {
    let names: string[] = [];
    const proyectos = this.getTasks();
    proyectos.forEach((nombre: any) => {
      names.push(nombre.nombre);
    });
    return names;
  }

  saveTasks(exportData: any, i: number) {
    /*	return this.http.post<any>(this.url, exportData);*/
    let arreglo = kanban.filter((_, index) => index !== 0);
    this.newData.push(exportData);
    console.log(this.newData);
    const dataStr = JSON.stringify(this.newData);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  }
}
