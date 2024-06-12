import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import data_tree from 'src/assets/data_tree.json';
import { RecursiveService } from '../recursive.service';

@Component({
  selector: 'app-recursive-core',
  templateUrl: './recursive-core.component.html',
  styleUrls: ['./recursive-core.component.scss']
})
export class RecursiveCoreComponent implements OnInit{

  @Input()menuData!: any[];
  @Output() newItemEvent = new EventEmitter<HTMLElement>();

  
  maxDepth=0
  keys:any;
  selectedItem:any;

  

  
  
  constructor(private recursiveService:RecursiveService) {
    this.menuData=recursiveService.getData()
   }
  
   addHijo(){}
  

   selected(e: Event) {
    const element = e.currentTarget as HTMLElement;
    this.recursiveService.setSelectedItem(element);
  }
  
  

 
   toggle(event: Event) {
    const element = event.target as HTMLElement;
    const parentElement = element.parentElement?.parentElement;
    if (parentElement) {
      const nestedElement = parentElement.querySelector('.nested') as HTMLElement;
      if (nestedElement) {
        nestedElement.classList.toggle('active');
      }
      element.classList.toggle('caret-down');
      element.textContent = element.textContent === 'keyboard_arrow_right' ? 'expand_more' : 'keyboard_arrow_right';
    }
  }
  
  
    ngOnInit(): void {
      const keys = Object.keys(this.menuData);
  
    }
  
    hasChildren(menuItem: any): boolean {
      return menuItem.children && menuItem.children.length > 0;
    }
  
    getMaxDepth(tree: any, currentDepth: number = 0): number {
    // Si el árbol es null o no tiene hijos, devuelve la profundidad actual
    if (!tree || !tree.children || tree.children.length === 0) {
      return currentDepth;
    }
  
    // Inicializar la profundidad máxima como la profundidad actual
    let maxDepth = currentDepth;
  
    // Iterar sobre los hijos del árbol
    for (const child of tree.children) {
      // Calcular la profundidad para el hijo actual
      const childDepth = this.getMaxDepth(child, currentDepth + 1);
  
      // Actualizar la profundidad máxima si la profundidad del hijo es mayor
      if (childDepth > maxDepth) {
        maxDepth = childDepth;
      }
    }
     this.maxDepth=maxDepth;
    return maxDepth;
  }
    
  }
  