import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/entities/category';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-category-name',
  templateUrl: './category-name.component.html',
  styleUrls: ['./category-name.component.scss']
})
export class CategoryNameComponent extends BaseComponent {

  @Input() id?: string;
  category$: Observable<Category | undefined> = of(undefined);
  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.category$ = this.Store?.CategoryStore.getById(this.id!.toString())!;
  }

}
