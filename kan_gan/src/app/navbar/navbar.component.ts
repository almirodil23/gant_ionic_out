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
  nombres: any = [];
  tabs = [];
  selected = new FormControl(0);
  selectedTab: number | null = null;
  selectAfterAdding: HTMLInputElement | undefined;
  showWelcomeMessage = true;

  @ViewChild('sidenav') sidenav!: MatSidenavModule;
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
    console.log(this.nombres);

    this.tabService.getStates().subscribe((restore) => {
      this.restaurar.push(restore);
      console.log(this.restaurar);
    });
  }

  openForm() {
    this.tabService.welcome();
    this.tabService.openNewTab({ label: 'Formulario', content: 'testings' });
    setTimeout(() => {
      this.router.navigate(['form']);
    }, 100);
  }

  openNewTabWithData(i: number): void {
    this.tabService.welcome();
    let name = this.nombres[i];
    if (i == -1) {
      name = 'General';
    }
    const data = { label: name, content: i };
    this.tabService.openNewTab(data);
    setTimeout(() => {
      this.router.navigate(['kanban', i]);
    }, 100);
  }

  openNewTabWithDataGant(): void {
    this.tabService.welcome();
    const data = { label: 'Gant', content: 'Hola' };
    this.tabService.openNewTab(data);
    setTimeout(() => {
      this.router.navigate(['gant']);
    }, 150);
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
    if (!this.isExpanded1) {
      this.isShowing1 = true;
    }
    if (!this.isExpanded2) {
      this.isShowing2 = true;
    }
  }

  restore(i: number) {
    let date = this.restaurar[i];
    console.log(date)
    if (date.menu === 'Gant') {
      this.openNewTabWithDataGant();
    } else if (date.menu === 'Formulario') {
      this.openForm();
    } else {
      this.openNewTabWithData(date.data.content);
    }
    this.restaurar.splice(i, 1);
  }

  mouseleave() {
    if (!this.isExpanded1) {
      this.isShowing1 = false;
    }
    if (!this.isExpanded2) {
      this.isShowing2 = false;
    }
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
