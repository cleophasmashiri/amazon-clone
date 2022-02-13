import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { FirestoreProvider } from '@react-firebase/firestore';
import { CometChat } from '@cometchat-pro/chat';
import firebase from 'firebase';
import {firebaseConfig} from './firebaseConfig';

const appSettings = new CometChat.AppSettingsBuilder()
.subscribePresenceForAllUsers()
.setRegion(process.env.REACT_APP_COMETCHAT_REGION)
.build();

CometChat.init(process.env.REACT_APP_COMETCHAT_APP_ID, appSettings)
.then(() => {
  console.log('CometChat Init done');
  ReactDOM.render(
    <React.StrictMode>
      <FirestoreProvider {...firebaseConfig} firebase={firebase}>
        <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
          <App /> 
        </FirebaseAuthProvider>
      </FirestoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
},
(err) => {
  console.log('CometChat Init error', err);
});



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
