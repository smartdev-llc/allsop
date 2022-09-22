import { Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyBehaviorSubject, MySubject } from './my-behavior-subject';

@Component({
  template: ''
})
export class UnSubableComponent implements OnDestroy, OnChanges {
  UnSub: Subject<void> = new Subject<void>();
  Env = environment;
  OnChanges$: MySubject<SimpleChanges> = new MySubject<SimpleChanges>();
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.OnChanges$.onChanged(changes);
  }

  ngOnDestroy(): void {
    this.UnSub.next();
    this.UnSub.complete();
  }
}
