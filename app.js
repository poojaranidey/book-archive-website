const loadBooks = () => {
    // html selection
    const searchField = document.getElementById('search')
    const searchBtn = document.getElementById('search-btn')
    const result = document.getElementById('result')
    const container = document.getElementById('container')
    const noAuthor = "Author not found";
    const noPublisher = "Publisher not found";
    let resultNum;

    //  toggle spinner 
    const togglespinner = displayStyle => {
        document.getElementById('spinner').style.display = displayStyle;
    }

    //  toggle serach Result 
    const toggleSearchResult = displayStyle => {
        document.getElementById('serachResult').style.display = displayStyle;
    }

    //add event listener
    searchBtn.addEventListener('click', () => {
        // display spinner 
        togglespinner('block');

        // display spinner 
        toggleSearchResult('none');

        const searchText = searchField.value;
        const url = `https://openlibrary.org/search.json?q=${searchText}`

        fetch(url)
            .then(res => res.json())
            .then(data => showData(data))
    })

    // function for show book data 
    const showData = data => {
        if (data.numFound < 20) {
            resultNum = data.numFound;
        } else {
            resultNum = 20;
        }

        // No result found error 
        if (data.numFound === 0) {
            result.innerText = `No result found `
            searchField.value = ''

        }
        else {
            result.innerText = `Showing ${resultNum} of ${data.numFound} Results for ${searchField.value}`

        }
        // display book container information 
        const books = data.docs.slice(0, 20)
        container.innerHTML = ''
        books.forEach(book => {

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card shadow h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="..." height="350px">
                <div class="card-body">
                  <h5 class="card-title">Title : ${book.title}</h5>
                  <p class="card-text">Author : ${book.author_name ? book.author_name : noAuthor}</p>
                  <p class="card-text">Publisher : ${book.publisher ? book.publisher[0] : noPublisher}  </p>
                  <p class="card-text">First Publish Year : ${book.first_publish_year}  </p>
                </div>
              </div>
            `
            container.appendChild(div)
            searchField.value = ''
        })

        // hide spinner 
        togglespinner('none');

        // hide spinner 
        toggleSearchResult('block');
    }
}

loadBooks();