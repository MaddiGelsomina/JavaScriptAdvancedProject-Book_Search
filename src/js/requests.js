import axios from "axios";

export let bookTitle = '';

function getBookBySubject(subject){
    let url = `https://openlibrary.org/subjects/${subject}.json`;
    axios.get(url)
    .then((response) => {
        for(let book of response.data.works){
            let bookAuthors = "";
            bookTitle = book.title;
            for(let author of bookAuthors){
                bookAuthors += (author.name + ", ");
            }
            bookAuthors = bookAuthors.slice(0, -2);
            bookAuthors += ".";
            let bookId = book.key;
            createBookItem(bookTitle, bookAuthor, bookId);
        };
    })
    .catch(err => console.error(err))
}
