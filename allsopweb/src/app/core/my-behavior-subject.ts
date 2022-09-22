import { Subject, BehaviorSubject, Observable } from 'rxjs';

export class MyBehaviorSubject<T> {
  private subject: BehaviorSubject<T>;
  constructor(data: T) {
    this.subject = new BehaviorSubject<T>(data);
    this.observable = this.subject.asObservable();
  }

  observable: Observable<T>;
  onChanged(data: T) {
    this.subject.next(data);
  }
}


export class MySubject<T> {
  private subject: Subject<T>;
  constructor() {
    this.subject = new Subject<T>();
    this.observable = this.subject.asObservable();
  }

  observable: Observable<T>;
  onChanged(data: T) {
    this.subject.next(data);
  }
}