// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';

exports.createUser = (email, pass) => {
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .catch((error) => {
      const errorMessage = error.message;
      return ({
        status: 'failure',
        message: errorMessage,
      });
    });
};

exports.sayHello = () => {
  console.log('hello');
};
