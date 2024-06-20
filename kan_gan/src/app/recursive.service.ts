import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import data_tree_ from 'src/assets/data_tree.json';
import {CdkDragDrop,moveItemInArray,transferArrayItem,CdkDrag,CdkDropList,} from '@angular/cdk/drag-drop';


interface arbolPadreHijo {
  label?: string;
  children?: arbolPadreHijo[];
}

@Injectable({
  providedIn: 'root'
})



export class RecursiveService {
  ind:number|undefined=0;
  datos:any;
  actualParents:any=[];
  data_tree=data_tree_
  private selectedItemSubject: BehaviorSubject<HTMLElement | null> = new BehaviorSubject<HTMLElement | null>(null);
  selectedItem$: Observable<HTMLElement | null> = this.selectedItemSubject.asObservable();
  private label:BehaviorSubject<string|null>= new BehaviorSubject<string|null>(null)
  selectedLabel$:Observable<string|null>=this.label.asObservable();
  private isExpandedSide: BehaviorSubject<boolean>=new BehaviorSubject(true);
  isExpandedSide$: Observable<boolean>=this.isExpandedSide
  public selectedNode?: arbolPadreHijo;


constructor(){
  this.resize()
}


  setSelectedNode(nodo: arbolPadreHijo){
    this.selectedNode = nodo;
  }

   setExpandedSide(){
    this.isExpandedSide.next(!this.isExpandedSide.value)
   }

  setSelectedItem(element: HTMLElement) {
    const prevSelectedItem = this.selectedItemSubject.getValue();
    
    if(element.tagName==='DIV'){
      const i=element.children
      if(i[1])
      if(i[1].textContent==='keyboard_arrow_right'){
      i[1].textContent='keyboard_arrow_down'}
      else{
      i[1].textContent='keyboard_arrow_right'
      }
    }
  
      
    const text1=element.innerText
    
    if(text1.match('\n')?.index){this.ind=text1.match('\n')?.index}else{this.ind=0}
    let text=text1.substring(0,this.ind)
    this.label.next(text)

    if (prevSelectedItem) {
      prevSelectedItem.classList.remove('selected');
      prevSelectedItem.classList.add('caret-down');

    }
    element.classList.add('selected');
    this.selectedItemSubject.next(element);
  }

  getSelectedItem(): HTMLElement | null {
    return this.selectedItemSubject.getValue();
  }

  getData(){
    this.orderData(this.data_tree)
    return this.data_tree
  }

  addData(zona:string,value:string){
    let nodo=this.findData(zona)
    if(nodo){
    if (!nodo.children){nodo.children=[]}
       const newNode = {label: value };
       nodo.children = [...nodo.children, newNode];
      console.log(this.data_tree)  
      this.getData() 
       setTimeout(()=>{
        const elements = document.querySelectorAll('div.caret'); 
        for (const element of elements) {
          if (element.textContent?.trim() === value) {
            element.classList.add('highlight');
            setTimeout(() => {
              element.classList.remove('highlight');
            }, 2000); 
            break;
          }
        }
      },150)
    }
  }
   
          


  removeData(zona:string){
    let nodo=this.findData(zona)
    if(nodo){
         delete nodo.children;
         delete nodo.label;
  }}


  
  findData(value: string, arbol?: arbolPadreHijo[]): arbolPadreHijo | null {
    var sinAcentos=''
    if (value){
    sinAcentos = value.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toUpperCase();}
    if(sinAcentos.length==0){sinAcentos=value}
    for (const nodo of arbol || this.data_tree) {
      if (nodo.label) {
        const valueLimpio = nodo.label.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toUpperCase();
        if(valueLimpio.length==0){let valueLimpio=nodo.label}
        if (valueLimpio.indexOf(sinAcentos
    
        ) > -1) {
          this.actualParents.push(nodo.label);
          return nodo;
        }
      }
      if (nodo.children) {
        const foundInChildren = this.findData(value, nodo.children);
        if (foundInChildren) {
          this.label.next(value);
          return foundInChildren;
        }
      }
    }
      return null;
  }
  

  findInChildren(label: string, children: arbolPadreHijo[] | undefined): arbolPadreHijo | undefined {
  return children?.find((child: arbolPadreHijo) => child.label === label);
}

move(nodeLabel: string, newParentLabel: string): boolean {
  const nodeToMove = this.findData(nodeLabel);
  if (!nodeToMove) {
    console.error(`Node with label '${nodeLabel}' not found.`);
    return false;
  }

  const newParent = this.findData(newParentLabel);
  if (!newParent) {
    console.error(`Parent node with label '${newParentLabel}' not found.`);
    return false;
  }

  const currentParent = this.findParent(nodeLabel);
  if (!currentParent) {
    console.error(`Parent of node with label '${nodeLabel}' not found.`);
    return false;
  }

  const index = currentParent.children!.findIndex(child => child.label === nodeLabel);

  if (index !== -1) {
    currentParent.children!.splice(index, 1);
    newParent.children = newParent.children || [];
    newParent.children.push(nodeToMove);
    return true;
  } else {
    console.error(`Node with label '${nodeLabel}' not found in its parent's children.`);
    return false;
  }
}


private findParent(label: string, arbol?: arbolPadreHijo[], path: arbolPadreHijo[] = []): arbolPadreHijo | null {
  for (const nodo of arbol || this.data_tree) {
    path.push(nodo);

    if (nodo.label === label) {
      this.actualParents = [...path];
      return nodo;
    }

    if (nodo.children) {
      const foundInChildren = this.findInChildren(label, nodo.children);
      if (foundInChildren) {
        this.actualParents = [...path];
        return nodo;
      }

      const foundInDescendants = this.findParent(label, nodo.children, path);
      if (foundInDescendants) {
        return foundInDescendants;
      }
    }

    path.pop(); 
  }

  return null;
}



 orderData(arbol: arbolPadreHijo[]){
     arbol?.sort((a,b)=>(a.label||"").localeCompare(b.label||""))
     for (const nodo of arbol){
        if(nodo.children){
          nodo.children=this.orderData(nodo.children)
        }   
     }
     return arbol
 }


 drop(event: CdkDragDrop<arbolPadreHijo[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
 
goTo(label: string)  {
  var parents=[]
  const nodo = this.findData(label);
  this.findParent(label);
  for (let key in this.actualParents) {
    let parent = this.actualParents[key];
    const node=document.getElementById(parent.label);
    let li=node?.querySelector('.nested') as HTMLElement;
    if(li.className!=='nested active'){
    li.classList.add('active')
    let span=node?.firstChild as HTMLElement
    if(span.className!=='spin'){
    span.classList.add('caret-down')
    const i=span.children
    i[1].textContent='keyboard_arrow_down'
  }
/*  const i = node?.firstChild as HTMLElement
    const icon=i.children
    icon[2].textContent='keyboard_arrow_down'
*/    
  }
  }  
   if(nodo?.label){
    const elem=document.getElementById(nodo?.label)
    if(elem){this.setSelectedItem(elem);elem.classList.add('highlight');
     setTimeout(()=>{
      elem.classList.remove('highlight')
     },1500)
    }
    }
}


toggle(event: Event) {
  var element= event.target as HTMLElement;
  const parentElement = element.parentElement?.parentElement;
  if(element.tagName==='SPAN'){} else{element = element.firstChild as HTMLElement;}
  if (parentElement) {
    const nestedElement = parentElement.querySelector('.nested') as HTMLElement;
    if (nestedElement) {
      nestedElement.classList.toggle('active');
      console.log(nestedElement)
    }
    element.classList.toggle('caret-down');
    console.log(element)
    const elementicon=element.nextElementSibling
    if(elementicon){
    elementicon.textContent = elementicon.textContent === 'keyboard_arrow_right' ? 'expand_more' : 'keyboard_arrow_right';}
  }
  }


  resize() {
    document.addEventListener('DOMContentLoaded',  () =>{
      const resizer = document.getElementById('resizer');
      if (!resizer || !resizer.parentElement) return;
    
      const navbar = resizer.previousElementSibling as HTMLElement;
      const tab = resizer.nextElementSibling as HTMLElement;
    
      let isResizing = false;
    
      resizer.addEventListener('mousedown',  (e) =>{
        isResizing = true;
        document.body.style.cursor = 'ew-resize';
        document.addEventListener('mousemove', (e:MouseEvent)=>{
          if (!isResizing) return;
          if(resizer){
          const containerWidth = resizer.parentElement?.getBoundingClientRect().width;
          if(containerWidth){
          const newNavbarWidth = (e.clientX / containerWidth) * 100;
          const newTabWidth = 100 - newNavbarWidth;
          if(parseInt(navbar.style.width)>2){
            this.isExpandedSide.next(true)
          }
          navbar.style.width = newNavbarWidth + 'vw';
          tab.style.width = newTabWidth + 'vw';
        }}
        });

        document.addEventListener('mouseup', onMouseUp);
      });
    
      function onMouseUp() {
        isResizing = false;
        document.body.style.cursor = 'default';
        document.removeEventListener('mouseup', onMouseUp);
      }
    });
  }    
}  


