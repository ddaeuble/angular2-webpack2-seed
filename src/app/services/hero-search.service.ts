import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Hero } from '../models/hero';
import { HeroService } from './hero.service';

@Injectable()
export class HeroSearchService {

    constructor(
        private http: Http,
        private heroService: HeroService) {
    }

    search(term: string): Observable<Hero[]> {
        return this.http
            .get(`${this.heroService.webApiUrl}/?name=${term}`)
            .map((r: Response) => r.json().data as Hero[]);
    }

}