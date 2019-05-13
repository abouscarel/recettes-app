import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDmkD5fnLDvx8gjd4iROuRwcVmtjzhPKW4",
  authDomain: "recettes-app-cf999.firebaseapp.com",
  databaseURL: "https://recettes-app-cf999.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base
