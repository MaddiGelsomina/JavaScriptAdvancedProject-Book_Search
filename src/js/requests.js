import _get from 'lodash/get';
import { createBookItem } from "./items";
import { displayLoading, hideLoading } from './index';
const axios = require('axios');

export let bookTitle = "";

export function getBooksBySubject(subject){
let url = `https://openlibrary.org/search.json?q=${subject}`;

    displayLoading();

    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
       return response.json();
    })
    .then((jsonData) => {
      hideLoading();
      for(let i = 0; i <= 10; i++) {
        let item = _get(jsonData, ['docs', [i]], '');
        if(item){
          let bookAuthors = "";
            bookTitle = item.title;
            bookAuthors = 'Author(s): ' + item.author_name;
            let bookId = item.key;
            createBookItem(bookTitle, bookAuthors, bookId);
        }
      }
    })

    .catch(err=>{
        return console.error(err);
    })
    .finally(() =>{
      hideLoading();
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
