// Fetch JSON data from the API
async function fetchData() {
    const response = await fetch('https://s3.amazonaws.com/open-to-cors/assignment.json');
    const data = await response.json();
    return data;
}

// Populate available and displayed fields select elements
function populateFieldsSelect() {
    const availableFieldsSelect = document.getElementById('availableFields');
    const displayedFieldsSelect = document.getElementById('displayedFields');

    const fields = ['Subcategory', 'Title', 'Price', 'Popularity'];

    fields.forEach(field => {
        const option = document.createElement('option');
        option.value = field;
        option.text = field;
        availableFieldsSelect.add(option);
    });
}

// Move selected fields between available and displayed fields
function moveToDisplayed() {
    moveOptions('availableFields', 'displayedFields');
}

function moveToAvailable() {
    moveOptions('displayedFields', 'availableFields');
}

function moveOptions(sourceId, targetId) {
    const sourceSelect = document.getElementById(sourceId);
    const targetSelect = document.getElementById(targetId);

    const selectedOptions = Array.from(sourceSelect.selectedOptions);

    selectedOptions.forEach(option => {
        targetSelect.add(option);
    });
}

// Display the data in a table
function displayData(data) {
    const displayedFieldsSelect = document.getElementById('displayedFields');
    const selectedFields = Array.from(displayedFieldsSelect.options).map(option => option.value);

    const table = document.getElementById('productTable');
    table.innerHTML = ''; // Clear previous content

    // Sort data by descending popularity
    data.sort((a, b) => b.Popularity - a.Popularity);

    // Create table header
    const thead = table.createTHead();
    const row = thead.insertRow();
    selectedFields.forEach(field => {
        const th = document.createElement('th');
        th.textContent = field;
        row.appendChild(th);
    });

    // Create table rows
    const tbody = table.createTBody();
    data.forEach(product => {
        const tr = tbody.insertRow();
        selectedFields.forEach(field => {
            const td = tr.insertCell();
            td.textContent = product[field];
        });
    });
}

// Main function to initialize the UI
async function initialize() {
    populateFieldsSelect();
    const data = await fetchData();
    displayData(data);
}

// Run the initialization when the page loads
document.addEventListener('DOMContentLoaded', initialize);
