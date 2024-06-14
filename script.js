
document.addEventListener('DOMContentLoaded', function () {
    generateCalendar();
    populateDropdowns();

});

let today = new Date();
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar() {

    let yearDropdown = document.getElementById('yearDropdown');
    let monthDropdown = document.getElementById('monthDropdown');
    let year = parseInt(yearDropdown.value) || currentYear;
    let month = parseInt(monthDropdown.value) || currentMonth;

    let calendarContainer = document.getElementById('calendar-container');
    calendarContainer.innerHTML = '';

    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0);

    let startDate = new Date(firstDay);
    startDate.setDate(1 - firstDay.getDay());
    let endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

    let calendarBody = document.createElement('div');

    let monthName = document.createElement('h5');
    monthName.textContent = firstDay.toLocaleString('en-us', { month: 'long' }) + ' ' + year;
    monthName.classList.add('text-center', 'mb-3');
    calendarBody.appendChild(monthName);

    let table = document.createElement('table');
    table.classList.add('table', 'table-primary', 'table-bordered');

    let tableHead = document.createElement('thead');
    let tableHeadRow = document.createElement('tr');
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(function (days) {
        let th = document.createElement('th');
        th.textContent = days;
        tableHeadRow.appendChild(th);
        tableHead.appendChild(tableHeadRow);
        table.appendChild(tableHead);

    });

    let tableBody = document.createElement('tbody');

    let date = new Date(startDate);

    while (date <= endDate) {
        let row = document.createElement('tr');

        for (var i = 0; i < 7; i++) {
            let cell = document.createElement('td');

            if (date.getMonth() === month) {
                cell.textContent = date.getDate();
                if (date.toDateString() === today.toDateString()) {
                    cell.classList.add('today');
                }
            } else {
                cell.textContent = date.getDate();
                cell.classList.add('text-muted');

            }

            date.setDate(date.getDate() + 1);
            row.appendChild(cell);


        }

        tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
    calendarBody.appendChild(table);
    calendarContainer.appendChild(calendarBody);
}

function populateDropdowns() {
    let yearDropdown = document.getElementById('yearDropdown');
    let monthDropdown = document.getElementById('monthDropdown');

    yearDropdown.innerHTML = '';
    monthDropdown.innerHTML = '';

    for (var i = currentYear - 10; i <= currentYear + 10; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearDropdown.appendChild(option);
    }

    for (var j = 0; j < 12; j++) {
        let option = document.createElement('option');
        option.value = j;
        option.textContent = new Date(currentYear, j).toLocaleString('en-us', { month: 'long' });
        monthDropdown.appendChild(option);
    }

    yearDropdown.value = currentYear;
    monthDropdown.value = currentMonth;
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    populateDropdowns();
    generateCalendar();

}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    populateDropdowns();
    generateCalendar();
}








