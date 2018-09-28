import firebase from 'firebase';
import firebaseui from 'firebaseui';

const _actionCodeSettings:any = {
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
const _config = {
  apiKey: 'AIzaSyBgwBKKnFovKtJJPUKwenS-AgQ59zwuhuk',
  authDomain: 'nac-admin.firebaseapp.com',
  databaseURL: 'https://nac-admin.firebaseio.com',
  projectId: 'nac-admin',
  storageBucket: 'nac-admin.appspot.com',
  messagingSenderId: '858334622417',
};

firebase.initializeApp(_config);
const _database = firebase.database();
const _auth = firebase.auth();
const _googleAuthProvider:any = new firebase.auth.GoogleAuthProvider();

console.log("init fire base");

export class Firebase {
  fb:any = firebase;
  fbui:any = firebaseui;
  db:any = _database;
  auth:any = _auth;
  googleAuthProvider:any = _googleAuthProvider;
  config:any = _config;
}
