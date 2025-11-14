const myModal = new bootstrap.Modal("#register-modal");

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


// localStorage - Allows you to save key-value pairs in the browser.
function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data)); // converts a JavaScript object into a JSON string
}