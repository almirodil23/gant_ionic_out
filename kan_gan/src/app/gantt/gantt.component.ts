import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskClickEvent } from 'devextreme/ui/gantt';
import { GanttService, Task } from './gantt.service';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss'],
})
export class GanttComponent {
  tasks: Task[] = [];
  fechaComienzo: Date = new Date('2030-01-01');
  fechaFinal: Date = new Date('1970-01-01');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ganttService: GanttService,
  ) {
    this.tasks = ganttService.getProyectos();
    for (let task of this.tasks) {
      if (task.start) {
        if (task.start < this.fechaComienzo) {
          this.fechaComienzo.setTime(task.start.getTime() - 86400000);
        }
      }
      if (task.end) {
        if (task.end > this.fechaFinal) {
          this.fechaFinal.setTime(task.end.getTime() + 86400000);
        }
      }
    }
  }

  getTaskColor(taskId: number) {
    const color = taskId % 7;
    return `custom-task-color-${color}`;
  }

  evitarAccion(event: any) {
    event.cancel = true;
  }

  verProyecto(event: TaskClickEvent) {
    if (event.data.start) {
      let nombreProyecto = this.tasks.find((x) => x.id == event.data.parentId)?.title;
      this.router.navigate(['grafico/' + nombreProyecto?.toLowerCase()], { relativeTo: this.route });
    }
  }
}
