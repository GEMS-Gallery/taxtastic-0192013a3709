import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const addTaxPayerForm = document.getElementById('addTaxPayerForm');
    const searchButton = document.getElementById('searchButton');
    const taxPayerListItems = document.getElementById('taxPayerListItems');

    // Function to display all tax payers
    async function displayTaxPayers() {
        const taxPayers = await backend.getAllTaxPayers();
        taxPayerListItems.innerHTML = '';
        taxPayers.forEach(taxPayer => {
            const li = document.createElement('li');
            li.textContent = `TID: ${taxPayer.tid}, Name: ${taxPayer.firstName} ${taxPayer.lastName}, Address: ${taxPayer.address}`;
            taxPayerListItems.appendChild(li);
        });
    }

    // Add new tax payer
    addTaxPayerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tid = document.getElementById('tid').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;

        await backend.addTaxPayer(tid, firstName, lastName, address);
        addTaxPayerForm.reset();
        displayTaxPayers();
    });

    // Search for tax payer
    searchButton.addEventListener('click', async () => {
        const searchTid = document.getElementById('searchTid').value;
        const searchResult = document.getElementById('searchResult');
        const result = await backend.searchTaxPayer(searchTid);
        
        if (result.length > 0) {
            const taxPayer = result[0];
            searchResult.textContent = `Found: TID: ${taxPayer.tid}, Name: ${taxPayer.firstName} ${taxPayer.lastName}, Address: ${taxPayer.address}`;
        } else {
            searchResult.textContent = 'No TaxPayer found with that TID.';
        }
    });

    // Initial display of tax payers
    displayTaxPayers();
});
