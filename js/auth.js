const authForm = document.querySelector(".auth-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#login");

const auth = firebase.auth();

const toggleSnackbar = (message) => {
  const snackbar = document.querySelector(".snackbar");
  snackbar.innerHTML = message;
  snackbar.classList.add("show-snackbar");
  setTimeout(() => {
    snackbar.classList.remove("show-snackbar");
  }, 3000);
};

authForm.onsubmit = function (e) {
  e.preventDefault();

  //   auth
  //     .createUserWithEmailAndPassword(email.value, password.value)
  //     .then((cred) => {
  //       console.log("CREATED USER", cred);
  //       authForm.reset();
  //     })
  //     .catch(function (error) {
  //       console.log("ERROR", error);
  //     });
  auth
    .signInWithEmailAndPassword(email.value, password.value)
    .then((cred) => {
      document.cookie = `token=${cred.user.uid}`;
      document.location.href = "/admin.html";
      authForm.reset();
    })
    .catch(function (error) {
      toggleSnackbar(error.message);
    });
};
