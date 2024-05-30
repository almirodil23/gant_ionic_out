import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';  
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabComponent } from './tab/tab.component';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DxBulletModule, DxChartComponent, DxChartModule, DxDataGridModule, DxFormModule, DxPivotGridComponent, DxPivotGridModule, DxScrollViewModule, DxSortableModule, DxTemplateModule } from 'devextreme-angular';
import { RouteReuseStrategy } from '@angular/router';
import { KanbanComponent } from './kanban/kanban.component';
import { KanbanService } from './kanban.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TabComponent,
    KanbanComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    MatListModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatCheckboxModule,
    DragDropModule,
    CommonModule,DxBulletModule,
    DxDataGridModule,
    DxTemplateModule,
    ReactiveFormsModule,
    DxPivotGridModule,
    DxChartModule,
    DxFormModule,
    DxScrollViewModule,
    DxSortableModule,
    HttpClientModule

  
  ],
  providers: [KanbanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
