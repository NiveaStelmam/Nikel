const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

// Login to the system
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account){
        alert("Ops! Verifique o usuário ou a senha.");
        return;
    }

    if(account){
        if(account.password !== password){
            alert("Ops! Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);
        window.location.href = "home.html";
    }
});

// Create Account 
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

  if(email.length < 5){
    alert("Preencha o campo com um E-mail válido");
    return;
  }

  if(password.length < 4){
    alert("A senha deve ter no mínimo 4 caracteres");
    return;
  }


  saveAccount({
    login: email,
    password: password,
    transactions: []
  });

  myModal.hide();
  alert("Conta criada com sucesso!");

});

function checkLogged(){
    if(session){
       sessionStorage.getItem("logged", session);
       logged = session;
    }
    if(logged){
       saveSession(logged, session);

       window.location.href = "home.html";
      }
      
}

// localStorage - Allows you to save key-value pairs in the browser.
function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data)); // converts a JavaScript object into a JSON string
}

function saveSession(data, saveSession){
    if(saveSession){
      localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account); // converts a JSON string into a JavaScript object
    }
    return "";
}