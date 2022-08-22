import '../css/style.css';

let subject ='';
const form = document.getElementById("mainForm");
const searchBar = form.elements["searchBar"];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    subject = searchBar.value;
    if(subject == ""){
        alert("Please write a subject before searching");
        return;
    };


})
