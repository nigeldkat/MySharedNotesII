// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,  
  firebase: {
    apiKey: "AIzaSyC7F8qExWo27s80QcvoPBf1_vRDCN2lNRQ",
    authDomain: "my-shared-notelist.firebaseapp.com",
    databaseURL: "https://my-shared-notelist.firebaseio.com",
    projectId: "my-shared-notelist",
    storageBucket: "my-shared-notelist.appspot.com",
    messagingSenderId: "288557134183"
  }
  
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
