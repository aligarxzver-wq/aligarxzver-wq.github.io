// js/worker.js

// Array to store reports
let reportHistory = [];

// Function to handle form submission
function submitReport(event) {
    event.preventDefault();
    
    const reportInput = document.getElementById('reportInput').value;
    const reportTime = new Date();

    if (reportInput.trim() === '') {
        alert('Report cannot be empty');
        return;
    }
    
    // Create a new report object
    const newReport = {
        id: reportHistory.length + 1,
        content: reportInput,
        timestamp: reportTime,
        editable: true
    };
    
    reportHistory.push(newReport);
    document.getElementById('reportInput').value = ''; // Clear input
    displayReports();
}

// Function to display reports
function displayReports() {
    const reportContainer = document.getElementById('reportContainer');
    reportContainer.innerHTML = ''; // Clear the current reports displayed
    
    reportHistory.forEach(report => {
        const reportElement = document.createElement('div');
        reportElement.className = 'report';
        reportElement.innerHTML = `
            <p>${report.content} (${report.timestamp.toUTCString()})</p>
            <button onclick="editReport(${report.id})" ${!report.editable ? 'disabled' : ''}>Edit</button>
        `;
        reportContainer.appendChild(reportElement);
    });
}

// Function to edit a report
function editReport(id) {
    const report = reportHistory.find(r => r.id === id);
    
    // Check if the report is editable
    const now = new Date();
    const timeDiff = Math.abs(now - report.timestamp); // time difference in ms
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    if (hoursDiff > 48) {
        alert('You can no longer edit this report after 48 hours.');
        return;
    }
    
    const newContent = prompt('Edit your report:', report.content);
    if (newContent !== null && newContent.trim() !== '') {
        report.content = newContent;
    }
    displayReports(); // Refresh the report display
}

// Adding event listener to the form
document.getElementById('reportForm').addEventListener('submit', submitReport);