import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MyBehaviorSubject } from '../core/my-behavior-subject';
import { AppEvent } from './app-event';

@Injectable({
  providedIn: 'root'
})
export class AppEventService {
  AppEventBus: MyBehaviorSubject<AppEvent | undefined> = new MyBehaviorSubject<AppEvent | undefined>(undefined);
  constructor() { }
}
