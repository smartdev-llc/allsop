import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NGXLogger } from "ngx-logger";
import { AppEventService } from "../services/app-event.service";
import { StoreProviderService } from "../store/reducers/store-provider.service";
import { GlobalAppData } from "./global-app-data";
import { UnSubableComponent } from "./unsubable.component";

@Component({
  template: ''
})
export class BaseComponent extends UnSubableComponent implements OnInit {

  protected Logger: NGXLogger;
  protected Router: Router;
  protected Store: StoreProviderService;
  protected AppEvent: AppEventService;
  constructor() {
    super();
    this.Logger = GlobalAppData.AppInjector!.get(NGXLogger);
    this.Router = GlobalAppData.AppInjector!.get(Router);
    this.Store = GlobalAppData.AppInjector!.get(StoreProviderService);
    this.AppEvent = GlobalAppData.AppInjector!.get(AppEventService);
  }
  ngOnInit(): void {
  }
}