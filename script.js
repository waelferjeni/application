function validateForm() {
  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var price = document.getElementById("price").value;

  if (title == "") {
    alert("Title is required");
    return false;
  }
  if (author == "") {
    alert("Author is required");
    return false;
  }
  if (price == "") {
    alert("Price is required");
    return false;
  } else if (price < 1) {
    alert("Price must be more than zero");
    return false;
  }
  return true;
}

function showData() {
  var booksList;
  if (localStorage.getItem("booksList") == null) {
    booksList = [];
  } else {
    booksList = JSON.parse(localStorage.getItem("booksList"));
  }
  var html = "";
  booksList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.title + "</td>";
    html += "<td>" + element.author + "</td>";
    html += "<td>" + element.price + "</td>";
    html +=
      '<td><button onclick="deleteBook(' +
      index +
      ')"class="btn btn-danger">Delete </button><button onclick="updateBook(' +
      index +
      ')"class="btn btn-info">Update </button></td>';
    html += "</tr>";
  });
  document.querySelector("#booksTable tbody").innerHTML = html;
  document.getElementById("actions").classList.add("hidden");
}
document.onload = showData();

function addBook() {
  if (validateForm() == true) {
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var price = document.getElementById("price").value;
    var booksList;
    if (localStorage.getItem("booksList") == null) {
      booksList = [];
    } else {
      booksList = JSON.parse(localStorage.getItem("booksList"));
    }
    booksList.push({
      title: title,
      author: author,
      price: price,
    });
    localStorage.setItem("booksList", JSON.stringify(booksList));
    showData();
    document.getElementById("actions").classList.add("hidden");
    alert("book is added successfully ");
    reset();
  }
}

function reset() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("price").value = "";
}

function updateBook(index) {
  document.getElementById("Add").style.display = "none";
  document.getElementById("Update").style.display = "block";
  document.getElementById("actions").classList.remove("hidden");
  if (localStorage.getItem("booksList") == null) {
    booksList = [];
  } else {
    booksList = JSON.parse(localStorage.getItem("booksList"));
  }
  document.getElementById("title").value = booksList[index].title;
  document.getElementById("author").value = booksList[index].author;
  document.getElementById("price").value = booksList[index].price;

  document.querySelector("#Update").onclick = function () {
    if (validateForm() == true) {
      booksList[index].title = document.getElementById("title").value;
      booksList[index].author = document.getElementById("author").value;
      booksList[index].price = document.getElementById("price").value;

      localStorage.setItem("booksList", JSON.stringify(booksList));
      alert("book is updated successfully ");
      document.getElementById("Add").style.display = "block";
      document.getElementById("Update").style.display = "none";
      document.getElementById("actions").classList.add("hidden");
      showData();
      reset();
    }
  };
}

function deleteBook(index) {
  var booksList;
  if (localStorage.getItem("booksList") == null) {
    booksList = [];
  } else {
    booksList = JSON.parse(localStorage.getItem("booksList"));
  }
  if (confirm("Do you want to delete this book?") == true) {
    booksList.splice(index, 1);
    localStorage.setItem("booksList", JSON.stringify(booksList));
    showData();
  } else {
  }
}

function showAddForm() {
  document.getElementById("actions").classList.remove("hidden");
  document.getElementById("Update").style.display = "none";
}
