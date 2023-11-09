const formButtons = document.querySelectorAll(".form-buttons button");
const formCloseButton = formButtons[0];
const dialogForm = document.querySelector("dialog");
const addBookForm = document.querySelector("#add-book-form");
const addbookButton = document.querySelector(".add-book");
const overlay = document.querySelector(".overlay");
const bookList = document.querySelector(".book-list");

let myLibrary = [];
var id = 0;
const createElement = (tagname, arrayOfclasses, arrayOfAttr) => {
  let element = document.createElement(tagname);
  arrayOfclasses?.forEach((className) => {
    element.classList.add(className);
  });
  arrayOfAttr?.forEach((attr) => {
    let key = Object.keys(attr),
      value = Object.values(attr);
    element.setAttribute(key, value);
  });
  return element;
};
const bookCard = (bookObj) => {
  const {title,author,pages,read_status} = bookObj;
  return ` <div class="detail">
             <h3>${title}</h3>
             <span>${author}</span>
            <span>${pages} pages</span>
           </div> 
           <div class="buttons">
            <button data-read="${read_status}">
            ${read_status ? "Read" : "Unread"}
             </button>
            <button data-btn="delete">Delete</button>
           </div>`;
};
function Book(object) {
  // the constructor...
}

function addBookToLibrary(object) {
  // do stuff here
  myLibrary.push({
    Id: id++,
    ...object,
    read_status: object?.read_status ? true : false,
  });
  displayBooks();
}

function displayBooks() {
  const card = createElement('div',['card']);
  myLibrary.forEach((book, i) => {
   card.innerHTML = bookCard(book);
    bookList.append(card);
  });
}

addbookButton.addEventListener("click", function () {
  dialogForm.show();
  overlay.classList.toggle("visible");
});

formCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  dialogForm.close();
});

dialogForm.addEventListener("close", (e) => {
  overlay.classList.toggle("visible");
});

overlay.addEventListener("click", () => {
  dialogForm.close();
});

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addBookForm);
  const newBookData = Object.fromEntries(new Map([...formData.entries()]));
  // console.log(newBookData);
  addBookToLibrary(newBookData);
  console.log(myLibrary);
  addBookForm.reset();
  dialogForm.close();
});
