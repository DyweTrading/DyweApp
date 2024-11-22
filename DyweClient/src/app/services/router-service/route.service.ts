import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  public currentRoute: string = '';

  constructor() {}

  set setCurrentRoute(str: string) {
    this.currentRoute = str;
    return;
  }

  get getCurrentRoute() {
    return this.currentRoute;
  }
}
