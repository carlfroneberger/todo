// Firebase App (the core Firebase SDK) is always required and must be listed first
const firebase = require('firebase');

// signs up a user with email, pass, and name
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
  return successVal;
};

// signs in a user with email and pass
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

// signs out user
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

// gets object of current user if signed in
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

// adds a todo for the current user
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

// gets the todos for the current user
exports.getTodos = async () => {
  const { uid } = (await firebase.auth().currentUser);
  return firebase.database().ref(`/users/${uid}/todos`).once('value')
    .then(((snapshot) => {
      console.log(snapshot.val());
      return snapshot.val();
    }));
};

// changes the todo for the current user
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
