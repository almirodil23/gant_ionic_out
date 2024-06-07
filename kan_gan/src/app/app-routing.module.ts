import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { TabComponent } from './tab/tab.component';
import { KanbanComponent } from './kanban/kanban.component';
import { GanttComponent } from './gantt/gantt.component';
import { GraficoComponent } from './grafico/grafico.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [ 
{path:'', component:HomeComponent,},
{path: 'kanban/:i', component: KanbanComponent, runGuardsAndResolvers: 'always'},
{path:'form',component:FormComponent},
{path:'gant', component:GanttComponent},
{path:"gant/grafico/:nP", component:GraficoComponent, runGuardsAndResolvers: 'always'},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

