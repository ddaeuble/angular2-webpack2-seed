import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Hero } from '../models/hero';

@Injectable()
export class HeroService {

    webApiUrl: string = 'app/inMemoryHeroes'; // see 'let inMemoryHeroes = [...]' in 'hero-in-memory.service.ts'
    private headers: Headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(
        private http: Http) {
    }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.webApiUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    getHero(heroId: number): Promise<Hero> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === heroId));
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.webApiUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.webApiUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.webApiUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}