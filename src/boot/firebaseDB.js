// import something here
import VueFirestore from 'vue-firestore'
import firebase from 'firebase'


require('firebase/firestore')

var config = {
  apiKey: 'AIzaSyA9olkTaRj33Xi7TatKz9DUC-Bg0Wn2quE',
  authDomain: 'batch24-1e251.firebaseapp.com',
  databaseURL: 'https://batch24-1e251.firebaseio.com',
  projectId: 'batch24-1e251',
  storageBucket: 'batch24-1e251.appspot.com',
  messagingSenderId: '999772292939',
  appId: '1:999772292939:web:822d779c7a924f1fcd8ace'
}

firebase.initializeApp(config)

// "async" is optional
export default async ({router, Vue}) => {
  // something to do
  Vue.prototype.$firebaseApp = firebase
  Vue.prototype.$firestoreApp = firebase.firestore()
  Vue.use(VueFirestore)
}
