window.addEventListener("DOMContentLoaded", function() {
    console.log("hehhheeyeyyyy haaiii");
}, false);

let uname = document.getElementById("username");
uname.value = "youruname";

const pwd = document.getElementById("password");
pwd.value = "<your password>";

console.log(uname.value);

document.querySelector("body > div.container-fluid.mainDiv > div > div.row.loginRow > div > div > div.card.card-login.logindiv.col-xs-12.col-sm-12.col-md-4.col-lg-4 > div.card-body > form > div:nth-child(3) > input").click();