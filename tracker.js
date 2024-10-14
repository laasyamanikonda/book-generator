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
  
    listItem.textContent = `${book.title} - Started: ${book.startDate}, Ended: ${book.endDate}, Rating: `;
    }
    const starsContainer = document.createElement('span');
for (let i = 1; i<=5; i++){
const star = document.createElement('img');
star.src = (i <= book.rating) ? 'filled_star.png' : 'empty_star.png'; // Use appropriate star image paths
star.alt = `${i} star${i > 1 ? 's' : ''}`;
    star.style.width = '20px'; // Adjust size as needed
    star.style.height = '20px'; // Adjust size as needed
    starsContainer.appendChild(star);
}
listItem.appendChild(starsContainer);
    bookList.appendChild(listItem);
  
  
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