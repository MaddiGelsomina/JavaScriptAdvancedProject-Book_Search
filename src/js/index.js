import '../css/style.css';
import { getBooksBySubject } from "./requests";

export const bookList = document.getElementById("bookList");
let subject = "";
const form = document.getElementById("mainForm");
const searchBar = form.elements["searchBar"];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    subject = searchBar.value;
    if(subject == ""){
        alert("Please write a subject before searching");
        return;
    };
    getBooksBySubject(subject);
    while(bookList.lastChild) {
        bookList.removeChild(bookList.lastChild);
    };
})
