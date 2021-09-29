var searchFormEl = document.getElementById("search-form");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.getElementById("city-search").value;

  if (!searchInputVal) {
    console.error('Please input a city');
    return;
  }

  var searchPage = 'search-results.html/?q=' + searchInputVal;

  location.assign(searchPage);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
