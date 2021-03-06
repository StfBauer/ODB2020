# Microsoft 365 Developer Bootcamp 2020

https://my.n8d.at/M365BC

* [Microsoft 365 apps say farewell to Internet Explorer 11](https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-365-apps-say-farewell-to-internet-explorer-11-and/ba-p/1591666)
* [A Complete Guide to Flexbox - CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [A Complete Guide to CSS Grid - CSS Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/)
* [Custom properties (--*) - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
* [SharePoint grid and responsive design](https://docs.microsoft.com/en-us/sharepoint/dev/design/grid-and-responsive-design)
* [Build SharePoint / Fluent UI compliant grid from scratch - N8D](https://n8d.at/build-a-sharepoint-fluent-ui-compliant-grid-from-scratch/)
* [Develop SPFx web parts for different section designs using CSS - N8D](https://n8d.at/develop-spfx-web-parts-for-different-section-designs-using-css/)
* [Supporting section backgrounds](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/supporting-section-backgrounds)
* [How to fix Segoe UI font issue with SPFx and Microsoft Teams](https://n8d.at/how-to-fix-segoe-ui-font-issue-with-spfx-and-microsoft-teams/)
* [Make Fluent UI icon font work in Microsoft Teams](https://n8d.at/make-fluent-ui-icon-font-work-in-microsoft-teams/)

## Tools used

* [SharePoint Online Live Reload Application customizer released](https://n8d.at/sharepoint-online-live-reload-application-customizer-released/)
* [Make Livereload on SharePoint Online possible](https://n8d.at/make-livereload-on-sharepoint-online-possible/)


## Global dependencies

Requires Gulp globally installed:

```shell
npm install --global gulp
```

## Building the code

Download & install all dependencies, build, bundle & package the project

```shell
# download & install dependencies
npm install

# transpile all TypeScript & SCSS => JavaScript & CSS
gulp build

# create component bundle & manifest
gulp bundle

# create SharePoint package
gulp package-solution
```

These commands produce the following:

- **./lib**: intermediate-stage commonjs build artifacts
- **./dist**: bundled script, along with other resources
- **./temp/deploy**: all resources required by component(s) to deploy to a CDN (when `--ship` argument present)

## Build options

- `gulp clean`: Deletes all build output (**/dist**, **/lib**, **/temp**, etc.).
- `gulp build`: Transpiles all TypeScript & SCSS to JavaScript & CSS, generates source map files & TypeScript type declaration files
- `gulp bundle [--ship|-p|--production]`: Runs gulp task **build**, then uses webpack to create the JavaScript bundle(s) and component manifest(s) as defined in **./config/config.json**. The `--ship`, `-p` or `--production` argument specifies a production build that will generate minified bundles.
- `gulp serve [--ship|-p|--production]`: Runs gulp tasks **build**, **bundle** & starts the local webserver. Depending on the project type, it opens the browser and navigates to the local workbench or specified URL (in the case of extension components). The `--ship`, `-p` or `--production` argument specifies a production build that modifies the resulting package for production hosting rather than local hosting of assets.
- `gulp package-solution`: Creates the SharePoint Package (**.sppkg**) file.
- `gulp dist`: Creates a production-ready SharePoint Package (**.sppkg**) file. The following gulp task gets executed in this specific order `gulp clean`, `gulp bundle`, `gulp package-solution.`
- `gulp dev`: Creates a development-ready SharePoint Package (**.sppkg**) file. The following gulp task will be executed in this specific order `gulp clean`, `gulp bundle`, `gulp package-solution.`

> View all available gulp tasks by running `gulp --tasks`

More information on [SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)

Generated with [pnp/spfx](https://github.com/pnp/generator-spfx/).
