import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import data_tree from 'src/assets/data_tree.json';
import { RecursiveService } from '../recursive.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { waitForAsync } from '@angular/core/testing';

interface arbolPadreHijo {
  label?: string;
  children?: arbolPadreHijo[];
}

@Component({
  selector: 'app-recursive-core',
  templateUrl: './recursive-core.component.html',
  styleUrls: ['./recursive-core.component.scss']
})
export class RecursiveCoreComponent implements OnInit{

  @Input() menuData: arbolPadreHijo[];
  @Output() newItemEvent = new EventEmitter<HTMLElement>();

  
  position:any;
  keys:any;
  selectedItem:any;
  drops:number=0;

  

  
  
  constructor(private recursiveService:RecursiveService) {
    this.menuData=recursiveService.getData()
   }
  
  

   selected(e: Event, nodo: arbolPadreHijo) {
    const element = e.currentTarget as HTMLElement;
    this.recursiveService.setSelectedItem(element);
    this.recursiveService.setSelectedNode(nodo);
  }
  
  
  drop(event: CdkDragDrop<arbolPadreHijo[]>) {
    this.drops=this.drops+1
    /*pdte aviso cuando no se realiza correctamente 3 drag and drop */
    if(this.drops==3){
      const form=document.getElementById('drag')
      if(form){form.classList.add('eliminarshown1') }
      this.drops=0 
    }
    const element = document.elementFromPoint(event.dropPoint.x,event.dropPoint.y);
    if(event.item.data.label!==element?.innerHTML){   /*check que no se deposite en el mismo sitio*/
     if(element&&element.className==='caret-down'||element&&element.className==='spin'||element&&element.className==='spin caret-down'){
    if(element?.textContent){let zona=element.textContent
    this.recursiveService.move(event.item.data.label,zona)}
    }}
    }
  
   toggle(event: Event) {
    var element= event.target as HTMLElement;
    const parentElement = element.parentElement?.parentElement;
    if(element.tagName==='SPAN'){} else{element = element.firstChild as HTMLElement;}
    if (parentElement) {
      const nestedElement = parentElement.querySelector('.nested') as HTMLElement;
      if (nestedElement) {
        nestedElement.classList.toggle('active');
      }
      if(element)
      element.classList.toggle('caret-down');
      const elementicon=element.nextElementSibling
      if(elementicon){
      elementicon.textContent = elementicon.textContent === 'keyboard_arrow_right' ? 'expand_more' : 'keyboard_arrow_right';}
    }
    }
 
  

  getConnectedDropLists(nodeList: arbolPadreHijo[]): string[] {
    const ids: string[] = [];
  
    function collectIds(nodes: arbolPadreHijo[], parentId: string = '') {
      for (const node of nodes) {
        const id = parentId ? `${parentId}-${node.label?.replace(/\s+/g, '-').toLowerCase()}` : node.label?.replace(/\s+/g, '-').toLowerCase();
        ids.push(id||'');
        if (node.children) {
          collectIds(node.children, id);
        }
      }
    }
  
    collectIds(nodeList);
    return ids;
  }
  
    ngOnInit(): void {
      const keys = Object.keys(this.menuData);

    }

 
  }
