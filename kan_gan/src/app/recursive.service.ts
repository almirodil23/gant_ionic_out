import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import data_tree_ from 'src/assets/data_tree.json';


interface arbolPadreHijo {
  label?: string;
  children?: arbolPadreHijo[];
}

@Injectable({
  providedIn: 'root'
})



export class RecursiveService {
  datos:any;
  data_tree=data_tree_
  private selectedItemSubject: BehaviorSubject<HTMLElement | null> = new BehaviorSubject<HTMLElement | null>(null);
  selectedItem$: Observable<HTMLElement | null> = this.selectedItemSubject.asObservable();
  private label:BehaviorSubject<string|null>= new BehaviorSubject<string|null>(null)
  selectedLabel$:Observable<string|null>=this.label.asObservable()




  setSelectedItem(element: HTMLElement) {
    const prevSelectedItem = this.selectedItemSubject.getValue();


    const text1=element.innerText
    let ind=0
    if(!text1.match('\n')?.index){let ind=text1.substring(0,text1.match('\n')?.index)}else{let text}
    let text=text1.substring(0,ind)
    this.label.next(text)

    if (prevSelectedItem) {
      prevSelectedItem.classList.remove('selected');
      prevSelectedItem.classList.add('caret');
    }
    element.classList.add('selected');
    this.selectedItemSubject.next(element);
  }

  getSelectedItem(): HTMLElement | null {
    return this.selectedItemSubject.getValue();
  }

  getData(){
    return this.data_tree
  }

  addData(zona:string,value:string){
     let nodo=this.findData(zona)
     if(nodo){
     if (!nodo.children){nodo.children=[]}
        nodo.children=[...nodo.children.concat({label:value})]}
      console.log(this.data_tree)   
  }

  removeData(zona:string){
    let nodo=this.findData(zona)
    if(nodo){
         delete nodo.children;
         delete nodo.label;
       console.log(this.data_tree)   
  }}


 findData (value: string,arbol?: arbolPadreHijo[]): arbolPadreHijo | null {
    for (const nodo of arbol||this.data_tree) {
        if (nodo.label === value) {
            return nodo;
        }
        if (nodo.children) {
            const foundInChildren = this.findData(value,nodo.children);
            if (foundInChildren) {
                this.label.next(value)
                return foundInChildren;
            }
        }
    }
    return null;
 } 


/*
findData(value:string){
  let a=data_tree.find(findData=>{findData.label==='Node 1'})
  if (a){return a}
  else{
    let a=data_tree.find(findData=>{findData.label==='Node 1'})
    return a
  }
} 
*/  
}
