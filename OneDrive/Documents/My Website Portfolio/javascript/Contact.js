document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    const logToConsole = (data) => {

        console.log("New Submission Received:");
        console.table(data);
    };

    const saveToLocalStorage = (data) => {

        const existingSubmissions = JSON.parse(localStorage.getItem('contact_submit')) || [];
        
        const submissionWithDate = {...data, submittedAt: new Date().toLocaleString() };

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


        if(data.length === 0) {

            return;
        }

        data.forEach((item, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.number}</td>
            <td>${item.Message}</td>
            <td>${item.submittedAt}</td>
        `;

    });


    }

   window.onload = DisplayInfo;



function viewSubmitted() {
    const submitBody = document.getElementById('submissions'); 
    const data = JSON.parse(localStorage.getItem('contact_submit')) || [];
    const empty = document.getElementById('empty-state');

     if (!submitBody || data.length === 0) return;


   submitBody.innerHTML = data.reverse().map(entry => `
        <tr>
            <td>${entry.name || 'N/A'}</td>
            <td>${entry.email || 'N/A'}</td>
            <td>${entry.number || 'N/A'}</td>
            <td>${entry.Message || 'N/A'}</td>
            <td>${entry.submittedAt}</td>
        </tr>
    `).join('');
}

viewSubmitted();

})