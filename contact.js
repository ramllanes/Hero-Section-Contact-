// document.addEventListener('DOMContentLoaded', () => {

//     // Get references to the form and the message container
//     const contactForm = document.getElementById('contact-form');
//     const formMessage = document.getElementById('form-message');

//     // Optional: log submission data to console
//     const logToConsole = (data) => {
//         console.log("New Submission Received:");
//         console.table(data);
//     };

//     // Save the form data to localStorage
//     const saveToLocalStorage = (data) => {
//         // Get existing submissions or empty array
//         const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions')) || [];

//         // Add submission date
//         const submissionWithDate = { ...data, submittedAt: new Date().toLocaleString() };

//         // Push new submission
//         existingSubmissions.push(submissionWithDate);

//         // Save back to localStorage
//         localStorage.setItem('contact_submissions', JSON.stringify(existingSubmissions));

//         console.log(`Stored! Total submissions: ${existingSubmissions.length}`);
//     };

//     // Listen for form submit
//     if (contactForm) {
//         contactForm.addEventListener('submit', function (e) {
//             e.preventDefault(); // prevent default form submission

//             const formData = new FormData(this);
//             const data = Object.fromEntries(formData.entries()); // convert FormData to object

//             saveToLocalStorage(data); // save submission
//             logToConsole(data);       // optional: log to console

//             // Show a temporary success message
//             if (formMessage) {
//                 formMessage.textContent = 'Submission saved successfully!';
//                 formMessage.classList.remove('opacity-0');
//                 formMessage.classList.add('opacity-100', 'bg-blue-100', 'text-blue-800', 'text-center');

//                 // Hide message after 3 seconds
//                 setTimeout(() => formMessage.classList.replace('opacity-100', 'opacity-0'), 3000);
//             }

//             this.reset(); // reset form fields

//             DisplayInformation(); // refresh submissions list after each submit
//         });
//     }

//     // Display all submissions from localStorage
//     function DisplayInformation() {
//         const container = document.getElementById('submissions');
//         if (!container) return; // prevent errors if container doesn't exist

//         const data = JSON.parse(localStorage.getItem("contact_submissions")) || [];

//         container.innerHTML = ""; // clear previous content

//         if (data.length === 0) {
//             container.innerHTML = "<p>No submissions yet.</p>";
//             return;
//         }

//         // Loop through each submission and create a card
//         data.forEach((item, index) => {
//             const card = document.createElement("div");
//             card.classList.add("card");

//             card.innerHTML = `
//                 <h3>Form #${index + 1}</h3>
//                 <p><strong>Name:</strong> ${item.name}</p>
//                 <p><strong>Email:</strong> ${item.email}</p>
//                 <p><strong>Message:</strong> ${item.message}</p>
//                 <p><strong>Date:</strong> ${item.submittedAt}</p>
//                 <hr>
//             `;

//             container.appendChild(card); // add card to the container
//         });
//     }

//     window.onload = DisplayInformation(); // Initial display when page loads
// });



document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    const logToConsole = (data) => {

        console.log("New Submission Received:");
        console.table(data);
    };

    const saveToLocalStorage = (data) => {

        const existingSubmissions = JSON.parse(localStorage.getItem('contact_submit')) || [];
        
        const submissionWithDate = {...data, submissionWithDate: new Date().toLocaleString() };

        existingSubmissions.push(submissionWithDate);

        localStorage.setItem('contact_submit', JSON.stringify(existingSubmissions));

        console.log(`Stored! Total submissions: ${existingSubmissions.length}`);
    };


    if(contactForm) {

        contactForm.addEventListener('submit', function(e) {

            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            saveToLocalStorage(data);

            if(formMessage) {

                formMessage.textContent = `Submission saved successfully!`;
                formMessage.classList.remove('opacity-0');
                formMessage.classList.add('opacity-100', 'bg-blue-100', 'text-blue-800', 'text-center');

                setTimeout(() => formMessage.classList.replace('opacity-100', 'opacity-0'), 3000);
            }

            this.reset();
        });
    }


    function DisplayInfo() {

        const container = document.getElementById("submissions");

        const data = JSON.parse(localStorage.getItem('contact_submit')) || [];

         container.innerHTML = "";

        if(data.length === 0) {
            container.innerHTML = "<p>No submissions yet.</p>";
            return;
        }

        data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>Form #${index + 1}</h3>
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Email:</strong> ${item.email}</p>
            <p><strong>Date:</strong> ${item.submittedAt}</p>
            <hr>
        `;

        container.appendChild(card);
    });


    }

   window.onload = DisplayInfo;



function viewSubmitted() {
    const submitBody = document.getElementById('submissions'); // tbody
    const data = JSON.parse(localStorage.getItem('contact_submit')) || [];
    const empty = document.getElementById('empty-state');

    // Show empty state if no submissions
    if (data.length === 0) return;

    // Fill table body
   submitBody.innerHTML = data.reverse().map(entry => `
        <tr>
            <td>${entry.name || 'N/A'}</td>
            <td>${entry.email || 'N/A'}</td>
            <td>${entry.message || 'N/A'}</td>
            <td>${entry.date || entry.submittedAt || 'No Date'}</td>
        </tr>
    `).join('');
}

// Run after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const submissionsList = document.getElementById('submissions-body');
    if (submissionsList) viewSubmitted();
});


})