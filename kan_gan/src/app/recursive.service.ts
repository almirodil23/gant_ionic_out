import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import data_tree_ from 'src/assets/data_tree.json';


interface arbolPadreHijo {
  label: string;
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

  setSelectedItem(element: HTMLElement) {
    const prevSelectedItem = this.selectedItemSubject.getValue();
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

  addData(){
  
  }


 findData (value: string,arbol?: arbolPadreHijo[]): arbolPadreHijo | null {
    for (const nodo of arbol||this.data_tree) {
        if (nodo.label === value) {
            return nodo;
        }
        if (nodo.children) {
            const foundInChildren = this.findData(value,nodo.children);
            if (foundInChildren) {
              if (!foundInChildren.children){
              foundInChildren.children=[]}
              foundInChildren.children=[...foundInChildren.children.concat({label:'new'})]
                console.log(foundInChildren)
                console.log(this.data_tree)
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
