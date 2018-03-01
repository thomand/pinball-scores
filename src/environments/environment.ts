// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyA5GsCuf5nlG_5F5XB5KVaHB3YsjdvDv1U',
    authDomain: 'pinball-scores.firebaseapp.com',
    databaseURL: 'https://pinball-scores.firebaseio.com',
    projectId: 'pinball-scores',
    storageBucket: 'pinball-scores.appspot.com',
    messagingSenderId: '686478307977'
  }
};
