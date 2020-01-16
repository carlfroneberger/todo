// Firebase App (the core Firebase SDK) is always required and must be listed first
const firebase = require('firebase');

// signs up a user with email, pass, and name
export const signUp = async (email, pass, name) => {
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
export const signIn = async (email, pass) => {
  const successVal = await firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => ({
      status: 'success',
    }))
    .catch((error) => ({
      status: 'failure',
      message: error.message,
    }));
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  return successVal;
};

// signs out user
export const signOut = async () => {
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

export const checkSignIn = (success, failure) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('there actually is a user');
      success(user);
    }
    console.log('there isnt a user');
    failure();
  });
};

// gets object of current user if signed in
export const getCurrentUser = async () => {
  const currUser = firebase.auth().currentUser;
  if (currUser) {
    const currName = await firebase.database()
      .ref(`/users/${currUser.uid}/name`)
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      });

    return ({
      status: 'success',
      name: currName,
      user: currUser,
    });
  }
  return ({
    status: 'failure',
    message: 'no user signed in',
  });
};

// adds a todo for the current user
export const addTodo = async (todo, year, month, day) => {
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
export const getTodos = async () => {
  const { uid } = (await firebase.auth().currentUser);
  return firebase.database().ref(`/users/${uid}/todos`).once('value')
    .then(((snapshot) => {
      return snapshot.val();
    }));
};

// changes the todo for the current user
export const updateTodo = async (todoUid, todo, year, month, day, completed) => {
  const { uid } = (await firebase.auth().currentUser);
  console.log(uid);
  const currTodo = firebase.database().ref(`/users/${uid}/todos/${todoUid}`);
  currTodo.set({
    todo,
    dueDate: `${year}-${month}-${day}`,
    completed,
  });
};
