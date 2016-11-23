import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { bootloader } from '@angularclass/hmr';

import { AppModule } from './app/app.module';

function main() {
    platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.error(err));
}

if (process.env.NODE_ENV === 'production') { // set by webpack param '-p' (previously by webpack-define-plugin)
    enableProdMode();
    main();
} else {
    bootloader(main); // lets HMR wait until the document/page is ready (event DOMContentLoaded)
}