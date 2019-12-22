// Firebase App (the core Firebase SDK) is always required and must be listed first
const firebase = require('firebase');

exports.signUp = async (email, pass, name) => {
  console.log('creating user');
  const successVal = await firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((newUser) => ({
      status: 'success',
      user: newUser,
    }))
    .catch((error) => ({
      status: 'failure',
      message: error.message,
    }));

  if (successVal.status === 'success') {
    const { uid } = successVal.user.user;
    firebase.database().ref(`users/${uid}`).set({
      name,
      todos: [],
    });
  }
  console.log(successVal);
  return successVal;
};

exports.signIn = async (email, pass) => {
  console.log('im signing in');
  const successVal = await firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => ({
      status: 'success',
    }))
    .catch((error) => ({
      status: 'failure',
      message: error.message,
    }));
  return successVal;
};


exports.signOut = async () => {
  console.log('im signing out');
  const successVal = await firebase.auth.signOut()
    .then(() => ({
      status: 'success',
    })).catch((error) => ({
      status: 'failure',
      message: error.message,
    }));
  console.log(successVal);
  return successVal;
};

exports.getCurrentUser = async () => {
  const currUser = firebase.auth().currentUser;

  if (currUser) {
    return ({
      status: 'success',
      user: currUser,
    });
  }
  return ({
    status: 'failure',
    message: 'no user signed in',
  });
};

// exports.addTodo() = async () => {
//   const currUser = firebase.auth().currentUser;

//   console.log(currUser);
// }


// sign up
// sign in
// sign out
// checked signed in
// add todo for current user
// mark todo for user as completed
// change due date of todo
// get todos
