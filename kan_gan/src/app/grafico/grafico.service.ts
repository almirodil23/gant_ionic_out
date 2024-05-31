import { Injectable } from '@angular/core';
import * as archivo from '../../assets/kanban.json'

export class Grafico {
  nombre!: string;

  horasEstimadas!: number;

  horasRealizadas!: number;
}


@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  constructor() { }

  getGraficosProyecto(nombreProyecto: string) {
    let data = archivo;
    let proyecto;
    let graficos: Grafico[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].nombre.toLowerCase() == nombreProyecto.toLowerCase()) {
        proyecto = data[i];
      }
    }
    if (proyecto) {
      for (let rama of proyecto.ramas) {
        graficos.push({
          nombre: rama.nombre,
          horasEstimadas: rama.horasEstimadas,
          horasRealizadas: rama.horasRealizadas,
        })
      }
    }
    return graficos;
  }
}
