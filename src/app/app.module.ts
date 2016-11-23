import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard.component';
import { HeroesComponent } from './views/heroes.component';
import { HeroDetailComponent } from './views/hero-detail.component';
import { HeroSearchComponent } from './components/hero-search.component';
import { HeroService } from './services/hero.service';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryHeroService } from './services/hero-in-memory.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryHeroService)
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent
  ],
  providers: [
    HeroService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

    constructor(public appRef: ApplicationRef) {
    }

    /* Handle HMR operations */
    hmrOnInit(store: any) {
        if (!store || !store.state) {
            return;
        }
        // TODO restore state by dispatch an action to the application's store
        if ('restoreInputValues' in store) {
            store.restoreInputValues();
        }
        this.appRef.tick();
        Object.keys(store).forEach(prop => delete store[prop]);
    }
    hmrOnDestroy(store: any) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        store.disposeOldHosts = createNewHosts(cmpLocation);
        store.restoreInputValues = createInputTransfer();
        removeNgStyles();
    }
    hmrAfterDestroy(store: any) {
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }

}