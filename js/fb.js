function toggleSignIn() {
    if (!firebase.auth().currentUser) {
      // [START createprovider]
      var provider = new firebase.auth.FacebookAuthProvider();
      // [END createprovider]
      // [START addscopes]
      provider.addScope('user_birthday');
      // [END addscopes]
      // [START signin]
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // [START_EXCLUDE]
        document.getElementById('quickstart-oauthtoken').textContent = token;
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
      // [END signin]
    } else {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    }
    // [START_EXCLUDE]
    document.getElementById('quickstart-sign-in').disabled = true;
    // [END_EXCLUDE]
  }
  // [END buttoncallback]

  /**
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.
   */
  function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // [START_EXCLUDE]
        window.location.href = "f2.html";
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        document.getElementById('quickstart-sign-in').textContent = 'Log out';
        document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
        // [END_EXCLUDE]
      } else {
        // User is signed out.
        // [START_EXCLUDE]
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
        document.getElementById('quickstart-sign-in').textContent = 'Log in with Facebook';
        document.getElementById('quickstart-account-details').textContent = 'null';
        document.getElementById('quickstart-oauthtoken').textContent = 'null';
        // [END_EXCLUDE]
      }
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authstatelistener]

    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  }

  window.onload = function() {
    initApp();
  };