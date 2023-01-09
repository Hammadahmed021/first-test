var users = [];
var user = {};
// storing input from register-form
function register() {
  var uname = document.getElementById("uname").value;
  var pw = document.getElementById("pw").value;
  user = {
    id: Math.floor(Math.random() * 0x10000),
    userNam: uname,
    password: pw,
    totalBalance: [100],
  };
  // localStorage.getItem('users', users);
  let getUsers = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : "";
  console.log(getUsers, "all users");

  var singleUser = {};

  // if(uname !== getUsers.userNam  || getUsers == ''){
  if (getUsers !== "") {
    getUsers.forEach((item) => {
      if (item.userNam == uname) {
        singleUser = item;
      }
    });
    console.log(singleUser);
    if (singleUser.userNam !== uname) {
      getUsers.push(user);
      localStorage.setItem("users", JSON.stringify(getUsers));
      window.location.href = "login.html";
    } else {
      alert("user already exists");
    }
  } else {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "login.html";
  }

  uname = document.getElementById("uname").value = "";
  pw = document.getElementById("pw").value = "";
  console.log(users);

  // window.location.href = "login.html";
}

// check if stored data from register-form is equal to entered data in the   login-form
function login() {
  var userData = {};
  let getUsers = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : "";
  var LogUname = document.getElementById("userName").value;
  var logPw = document.getElementById("userPw").value;
  getUsers.forEach((item) => {
    if (item.userNam == LogUname) {
      userData = item;
    } else {
      
    }
  });
  console.log(userData);
  if (LogUname == userData.userNam && logPw == userData.password) {
    var userToken = userData.id;
    localStorage.setItem("userToken", JSON.stringify(userToken));
    window.location.href = "bank.html";
  } else {
    alert("user and password incorrect");
  }
 
}

let userLoggedIn = false;
function balance () {
  
 
  let getUsers;
  let singleUser;
  let getToken = localStorage.getItem("userToken")
    ? JSON.parse(localStorage.getItem("userToken"))
    : 0;
  if (getToken !== 0 ) {
    userLoggedIn = true;
    getUsers = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : "";
    console.log(getUsers);
  } else {
    alert("Not valid user");
  }
  getUsers.forEach((item) => {
    if (item.id == getToken) {
      singleUser = item;
      console.log(singleUser , item.id);

      document.getElementById("user-balance").innerHTML = `${item.totalBalance}`;
      document.getElementById("balance-name").innerHTML = `${item.userNam}`;

      // let userBalance =  document.createElement('p');
      // userBalance.innerText = `${item.totalBalance}`;
      // let userBalanceText = document.getElementById("user-balance");
      // userBalanceText.appendChild(userBalance);
    }
  });


  console.log(getToken);
};
 // undefined, the function does not return anything

if (window.location.href.match('bank.html') != null) {
  let getToken = localStorage.getItem("userToken")
  ? JSON.parse(localStorage.getItem("userToken"))
  : 0;

  if(getToken){

  var result = balance();
  window.onload = result;
  
    console.log(getToken);
  }else{
    window.location.href = "index.html";
  }

}

const delAcc = () => {
  
  let getToken = localStorage.getItem("userToken")
    ? JSON.parse(localStorage.getItem("userToken"))
    : 0;
   let getUsers = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : "";

     let removeUser = getUsers.findIndex((item) => item.id == getToken);
     console.log(removeUser);  
     getUsers.splice(removeUser , 1);

     localStorage.setItem("users", JSON.stringify(getUsers));
     localStorage.removeItem('userToken');
     window.location.href = "index.html";

}

