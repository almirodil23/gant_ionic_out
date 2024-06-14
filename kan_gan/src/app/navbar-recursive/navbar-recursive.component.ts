import { Component, Input, OnInit } from '@angular/core';
import data_tree from 'src/assets/data_tree.json';
import { RecursiveService } from '../recursive.service';
import { waitForAsync } from '@angular/core/testing';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TabService } from '../tab-service.service';
import { Router } from '@angular/router';



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



Form!: FormGroup;
keys:any
showRestaurarSubmenu: boolean = false;
isShowing = false;
isExpandedSide = true;
isExpanded = true;
selectedItem:any;
state:number=0;
node:any;
menuData: arbolPadreHijo[];
results:any=['...']


      
      constructor(private recursiveService: RecursiveService, private tabService: TabService, private router:Router) 
      
      {
    this.selectedItem = this.recursiveService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
    })
    this.node= this.recursiveService.selectedLabel$.subscribe(item=>{
      this.node=item;
    })
      this.menuData=recursiveService.getData()

        this.Form = new FormGroup({
        texto: new FormControl('')
      });
  
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



    closeAlert(){
      const form=document.getElementById('drag')
      form?.classList.remove('eliminarshown1')
    }

    abrirTab(){
      this.tabService.openNewTab({ label: this.selectedItem.label, content: 'nada a declarar' });
      setTimeout(() => {
        this.router.navigate(['form']);
      }, 100);
    }

 async addHijo(event:Event){
    const input=document.createElement("input")
    input.type = "text";
    const parrafo=document.createElement("p")
    parrafo.appendChild(input)
    this.selectedItem.appendChild(parrafo)
    input.focus()


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
}


async buscar() {
  /*fallo al pulsar la lupa 3 veces seguidas, a la tercera no muesta contenido, hay que rastrear para ver por qué sucede */
  const form = document.getElementById('input');

  form?.classList.add('inputshown');
  this.Form.controls['texto'].setValue('');

  const clickOutsideHandler = (event: MouseEvent) => {
      const formElement = document.getElementsByClassName('find')[0];
      if (formElement && !formElement.contains(event.target as Node)) {
        form?.classList.remove('inputshown');
        this.Form.reset();
        this.results = ['...'];
        document.removeEventListener('click', clickOutsideHandler);
   
      }
    };
    setTimeout(() => {
      document.addEventListener('click', clickOutsideHandler);
    }, 100);
  

  const valueChangesSubscription = this.Form.controls['texto'].valueChanges.subscribe(async (value) => {
    const result1 = await this.recursiveService.findData(value);
    let child: string[] = [];
    let finded: HTMLCollectionOf<Element>;
    let k = -1;

    if (result1) {
      if (result1.children) {
        for (let a = 0; a < result1.children.length; a++) {
          const label = result1.children[a].label;
          if (label) {
            child.push(label);
          }
        }
      }

      const result = `${result1.label} --> ${child}...`;
      this.results = [];
      this.results.push(result);
      finded = document.getElementsByClassName('form-select');

      const respuesta = await new Promise<string>((resolve) => {
        const bajarTecla = (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            resolve(this.Form.controls['texto'].value);
            document.removeEventListener('keydown', bajarTecla);
            if (result1.label) {
              this.recursiveService.goTo(result1.label);
            }
              this.Form.reset();
              this.results = ['...'];
              const form = document.getElementById('input');
              form?.classList.remove('inputshown');
              document.removeEventListener('click',clickOutsideHandler)
            
          }
          if (event.key === 'ArrowDown') {
            k = (k + 1) % finded.length;
            try {
              finded[k].classList.add('select-hover');
            } catch (error) {
              console.error(error);
            }
          }
          if (event.key === 'ArrowUp') {
            finded[k].classList.remove('select-hover');
            k -= 1;
          }
        };
        document.addEventListener('keydown', bajarTecla);
      });
    }
  });
}

}