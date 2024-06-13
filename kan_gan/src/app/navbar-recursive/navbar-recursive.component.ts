import { Component, Input, OnInit } from '@angular/core';
import data_tree from 'src/assets/data_tree.json';
import { RecursiveService } from '../recursive.service';
import { waitForAsync } from '@angular/core/testing';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';



interface arbolPadreHijo {
  label?: string;
  children?: arbolPadreHijo[];
}


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
menuData: arbolPadreHijo[];




  constructor(private recursiveService: RecursiveService) {
    this.selectedItem = this.recursiveService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
    })
    this.node= this.recursiveService.selectedLabel$.subscribe(item=>{
      this.node=item;
    })
      this.menuData=recursiveService.getData()

   }


   drop(event: CdkDragDrop<arbolPadreHijo[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }}

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
   this.buscar()
  }
 buscar(){
  const value='Cereza'
  this.recursiveService.goTo(value)
 }
  
}
