document.getElementById('bookForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const bookTitle = document.getElementById('bookTitle').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const rating = parseInt(document.getElementById('rating').value, 10); // Ensure the rating is an integer

  const bookEntry = {
      title: bookTitle,
      startDate: startDate,
      endDate: endDate,
      rating: rating
  };

  addBookToList(bookEntry);

  // clear the form field after added to lit
  document.getElementById('bookForm').reset();
});

function addBookToList(book) {
  const bookList = document.getElementById('bookList');
  const listItem = document.createElement('li');

  // container for the stars
  const starsContainer = document.createElement('span');

  // star elements based on the rating
  for (let i = 1; i <= 5; i++) {
      const star = document.createElement('img');
      if (i <= book.rating) {
          star.src = 'filledstar.png'; // filled star for rated
      } else {
          star.src = 'plainstar.png'; // plain star for not rated
      }
      star.alt = `${i} star${i > 1 ? 's' : ''}`;
      star.style.width = '20px'; 
      star.style.height = '20px'; 
      starsContainer.appendChild(star);
  }

  // Append the stars container to the list item
  listItem.textContent = `${book.title} - Started: ${book.startDate}, Ended: ${book.endDate}, Rating: `;
  listItem.appendChild(starsContainer); // Add the stars to the list item
  bookList.appendChild(listItem);
}

// Toggle library display
document.getElementById('toggleLibrary').addEventListener('click', function() {
  const bookList = document.getElementById('bookList');
  if (bookList.style.display === 'none' || bookList.style.display === '') {
      bookList.style.display = 'block';
      this.textContent = 'Hide My Library'; // Change button text
  } else {
      bookList.style.display = 'none';
      this.textContent = 'My Library'; // Change button text back
  }
});
