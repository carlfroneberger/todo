// Firebase App (the core Firebase SDK) is always required and must be listed first
const firebase = require('firebase');

exports.signUp = async (email, pass) => {
  console.log('creating user');
  const successVal = await firebase.auth().createUserWithEmailAndPassword(email, pass)
    .catch((error) => {
      const errorMessage = error.message;
      return ({
        status: 'failure',
        message: errorMessage,
      });
    });
    return successVal;
};

exports.sayHello = () => {
  console.log('hello');
};


// sign up
// sign in
// sign out
// checked signed in
// add todo for current user
// mark todo for user as completed
// change due date of todo