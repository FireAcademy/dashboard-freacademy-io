import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification
 } from 'firebase/auth';
import VerifyEmail from './components/VerifyEmail';
import LoadingIndicator from './components/LoadingIndicator';
import ForgotPassword from './components/ForgotPassword';
import PaymentSuccess from './components/PaymentSuccess';
import { Toaster } from 'react-hot-toast';

function App() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if(loading)
    return <LoadingIndicator />;

  if(!user)
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />}></Route>
          <Route exact path="/login" element={
            <Login signIn={(email, psw) => signInWithEmailAndPassword(auth, email, psw)
          } />}></Route>
          <Route exact path="/register" element={
            <Register signUp={(email, psw) => createUserWithEmailAndPassword(auth, email, psw).then((usrCred) => sendEmailVerification(usrCred.user))
          } />}></Route>
          <Route exact path="/forgot" element={
            <ForgotPassword resetPassword={(email) => sendPasswordResetEmail(auth, email)
            } />}></Route>
          <Route exact path="/success" element={<PaymentSuccess />}></Route>
          <Route path="*" element={<Navigate to="/login" />}></Route>
        </Routes>
      </BrowserRouter>
    );

  if(!user.emailVerified)
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/verify" element={
            <VerifyEmail
              refreshToken={() => auth.signOut()}
              resendVerificationEmail={() => sendEmailVerification(auth.currentUser)}
            />
          }></Route>
          <Route exact path="/success" element={<PaymentSuccess />}></Route>
          <Route path="*" element={<Navigate to="/verify" />}></Route>
        </Routes>
      </BrowserRouter>
    );

  return (
    <div className="wrapper">
      <Toaster position="top-center"/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/success" element={<PaymentSuccess />}></Route>
          <Route path="*" element={<Navigate to="/dashboard" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
