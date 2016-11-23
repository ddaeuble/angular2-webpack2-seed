# angular2-webpack2-seed
A basic angular 2.x (ng2) with webpack 2.x project-setup / seed / starter.



## How-to
1. install Git: https://git-scm.com/downloads
2. install Node.js (npm): https://nodejs.org/en/download/
3. install Visual Studio Code: https://code.visualstudio.com/Download
4. test installed programms:
  * `git --version` command should be found
  * `npm -v` command should be found, npm-version should be >= 3.10
5. clone git repository (download project):
  * `cd "path/to/project/dir/parent"`
  * `git clone https://github.com/ddaeuble/angular2-webpack2-seed.git`
6. start Visual Studio Code and open newly-created project-dir
7. open command line, navigate inside your project-dir (if not using your IDE's command line) and install project-dependencies with npm:
  * `npm install`
8. start or build your application with:
  * `npm start` to start in browser or
  * `npm run build` to compile and export to the dist-folder



## Project structure

### Project setup/configuration
| file/folder                 | description |
|-----------------------------|-------------|
| `/package.json`             | project file / npm (node package manager) configuration - provides project meta, lists project dependencies, defines scripts (npm commands) for the build process (like pom.xml for Maven does) |
| `/tsconfig.json`            | TypeScript compiler configuration (how to generate pure JavaScript ES5 out of typescript-code in this project) -- in this project, the TypeScript compiler gets called by some specific loader-modules of webpack within the build process |
| `/webpack.config.js`        | Webpack configuration (JavaScript module bundler/packager) -- common part of dev- and prod-configuration |
| `/webpack.dev.config.js`    | Webpack configuration -- used for compiling and building, starting a development-webserver and opening it in a browser |
| `/webpack.prod.config.js`   | Webpack configuration -- used for creating productive builds (stored in dist-folder) |
| `/tslint.json`              | TSLint configuration -- used by the Visual Studio Code extension for checking the code quality (linting) |
| `/.editorconfig`            | Visual Studio Code configuration |
| *`/.vscode/`*               | Visual Studio Code configuration |
| `/.gitignore`               | Git configuration: don't manage downloaded dependency-files (node_modules-folder), auto-generated files our own build (dist-folder) or npm-log-files (npm-debug.log) |
| *`/.git/`*                  | Git repository (versioning) |
| `/README.md`                | this readme-file |
| `/LICENSE`                  | the MIT-license-file |

### Application setup/configuration
| file/folder                 | description |
|-----------------------------|-------------|
| `/src/public/index.html`    | entry point that embeds the app-, vendor- and polyfills-bundles as a simple static webpage for the browser |
| `/src/main.ts`              | entry point/initialization of the platform in which the application runs -> app-bundle |
| `/src/vendor.ts`            | index-file collecting all vendor-imports so webpack can generate an extra vendor-bundle besides our app-bundle with (only) our own sourcecode ; how it works: webpack analyzes our code for import-statements and if an import is used in both bundles (app and vendor), that import/chunk will be extracted/linked and copied to the vendor-bundle only |
| `/src/polyfills.ts`         | index-file collecting all polyfills-imports so webpack can generate an extra polyfills-bundle besides our app- and our vendor-bundle |
| `/src/custom-typings.d.ts`  | custom type definitions for the TypeScript compiler: as you want to use third-party libraries that are only available as JavaScript (no @types-declarations provided) or there are some implicitely-available variables, you must declare those functions/variables manually so the TypeScript compiler can recognize them in your code and doesn't throw errors |
| *`/src/public/`*            | all static content to be delivered directly to the productive environment (subfolder-structure will stay the same) such as images, extra style- and script-files, favicon.ico, robots.txt, ... |

### Application source code
| file/folder                 | description |
|-----------------------------|-------------|
| *`/src/app/`*               | actual code of our application |
| `/src/app/app.module.ts`    | entry point/initialization of the application |
| `/src/app/app.component.ts` | root component of the app combining all other components as a DOM-tree (or by a placeholder 'router-outlet') |
| *`/src/app/components/`*    | parts/components of our application (customly combined html-elements together with related styles and event-handling code) |
| *`/src/app/views/`*         | pages/views of our application (combined components that represent a complete page) |
| *`/src/app/services/`*      | code/functions that are "independent" of our visible part of the application (but used by those views/components) such as REST-clients (data-access) or complex calculation/data processing |
| *`/src/app/models/`*        | datamodel-classes shared by our services and our views/components |

### Generated/downloaded dependencies, build- and log-files
| file/folder                 | description |
|-----------------------------|-------------|
| *`/node_modules/`*          | local copy of all dependencies used in the project (see package.json) |
| *`/dist/`*                  | final build of our project, ready for deploying on our production server |
| `/npm-debug.log`            | log-file of npm (if something goes wrong while running npm-scripts) |



## npm cli-commands
* `npm init`                                *create package.json (initialize project) with a cmd-dialog*
* `npm init -f`                             *create package.json (initialize project) with default values*
* **`npm install`**                         **download all dependencies defined in package.json to the node_modules-folder**
* `npm update`                              *update all dependencies defined in package.json*
* **`npm install <module> --save-dev`**     download and install a new dependency to node_modules-folder and save it in package.json (devDependencies)
* `npm i -D <module> <module2> ...`         *(short form of above)*
* **`npm install <module> --save`**         download and install a new dependency to node_modules-folder and save it in package.json (dependencies)
* `npm i -S <module> <module2> ...`         *(short form of above)*
* **`npm run <script>`**                    **run a specific script from package.json over npm**
* `npm run <script> -- <param1> <param2>`   *run a specific script from package.json over npm and add the given params*
* `npm start`                               *(short form of `npm run start`)*



## npm scripts
* `npm run start`       compile and bundle the project in dev-mode with hot-module-replacement (reload parts of the page just when editing and saving code in the IDE), deploy it on a dev-server and start the app in the default-browser
* `npm run build`       compile and bundle the project in prod-mode to the dist-folder
* `npm run build:watch` same as above + automatically recompile on file-changes
* `npm run test`        (not implemented yet) start automatic testing



## use TSLint in Visual Studio Code
* install package `tslint` with npm (as dev-dependency)
* create `tslint.json` (config file)
* install and activate Visual Studio Code extension `TSLint 0.5.40`



## Tutorials and documentation:

### Official tutorials
* https://angular.io/docs/ts/latest/quickstart.html
* https://angular.io/docs/ts/latest/tutorial/

### Official guides
* https://angular.io/docs/ts/latest/guide/
* https://angular.io/docs/ts/latest/guide/cheatsheet.html

### More tutorials
* https://www.video2brain.com/de/videotraining/angularjs-2-0-grundlagen
* https://angularjs.de/artikel/angular2-tutorial-deutsch

### Webpack
* https://www.softwarearchitekt.at/post/2016/01/02/webpack-und-angular-2-module-loading-und-build-workflows-ohne-stress-und-kopfzerbrechen.aspx
* https://semaphoreci.com/community/tutorials/setting-up-angular-2-with-webpack
* https://github.com/gonzofish/semaphore-ng2-webpack
* https://angular.io/docs/ts/latest/guide/webpack.html
* https://github.com/angular/angular2-seed
* https://github.com/AngularClass/angular2-webpack-starter
* https://github.com/manfredsteyer/angular2-beta0-webpack-demo
* https://github.com/datatypevoid/ng2-mean-webpack
* https://github.com/qdouble/angular-webpack2-starter
* https://webpack.github.io/docs/tutorials/getting-started/
* https://webpack.github.io/docs/configuration.html
* https://webpack.github.io/docs/list-of-plugins.html
* https://github.com/webpack/docs/wiki/optimization
* http://www.pro-react.com/materials/appendixA/
* https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.9c6jipcnl
* https://github.com/webpack/html-loader/issues/17
* http://javascriptplayground.com/blog/2016/10/moving-to-webpack-2/
* https://webpack.js.org/how-to/upgrade-from-webpack-1/
* https://webpack.js.org/configuration/
* https://webpack.js.org/configuration/resolve/
* https://github.com/AngularClass/angular2-hmr
* https://github.com/AngularClass/angular2-hmr-loader
* https://teropa.info/blog/2016/08/08/angular-2-hot-loading-with-ngrx-store-and-webpack.html
* https://www.npmjs.com/package/angular2-hmr
* https://webpack.github.io/docs/code-splitting.html

### Special topics
* https://confluence.atlassian.com/bitbucketserver/markdown-syntax-guide-776639995.html
* https://angular.io/docs/ts/latest/guide/style-guide.html
* https://angular.io/docs/ts/latest/guide/server-communication.html
* https://css-tricks.com/lets-learn-es2015/
* http://bytearcher.com/articles/semver-explained-why-theres-a-caret-in-my-package-json/
* https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
* https://www.typescriptlang.org/docs/handbook/compiler-options.html
* https://www.bennadel.com/blog/3169-adding-custom-typings-files-d-ts-in-an-angular-2-typescript-application.htm
* https://palantir.github.io/tslint/rules/
* https://github.com/mgechev/codelyzer