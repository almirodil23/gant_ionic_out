import { Component, Input, OnInit } from '@angular/core';
import data_tree from 'src/assets/data_tree.json';


@Component({
  selector: 'app-navbar-recursive',
  templateUrl: './navbar-recursive.component.html',
  styleUrls: ['./navbar-recursive.component.scss']
})



export class NavbarRecursiveComponent implements OnInit{

@Input()menuData: any;


maxDepth=0
keys:any


constructor() {
  console.log(this.getMaxDepth(this.menuData=data_tree))
 }

  toggleSubMenu(menuItem: any) {
    if (menuItem.children) {
      menuItem.showSubMenu = !menuItem.showSubMenu;
    }
  }

  ngOnInit(): void {
    console.log(this.menuData)
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
