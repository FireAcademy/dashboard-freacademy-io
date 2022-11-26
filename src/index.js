import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from "firebase/app";

import 'bootstrap/dist/css/bootstrap.min.css';

const firebaseConfig = {
  apiKey: "AIzaSyDGsuk_eyl3wI8YUNvNcGjdWnzzhycAVUg",
  authDomain: "fireacademy-3329e.firebaseapp.com",
  projectId: "fireacademy-3329e",
  storageBucket: "fireacademy-3329e.appspot.com",
  messagingSenderId: "687034727573",
  appId: "1:687034727573:web:e3f923fe63bfee0c662f9c"
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
