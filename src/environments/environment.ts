// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const packageJson = require('../../package.json');

export const environment = {
  appName: 'The Large Hadron Recycler',
  envName: 'DEV',
  production: false,
  test: false,
  i18nPrefix: '',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  },
  config: {
    apiKey: 'AIzaSyB1vgTbf3WJteXH-PA0db_7IA-RvftMEZM',
    authDomain: 'local-dimension-216523.firebaseapp.com',
    databaseURL: 'https://local-dimension-216523.firebaseio.com',
    projectId: 'local-dimension-216523',
    storageBucket: 'local-dimension-216523.appspot.com',
    messagingSenderId: '292653294241',
    visionToken: 'ya29.c.EloaBgBXF1DV9K-p5wE9IZg5Qk0ZqvYqpDJdatkj33PCVm034VS7dpjpZGIPFCIUgIG2BhOKfkyMIR0BRCEkAywbOhBDrBPOjXSRIWiDdOypbVBjy_rWWl8D7j8'
  }
};
