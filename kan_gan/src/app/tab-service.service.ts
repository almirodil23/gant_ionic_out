import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private showWelcomeMessageSubject = new BehaviorSubject<boolean>(true);
  public showWelcomeMessage$: Observable<boolean> = this.showWelcomeMessageSubject.asObservable();


  private newTabSubject = new BehaviorSubject<boolean>(false);
   
  constructor() { }

  welcome(): void{
    this.showWelcomeMessageSubject.next(false);
  }

  showWelcome(): Observable<boolean> {
    return this.showWelcomeMessage$
  }

  openNewTab(data:any): void {
    this.newTabSubject.next(data);
  }

  getNewTabObservable(): Observable<any> {
    return this.newTabSubject.asObservable();
  }
}
