function setup() {
  noCanvas(); // We don't need a canvas for this form

  createElement('h2', 'Step 1: Search or Create Policy');

  // Input fields
  let policyNumber = createInput().attribute('placeholder', 'Policy #');
  styleInput(policyNumber);

  let firstName = createInput().attribute('placeholder', 'First name');
  styleInput(firstName);

  let lastName = createInput().attribute('placeholder', 'Last name');
  styleInput(lastName);

  let organizationName = createInput().attribute('placeholder', 'Organization Name');
  styleInput(organizationName);

  let policyType = createSelect();
  policyType.option('Select a policy type');
  policyType.option('Auto');
  policyType.option('Homeowners');
  policyType.option('Renters');
  policyType.option('Condo');
  policyType.option('Flood');
  policyType.option('Umbrella');
  styleSelect(policyType);

  let lossDate = createInput().attribute('type', 'date');
  styleInput(lossDate);

  let ssnTaxId = createInput().attribute('placeholder', 'SSN or Tax ID');
  styleInput(ssnTaxId);

  let country = createInput().attribute('placeholder', 'Country');
  styleInput(country);

  let city = createInput().attribute('placeholder', 'City');
  styleInput(city);

  let state = createInput().attribute('placeholder', 'State');
  styleInput(state);

  let zipCode = createInput().attribute('placeholder', 'ZIP Code');
  styleInput(zipCode);

  let vin = createInput().attribute('placeholder', 'VIN');
  styleInput(vin);

  // Buttons
  let buttonRow = createDiv(); // Div for buttons
  buttonRow.style('margin-top', '10px'); // Add some space above the button row
  
  let searchButton = createButton('Search').mousePressed(submitForm);
  styleButton(searchButton);
  searchButton.parent(buttonRow); // Place the button inside the buttonRow div

  let resetButton = createButton('Reset').mousePressed(resetForm);
  styleButton(resetButton);
  resetButton.parent(buttonRow); // Place the button inside the buttonRow div

  let cancelButton = createButton('Cancel').mousePressed(cancelForm);
  styleButton(cancelButton);
  cancelButton.parent(buttonRow); // Place the button inside the buttonRow div

  let nextButton = createButton('Next').mousePressed(submitForm);
  styleButton(nextButton);
  nextButton.parent(buttonRow); // Place the button inside the buttonRow div
}

function submitForm() {
  console.log('Form submitted');
  // Implement form submission logic here
  mockSearchResults(); // Call to mock search and display results
}

function mockSearchResults() {
  // Create a table to hold the search results
  let resultsTable = createElement('table');
  resultsTable.style('width', '100%');
  resultsTable.style('margin-top', '20px');
  
  // Add a header row
  let header = createElement('tr').parent(resultsTable);
  ['Policy #', 'Insured Name', 'Address', 'City', 'State', 'Zip Code', 'Effective Date', 'Expiry Date', 'Policy Type'].forEach(col => {
    createElement('th', col).parent(header);
  });

  // Add mock rows of data (for demonstration, we'll add just 3 rows)
  for (let i = 0; i < 3; i++) {
    let row = createElement('tr').parent(resultsTable);
    createElement('td', `P12345${i}`).parent(row);
    createElement('td', `John Doe ${i}`).parent(row);
    createElement('td', `1234 Elm St`).parent(row);
    createElement('td', `Anytown`).parent(row);
    createElement('td', `NY`).parent(row);
    createElement('td', `12345`).parent(row);
    createElement('td', `01/01/202${i}`).parent(row);
    createElement('td', `12/31/202${i}`).parent(row);
    createElement('td', i % 2 === 0 ? `Auto` : `Homeowners`).parent(row);
  }
  
  styleTable(resultsTable);
}

function styleTable(table) {
  table.style('border-collapse', 'collapse');
  table.style('border', '1px solid black');
  table.selectAll('th', (item) => {
    item.style('border', '1px solid black');
    item.style('padding', '8px');
    item.style('background-color', '#f2f2f2');
  });
  table.selectAll('td', (item) => {
    item.style('border', '1px solid black');
    item.style('padding', '8px');
  });
}

function resetForm() {
  console.log('Reset form');
  // Implement reset form logic here
}

function cancelForm() {
  console.log('Form canceled');
  // Implement form cancel logic here
}

function styleInput(input) {
  input.style('padding', '5px');
  input.style('margin', '5px');
  input.style('display', 'inline-block'); // Ensure input is inline
}

function styleButton(button) {
  button.style('padding', '10px');
  button.style('margin', '5px'); // Give some space around the buttons
  button.style('background-color', '#ddd');
  button.style('display', 'inline-block'); // Ensure button is inline
}

function styleSelect(select) {
  select.style('padding', '5px');
  select.style('margin', '5px');
  select.style('display', 'inline-block'); // Ensure select is inline
}

function draw() {
  // No need to render anything in draw loop
}
