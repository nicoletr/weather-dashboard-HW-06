const searchFormEl = document.getElementById("search-form");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.getElementById("city-search").value;

  if (!searchInputVal) {
    console.error('Please input a city');
    return;
  }

  const searchPage = "search-results.html";

  localStorage.setItem("inputValue", searchInputVal);
  location.assign(searchPage);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

