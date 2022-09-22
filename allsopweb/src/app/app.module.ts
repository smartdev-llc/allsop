import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { GlobalAppData } from './core/global-app-data';
import { ProductListItemComponent } from './core/component/product-list-item/product-list-item.component';
import { CategoryNameComponent } from './core/component/category-name/category-name.component';
import { CardComponent } from './components/card/card.component';
import { ProductNameComponent } from './core/component/product-name/product-name.component';
import { ProductPriceComponent } from './core/component/product-price/product-price.component';
import { CartItemTotalComponent } from './core/component/cart-item-total/cart-item-total.component';
import { CardTotalComponent } from './core/component/card-total/card-total.component';
import { CategoryNameByProductComponent } from './core/component/category-name-by-product/category-name-by-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartItemCountComponent } from './core/component/cart-item-count/cart-item-count.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListItemComponent,
    CategoryNameComponent,
    CardComponent,
    ProductNameComponent,
    ProductPriceComponent,
    CartItemTotalComponent,
    CardTotalComponent,
    CategoryNameByProductComponent,
    CartItemCountComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    LoggerModule.forRoot({
      // serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      enableSourceMaps: true,
    }),
    StoreModule.forRoot(rootReducer),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Call this on lazy load modules too
  constructor(private injector: Injector) {
    GlobalAppData.AppInjector = this.injector;
  }
}
