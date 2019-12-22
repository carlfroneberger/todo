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

exports.addTodo = async (todo, year, month, day) => {
  const { uid } = (await firebase.auth().currentUser);
  const userTodos = firebase.database().ref(`/users/${uid}/todos`);
  const newTodo = await userTodos.push();

  newTodo.set({
    todo,
    dueDate: `${year}-${month}-${day}`,
    completed: false,
  });

  return newTodo.key;
};

exports.getTodos = async () => {
  const { uid } = (await firebase.auth().currentUser);
  return firebase.database().ref(`/users/${uid}/todos`).once('value')
    .then(((snapshot) => {
      console.log(snapshot.val());
      return snapshot.val();
    }));
};

exports.updateTodo = async (todoUid, todo, year, month, day, completed) => {
  const { uid } = (await firebase.auth().currentUser);
  console.log(uid);
  const currTodo = firebase.database().ref(`/users/${uid}/todos/${todoUid}`);
  currTodo.set({
    todo,
    dueDate: `${year}-${month}-${day}`,
    completed,
  });
};
