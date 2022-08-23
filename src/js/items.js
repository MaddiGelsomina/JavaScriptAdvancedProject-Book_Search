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
    expandButton.innerHTML = "🔽";
    title.append(expandButton);
    expandButton.classList.add("float-right")
    expandButton.addEventListener("click", () => {
        if (hide) {
            description.classList.remove("hide");
            expandButton.innerHTML = "❌"
            hide = false;
        } else {
            description.classList.add("hide");
            expandButton.innerHTML = "🔽"
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
