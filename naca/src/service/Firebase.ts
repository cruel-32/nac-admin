import firebase from 'firebase';

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
const config = {
  apiKey: 'AIzaSyBgwBKKnFovKtJJPUKwenS-AgQ59zwuhuk',
  authDomain: 'nac-admin.firebaseapp.com',
  databaseURL: 'https://nac-admin.firebaseio.com',
  projectId: 'nac-admin',
  storageBucket: 'nac-admin.appspot.com',
  messagingSenderId: '858334622417',
};

firebase.initializeApp(config);
const database = firebase.database();
const auth = firebase.auth();
const googleAuthProvider:any = new firebase.auth.GoogleAuthProvider();

export const Firebase = {
  firebase,
  database,
  auth,
  googleAuthProvider,
  config
}