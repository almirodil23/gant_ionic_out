import { Component, ViewChild,  } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TabService } from '../tab-service.service';
import { Route, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  data: any;
  tabs = [];
  selected = new FormControl(0);
  selectedTab: number | null = null;
  selectAfterAdding: HTMLInputElement | undefined; 
  private selection = new SelectionModel();
  showWelcomeMessage = true; 

  @ViewChild('sidenav') sidenav!: MatSidenavModule;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(private tabService: TabService,private router: Router) {
     
  }

  openNewTabWithData(i:number): void {
    this.tabService.welcome();
    const data = { label:'Estado', content:'Hola' };
    this.tabService.openNewTab(data);
    if (i==0){this.router.navigate(['./kanban',i]);}
    if (i==1){this.router.navigate(['./proovedores'])}


  }




  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }
  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}