import firebase from 'firebase';
import firebaseui from 'firebaseui';

// const config = {
//   apiKey: 'AIzaSyBgwBKKnFovKtJJPUKwenS-AgQ59zwuhuk',
//   authDomain: 'nac-admin.firebaseapp.com',
//   databaseURL: 'https://nac-admin.firebaseio.com',
//   projectId: 'nac-admin',
//   storageBucket: 'nac-admin.appspot.com',
//   messagingSenderId: '858334622417',
// };
// firebase.initializeApp(config);
// const database = firebase.database();
// const auth = firebase.auth();
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// const actionCodeSettings = {
//   url: 'https://nac-admin.firebaseio.com/finishSignUp',
//   handleCodeInApp: true,
//   iOS: {
//     bundleId: 'com.nac-admin.firebaseio.ios'
//   },
//   android: {
//     packageName: 'com.nac-admin.firebaseio.android',
//     installApp: true,
//     minimumVersion: '12'
//   }
// };

class Firebase {
  firebase:any = firebase;
  firebaseui:any = firebaseui;
  database:any;
  auth:any;
  googleAuthProvider:any = new firebase.auth.GoogleAuthProvider();
  actionCodeSettings:Object = {
    url: 'https://nac-admin.firebaseio.com/finishSignUp',
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.nac-admin.firebaseio.ios'
    },
    android: {
      packageName: 'com.nac-admin.firebaseio.android',
      installApp: true,
      minimumVersion: '12'
    }
  }
  config:any = {
    apiKey: 'AIzaSyBgwBKKnFovKtJJPUKwenS-AgQ59zwuhuk',
    authDomain: 'nac-admin.firebaseapp.com',
    databaseURL: 'https://nac-admin.firebaseio.com',
    projectId: 'nac-admin',
    storageBucket: 'nac-admin.appspot.com',
    messagingSenderId: '858334622417',
  };
  init(){
    this.firebase.initializeApp(this.config);
    this.database = firebase.database();
    this.auth = firebase.auth();
  }
}
export const F = new Firebase();

