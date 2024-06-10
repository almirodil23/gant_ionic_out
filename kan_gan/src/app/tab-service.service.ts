import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private showWelcomeMessageSubject = new BehaviorSubject<boolean>(true);
  public showWelcomeMessage$: Observable<boolean> = this.showWelcomeMessageSubject.asObservable();

  private newTabSubject = new BehaviorSubject<boolean>(false);

  private history = new Subject<any>();

  constructor() {}

  welcome(): void {
    this.showWelcomeMessageSubject.next(false);
  }

  showWelcome(): Observable<boolean> {
    return this.showWelcomeMessage$;
  }

  openNewTab(data: any): void {
    this.newTabSubject.next(data);
  }

  getNewTabObservable(): Observable<any> {
    return this.newTabSubject.asObservable();
  }

  setMenuState(menu: string, data: any) {
    localStorage.setItem(menu, JSON.stringify(data));
    let tab = { menu, data };
    this.history.next(tab);
  }

  getStates(): Observable<any> {
    return this.history.asObservable();
  }

  getMenuState(menu: string): boolean {
    const state = localStorage.getItem(menu);
    return state ? JSON.parse(state) : false;
  }
}
