import { Component, Input, OnInit } from '@angular/core';
import data_tree from 'src/assets/data_tree.json';
import { RecursiveService } from '../recursive.service';
import { waitForAsync } from '@angular/core/testing';


@Component({
  selector: 'app-navbar-recursive',
  templateUrl: './navbar-recursive.component.html',
  styleUrls: ['./navbar-recursive.component.scss']
})




export class NavbarRecursiveComponent implements OnInit{



maxDepth=0
keys:any
showRestaurarSubmenu: boolean = false;
isShowing = false;
isExpandedSide = true;
isExpanded = true;
selectedItem:any;
state:number=0;
node:any;




  constructor(private recursiveService: RecursiveService) {
    this.selectedItem = this.recursiveService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
    })
    this.node= this.recursiveService.selectedLabel$.subscribe(item=>{
      this.node=item;
      console.log(this.node)
    })
   }



 async addHijo(event:Event){
    const input=document.createElement("input")
    input.type = "text";
    const parrafo=document.createElement("p")
    parrafo.appendChild(input)
    this.selectedItem.appendChild(parrafo)


    const form= await new Promise(resolve =>{
      input.addEventListener('keydown',(event)=>{if (event.key==='Enter'){resolve(event)}})
    })
    
    let value=input.value

    let zona=this.selectedItem.querySelector('span').textContent
    this.recursiveService.addData(zona,value)
    parrafo.remove()
 }

 async eliminarNodo(event:Event){
    const form=document.getElementById('eliminar')
    form?.classList.add('eliminarshown')

    const respuesta= await new Promise(resolve =>{
      document.addEventListener('click',(event)=>{  
        if(event){    
      if(this.state==1){resolve(1)}
      if(this.state==2){resolve(2)}
      else{
        waitForAsync
      }}})
    })
    console.log(this.state)
    if(this.state==1){
      let zona=this.selectedItem.querySelector('span').textContent
      this.recursiveService.removeData(zona)
    }
    form?.classList.remove('eliminarshown')
    this.state=0  
 }


 toggleSidenav() {
  this.isExpandedSide = !this.isExpandedSide;
}



  ngOnInit(): void {

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
