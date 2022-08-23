import { createBookItem } from "./items";
const axios = require('axios');

export let bookTitle = "";

export function getBooksBySubject(subject){
    let url = `https://openlibrary.org/subjects/${subject}.json`;
    axios
    .get(url)
    .then((response) => {
        for(let book of response.data.works){
            let bookAuthors = "";
            bookTitle = book.title;
            for(let author of book.authors){
                bookAuthors += (author.name + ", ");
            }
            bookAuthors = bookAuthors.slice(0, -2);
            bookAuthors += ".";
            let bookId = book.key;
            createBookItem(bookTitle, bookAuthors, bookId);
        };
    })
    .catch(err=>{
        return console.error(err);
    })
}

export async function getDescriptionById(bookId){
    let url = `https://openlibrary.org${bookId}.json`;
    let bookDescription = await axios.get(url)
    .then((response) => {
        let desc = response.data.description;
        return desc;
    })
    .catch(err => console.error(err));
    return bookDescription;
}
