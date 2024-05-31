import { Injectable } from '@angular/core';
import * as archivo from '../../assets/kanban.json';

// Esto es lo que se muestra a la izquierda del diagrama de gantt, el parentId hace referencia a otras tareas, de las que cuelgan.
export class Task {
  id!: number;

  parentId!: number | undefined;

  title!: string;

  start!: Date | null;

  end!: Date | null;

  progress!: number;
}

@Injectable({
  providedIn: 'root'
})
export class GanttService {
  getProyectos() {
    // Hace falta para la iteracion de los datos
    let datos = archivo;

    let tareas: Task[] = [];

    // Se buscan los nombres de todos los involucrados en los proyectos, que son las raices del resto del Gantt
    for (let i = 0; i < datos.length; i++) {
      for (let rama of datos[i].ramas) {
        if (tareas.find(x => x.title == rama.asignado)) continue
        else {
          tareas.push({
            id: tareas.length + 1,
            parentId: 0,
            title: rama.asignado,
            start: null,
            end: null,
            progress: 0,
          })
        }
      }
      // Se busca el nombre de los proyectos en los que estan involucrados los empleados, para colgar de ellos en el Gantt
      for (let rama of datos[i].ramas) {
        // Aqui se comprueba si el nombre del proyecto a añadir ya existe en la rama del empleado, si asi no se añade de nuevo.
        if (!(tareas[tareas.length - 1].title == datos[i].nombre && tareas[tareas.length - 1].parentId == tareas.find(x => x.title == rama.asignado)?.id)) {
          tareas.push({
            id: tareas.length + 1,
            parentId: tareas.find(x => x.title == rama.asignado)?.id,
            title: datos[i].nombre,
            start: null,
            end: null,
            progress: 0,
          });
        }
      }

      for (let rama of datos[i].ramas) {
        //Se busca el indice del proyecto, como el indice del array no refleja el id real de los proyectos se aumenta en 1, para ajustarlos al indice verdadeo
        let indiceAsignado = tareas.findIndex(x => x.title == rama.asignado) + 1;
        let indiceProyectoAsignado = tareas.findIndex(x => x.parentId == indiceAsignado && x.title == datos[i].nombre) + 1
        tareas.push({
          id: tareas.length + 1,
          parentId: indiceProyectoAsignado,
          title: datos[i].nombre + ' ' + rama.asignado + ' ' + rama.nombre,
          start: new Date(rama.fechaIncio),
          end: new Date(rama.fechaFin),
          progress: (rama.horasRealizadas / rama.horasEstimadas) * 100,
        })
      }
    }
    return tareas;
  }
}
