import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TabService } from '../tab-service.service';
import { CdkDragDrop, moveItemInArray, CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

interface Tab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent  {


  /* variable para crear un evento que haga click en la tab al crearla */
  exe = false;


  /*variables gestión de tabs */
  tabs: any = [];
  routes:any=[];
  id: number | any;

  selected = new FormControl(0);
  selectedTab: number | null = null;
  private selection = new SelectionModel();


 /* array para restaurar */ 
  restaurar: any[] = [];


  constructor(public tabService: TabService,private router:Router) {
    this.tabService.getNewTabObservable().subscribe((data) => {
      this.addTab(data);
      setTimeout(()=>{this.routes.push(this.router.url)},200)
    });
    this.tabService.getStates().subscribe((restore) => {
      this.restaurar.push(restore);
    });
    if (this.tabs[0] == false) {
      this.tabs.shift();
    }
  }

 /*Selección de tabs para estilo y renderizado de contenido */
  select(tab: any,i:number) {
    this.selection.select(this.tabs[0]);

    if (!this.selection.isSelected(tab)) {
      this.selection.clear();
      this.selection.select(tab);
    }
    this.router.navigateByUrl(this.routes[i+1])
  }

  isSelected(tab: any): boolean {
    return this.selection.isSelected(tab);
  }


 
  /*Administración de tabs */
  addTab(data: { label: string; content: any }): void {
    this.id = data.content;
    this.tabs.push(data);
    this.exe = false;
  }

  closeTab(index: number): void {
    let tabId = this.tabs[this.tabs.length - 1];

    if (tabId.label != 'Formulario') {
      /*control de formulario ya que se adiere al servicio por su cuenta*/
      this.tabService.setMenuState(tabId.label, tabId);
    }
    this.tabs.splice(index, 1);
  }

  getAllListConnections(index: number): string[] {
    const connections: string[] = [];

    for (let i = 0; i < this.tabs.length; i++) {
      if (i !== index) {
        connections.push('tab-' + i);
      }
    }
    if (!this.exe) {
      setTimeout(() => {
        let tabs = document.getElementsByClassName('mdc-tab mat-mdc-tab mat-mdc-focus-indicator ng-star-inserted');
        tabs[tabs.length - 1].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        this.exe = true;
      }, 100);
    }

    return connections;
  }


  /*Organización de tabs, todavía falla al reordenar las tabs */

  dropped(event: CdkDragDrop<any>, t: MatTabGroup): void {
    const arr = t._tabs.toArray();
    moveItemInArray(arr, event.previousIndex, event.currentIndex);
    t._tabs.reset(arr);
  }

  drop(event: CdkDragDrop<string[]>): void {
    /*
    const previousIndex = parseInt(event.previousContainer.id.replace('tab-', ''), 10);
    const currentIndex = parseInt(event.container.id.replace('tab-', ''), 10);
    if (
      !isNaN(previousIndex) &&
      !isNaN(currentIndex) &&
      previousIndex !== undefined &&
      currentIndex !== undefined &&
      previousIndex !== currentIndex
    ) {
      this.selected.setValue(currentIndex);
      moveItemInArray(this.tabs, previousIndex, currentIndex);
    }
      */
  }

  sort(event: CdkDragSortEvent<string[]>): void {
    const previousIndex = parseInt(event.previousIndex.toString(), 10);
    const currentIndex = parseInt(event.currentIndex.toString(), 10);
    if (
      !isNaN(previousIndex) &&
      !isNaN(currentIndex) &&
      previousIndex !== undefined &&
      currentIndex !== undefined &&
      previousIndex !== currentIndex
    ) {
      this.selected.setValue(currentIndex);
    }
  }
}
