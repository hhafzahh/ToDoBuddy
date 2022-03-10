// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // add firebase config 
  firebase:{
    apiKey: "AIzaSyDNV6qNE-udVn0l5BtxvWBKErnMp3YUNS4",
    authDomain: "todobuddyapp.firebaseapp.com",
    databaseURL: "https://todobuddyapp-default-rtdb.firebaseio.com",
    projectId: "todobuddyapp",
    storageBucket: "todobuddyapp.appspot.com",
    messagingSenderId: "931542018563",
    appId: "1:931542018563:web:a7ea9bd5f4e307495cbc36",
    measurementId: "G-TF96WMXFQ7"
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
