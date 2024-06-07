import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private _state: any = {};

  setEstado(key: string, value: any): void {
    this._state[key] = value;
  }

  getEstado(key: string): any {
    return this._state[key];
  }

  clearEstado(key: string): void {
    delete this._state[key];
  }
}
