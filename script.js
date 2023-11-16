const formButtons = document.querySelectorAll(".form-buttons button");
const formCloseButton = formButtons[0];
const dialogForm = document.querySelector("dialog");
const addBookForm = document.querySelector("#add-book-form");
const addbookButton = document.querySelector(".add-book");
const overlay = document.querySelector(".overlay");
const bookList = document.querySelector(".book-list");
var id = 0;

var myLibrary = [
  {
    Id: id++,
    // title: "Free ki Aaddat",
    // author: "Santa Claus",
    title:"Cyber Security",
    author:"Sanyam Jain",
    pages: 100,
    read_status: true,
  },
  {
    Id: id++,
    // title: "Trying To Act God",
    // author: "Klaus Schwab",
    title: "Ethical Person",
    author: "Anandu K.P",
    pages: 999,
    read_status: false,
  },
  {
    Id: id++,
    title: "Artificial Believes",
    author: "Mass Media",
    pages: 9211420,
    read_status: true,
  },
];

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
  const { Id, title, author, pages, read_status } = bookObj;
  return ` <div class="detail">
             <h3>${title}</h3>
             <span>${author}</span>
             <span>${pages} pages</span>
           </div> 
           <div class="buttons">
            <button id="read" data-id=${Id} data-read="${read_status}">
            ${read_status ? "Read" : "Unread"}
             </button>
            <button id="delete" data-id=${Id} data-btn="delete">Delete</button>
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

function removeBook(cardId) {
  myLibrary = myLibrary.filter((book) => {
    return book.Id != cardId;
  });
  displayBooks();
}

function toggleReadStatus(cardId) {
  myLibrary = myLibrary.map((book) => {
    if (book.Id === cardId) {
      return { ...book, read_status: !book.read_status };
    }
    return book;
  });
  displayBooks();
}

function displayBooks() {
  let children = [];
  myLibrary.forEach((book) => {
    const card = createElement("div", ["card"], [{ "data-id": book.Id }]);
    card.innerHTML = bookCard(book);
    children.push(card);
  });
  if (children.length === 0) {
    const noBooksCard = createElement("div", ["no-books-card"]);
    noBooksCard.textContent = "Library is empty, add books...";
    bookList.append(noBooksCard);
  } else {
    bookList.replaceChildren(...children);
    const bookCardElements = document.querySelectorAll(".book-list .card");

    bookCardElements.forEach((card, i) => {
      const cardId = Number(card.dataset.id);
      const readBtns = document.querySelectorAll(".buttons #read");
      const deleteBtns = document.querySelectorAll(".buttons #delete");
      deleteBtns[i].addEventListener("click", () => {
        card.classList.add("removing");
        setTimeout(() => {
          removeBook(cardId);
        }, 500);
      });
      readBtns[i].addEventListener("click", () => {
        toggleReadStatus(cardId);
      });
    });
  }
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
  addBookToLibrary(newBookData);
  console.log(myLibrary);
  addBookForm.reset();
  dialogForm.close();
});
displayBooks();
