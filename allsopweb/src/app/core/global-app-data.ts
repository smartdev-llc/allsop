import { Injector, NgModule } from '@angular/core';
export interface IGlobalAppData {
  AppInjector: Injector | undefined;
};

export const GlobalAppData: IGlobalAppData = {
  AppInjector: undefined,
};