import {bookList} from "./index";
import { getDescriptionById } from "./requests";

export async function createBookItem(bookTitle, bookAuthors, bookId){
    let hide = true;
    let desc = await getDescriptionById(bookId);

    const bookItem = document.createElement("li");
    bookList.append(bookItem);
    bookItem.classList.add("card", "mb-3");

    const title = document.createElement("h3");
    title.innerHTML = bookTitle;
    bookItem.append(title);
    title.classList.add("card-header");

    const authors = document.createElement("p");
    authors.innerHTML = ("Authors " + bookAuthors);
    bookItem.append(authors);
    authors.classList.add("card-header");

    const expandButton = document.createElement("button");
    expandButton.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="green" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
  </svg>`;
    title.append(expandButton);
    expandButton.classList.add("float-right")
    expandButton.addEventListener("click", () => {
        if (hide) {
            description.classList.remove("hide");
            expandButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="green" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>`
            hide = false;
        } else {
            description.classList.add("hide");
            expandButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="green" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
          </svg>`
            hide = true;
        };
    });

    const description = document.createElement("div");
    const descriptionTitle = document.createElement("h4");
    descriptionTitle.innerHTML = "Description";
    description.append(descriptionTitle);
    const descriptionText = document.createElement("p");
    desc = validateDescription(desc);
    descriptionText.innerHTML = desc;
    description.append(descriptionText);
    bookItem.append(description);
    description.classList.add("hide", "card-text", "p-4");
}

function validateDescription(description){
    if (typeof description == "object") {
        description = description.value;
    } else if (typeof description == "undefined") {
        description = "Sorry! We can't find the book's description";
    };
    return description.split("---")[0];
}
