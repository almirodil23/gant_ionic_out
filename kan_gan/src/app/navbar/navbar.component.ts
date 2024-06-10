import { Component, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TabService } from '../tab-service.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { KanbanService } from '../kanban.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  id=['Formulario','Gant','Kanban']
  nombres: any = [];
  tabs = [];
  selected = new FormControl(0);
  selectedTab: number | null = null;
  selectAfterAdding: HTMLInputElement | undefined;
 
  @ViewChild('sidenav') sidenav!: MatSidenavModule;
  isExpandedSide=true;
  isExpanded = true;
  isExpanded1 = true;
  isExpanded2 = true;

  isShowing = false;
  isShowing1 = false;
  isShowing2 = false;

  showSubmenu: boolean = false;
  showGantSubmenu: boolean = false;
  showKanbanSubmenu: boolean = false;
  showRestaurarSubmenu: boolean = false;


  restaurar: any[] = [];

  constructor(
    private tabService: TabService,
    private router: Router,
    private kanban: KanbanService,
  ) {
    this.nombres = this.kanban.getNames();

    this.tabService.getStates().subscribe((restore) => {
      this.restaurar.push(restore);
    });
  }

/*Funcion de apertura de pestañas con parametros si es necesario. Hay tres componentes distintos */

  openTab(label:string,i?:number){
    if(label==='Formulario'){
      this.tabService.openNewTab({ label: 'Formulario', content: 'nada a declarar' });
      setTimeout(() => {
        this.router.navigate(['form']);
      }, 100);
    }

    if(label==='Gant'){
      const data = { label: 'Gant', content: 'nada a declarar' };
      this.tabService.openNewTab(data);
      setTimeout(() => {
        /*pdte corregir ya que si la ruta actual ya es /gant y se navega de nuevo a dicha ruta, el componente no se renderiza */
        this.router.navigate(['']);
        this.router.navigate(['/gant']);
      }, 150);
    }

    if(label==='Kanban'){
      if (i !== undefined && i >= -2 && i < this.nombres.length) {
          let name = this.nombres[i];
          if (i == -1) {
            name = 'General'; }
          const data = { label: name, content: i };
          this.tabService.openNewTab(data);
          setTimeout(() => {
              this.router.navigate(['kanban', i]);
                         }, 100);
        }
  }
}


  /*Funcion para restaurar pestañas cerradas, no se incluye el contenido ya que debe ser específico de cada componente */

  restore(i: number) {
    let date = this.restaurar[i];
    if (date.menu === 'Gant') {
      this.openTab('Gant');
    } else if (date.menu === 'Formulario') {
      this.openTab('Formulario');
    } else {
      this.openTab('Kanban',date.data.content);
    }
    this.restaurar.splice(i, 1);
  }


  toggleSidenav() {
    this.isExpandedSide = !this.isExpandedSide;
  }

}
