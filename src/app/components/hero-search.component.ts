import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { HeroSearchService } from '../services/hero-search.service';
import { Hero } from '../models/hero';

@Component({
    selector: 'dd-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css'],
    providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {

    heroes: Observable<Hero[]>;
    private searchTerms: Subject<string> = new Subject<string>();

    constructor(
        private heroSearchService: HeroSearchService,
        private router: Router) {
    }

    search(term: string): void { // push a search term into the observable stream.
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.heroes = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                ? this.heroSearchService.search(term) // return the http search observable
                : Observable.of<Hero[]>([])) // or the observable of empty heroes if no search term
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }

}