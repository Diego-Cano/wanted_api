document.addEventListener('DOMContentLoaded', function() {
    fetchMostWanted();
});

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fieldOffice = document.getElementById('searchInput').value;
    fetchResultsForOffice(fieldOffice);
});

// Event listener for the clear button
document.getElementById('clearResults').addEventListener('click', function() {
    document.getElementById('searchInput').value = ''; // Clear search input
    document.getElementById('searchResults').innerHTML = ''; // Clear search results
});

function fetchResultsForOffice(fieldOffice) {
    const apiUrl = `https://api.fbi.gov/wanted/v1/list?field_offices=${encodeURIComponent(fieldOffice)}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items, 'searchResults');
        })
        .catch(error => console.error('Error:', error));
}

function fetchMostWanted() {
    fetch('https://api.fbi.gov/wanted/v1/list?tags=most_wanted')
      .then(response => response.json())
      .then(data => {
          displayResults(data.items, 'mostWantedResults');
      })
      .catch(error => console.error('Error:', error));
}

function displayResults(results, elementId) {
    const resultsContainer = document.getElementById(elementId);
    resultsContainer.innerHTML = '';
    results.forEach(item => {
        const element = document.createElement('div');
        element.innerHTML = `<h3>${item.title}</h3><p>${item.description || 'No description available.'}</p>`;
        resultsContainer.appendChild(element);
    });
}
