import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TabService } from '../tab-service.service';
import { CdkDragDrop, moveItemInArray, CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';


interface Tab {
  label: string;
  content: string;
}


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})


export class TabComponent implements OnChanges {
  isKanbanVisible:boolean=false;
  isProovedorVisible:boolean=false
  data: any;
  exe=false
  tabs:any = [];
  selected = new FormControl(0);
  selectedTab: number | null = null;
  selectAfterAdding: HTMLInputElement | undefined; 
  private selection = new SelectionModel();
  showWelcomeMessage = true; 

  constructor(public tabService: TabService) {
    this.tabService.getNewTabObservable().subscribe((data) => {
      this.addTab(data);
      console.log(this.showWelcomeMessage)   });
  this.tabService.showWelcomeMessage$.subscribe((showWelcome) => {
    this.showWelcomeMessage = showWelcome;
  });
  if (this.tabs[0]==false){this.tabs.shift()}}


  
  ngOnChanges(): void {
   
 
  }

  select(tab:any) { 
     this.selection.select(this.tabs[0])

    if (!this.selection.isSelected(tab)) {
      this.selection.clear();
      this.selection.select(tab);

    }
  }


  isSelected(tab:any): boolean {
      return this.selection.isSelected(tab);
    }  

  addTab(data: { label: string; content: string }): void {
    this.tabs.push(data);
    this.isKanbanVisible=true
    this.exe=false
  }

  closeTab(index: number): void {
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
          tabs[tabs.length - 1].dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true, view: window}));
          this.exe = true;
      }, 200);}
  
    return connections;
  }

  drop(event: CdkDragDrop<string[]>): void {
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
