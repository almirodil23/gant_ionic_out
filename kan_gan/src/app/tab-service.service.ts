import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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

  private tabHtmlStates: { [key: string]: string } = {};

  saveTabHtml(tabId: string, html: string) {
    this.tabHtmlStates[tabId] = html;
  }

  getTabHtml(tabId: string): string {
    return this.tabHtmlStates[tabId];
  }

  removeTabHtml(tabId: string) {
    delete this.tabHtmlStates[tabId];
  }
}
