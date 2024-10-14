document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const bookTitle = document.getElementById('bookTitle').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const rating = document.getElementById('rating').value;
  
    const bookEntry = {
        title: bookTitle,
        startDate: startDate,
        endDate: endDate,
        rating: rating
    };
  
    addBookToList(bookEntry);
  
    document.getElementById('bookForm').reset();
  });
  
  function addBookToList(book) {
    const bookList = document.getElementById('bookList');
    const listItem = document.createElement('li');
  
    listItem.textContent = `${book.title} - Started: ${book.startDate}, Ended: ${book.endDate}, Rating: ${book.rating}/5`;
    if (bookList.style.display === 'none' || bookList.style.display === '') {
        bookList.style.display = 'block';
        this.textContent = 'Hide My Library'; 
    }
    bookList.appendChild(listItem);
  }
  
  document.getElementById('toggleLibrary').addEventListener('click', function() {
    const bookList = document.getElementById('bookList');
    if (bookList.style.display === 'none' || bookList.style.display === '') {
        bookList.style.display = 'block';
        this.textContent = 'Hide My Library'; 
    } else {
        bookList.style.display = 'none';
        this.textContent = 'My Library'; 
    }
  });
  