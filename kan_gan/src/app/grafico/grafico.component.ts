import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Grafico, GraficoService } from './grafico.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss'],
})
export class GraficoComponent implements OnInit {
  graficos: Grafico[] = [];
  nombreProyecto: string = '';
  constructor(
    private route: ActivatedRoute,
    private service: GraficoService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.nombreProyecto = params['nP'];
    });
    this.graficos = this.service.getGraficosProyecto(this.nombreProyecto);
  }

  onPointClick(e: any) {
    e.target.select();
  }

  getTaskColor(e: Event) {
    console.log(e);
  }
  customizePoint(a: any) {
    if (a.seriesName == 'Horas Realizadas') {
      if (a.data.horasEstimadas == a.data.horasRealizadas) {
        return { color: '#FF8000' };
      } else if (a.data.horasEstimadas < a.data.horasRealizadas) {
        return { color: '#ff0000' };
      } else {
        return { color: '#008f39' };
      }
    }
    return { color: '#0000ff' };
  }
  sortLegendItems(items: any) {
    if (items.length != 0) {
      items[0].marker.fill = '#0000ff';
      items[1].marker.fill = '#00ff00';
      console.log(items);
    }
  }
}
