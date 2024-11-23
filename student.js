document.addEventListener("DOMContentLoaded", function () {
    // Fetch the student's class from localStorage
    const studentClass = localStorage.getItem("studentClass");

    // Redirect if no student class is found
    if (!studentClass) {
        alert("Access Denied! Login required.");
        window.location.href = "login.html";
        return;
    }

    // Display the student's class
    const classDisplay = document.getElementById("studentClassDisplay");
    if (classDisplay) {
        classDisplay.textContent = `Your class: ${studentClass}`;
    }

    // Fetch notes from localStorage
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Populate subject filter dynamically based on note titles
    function populateSubjectFilter() {
        const subjectFilter = document.getElementById("subjectFilter");
        const titles = [...new Set(notes.map(note => note.title))]; // Extract unique titles

        subjectFilter.innerHTML = '<option value="all">All Subjects</option>'; // Default option

        titles.forEach(title => {
            const option = document.createElement("option");
            option.value = title;
            option.textContent = title;
            subjectFilter.appendChild(option);
        });
    }

    // Display notes for the student's class
    function displayNotes(subjectFilter = "all") {
        const filteredNotes = notes.filter(note => {
            return (
                note.standard === studentClass && 
                (subjectFilter === "all" || note.title.toLowerCase().includes(subjectFilter.toLowerCase()))
            );
        });

        const notesContainer = document.getElementById("notesContainer");
        notesContainer.innerHTML = ""; // Clear existing notes

        if (filteredNotes.length > 0) {
            filteredNotes.forEach(note => {
                const noteCard = document.createElement("div");
                noteCard.className = "note-card";
                noteCard.innerHTML = `
                    <h3>${note.title}</h3>
                    <p><strong>Description:</strong> ${note.description || "No description provided."}</p>
                    <p><strong>Uploaded on:</strong> ${note.date}</p>
                    <button onclick="downloadNote('${note.fileName}')">Download</button>
                `;
                notesContainer.appendChild(noteCard);
            });
        } else {
            notesContainer.innerHTML = `<p>No notes available for your class and selected filter.</p>`;
        }
    }

    // Function to handle note download
    function downloadNote(fileName) {
        alert(`Starting download for: ${fileName}`);
        // Add download functionality if file URLs are available
    }

    // Populate filter dropdown and initially display notes
    populateSubjectFilter();
    displayNotes();

    // Event listener for subject filter changes
    const subjectFilter = document.getElementById("subjectFilter");
    if (subjectFilter) {
        subjectFilter.addEventListener("change", function () {
            displayNotes(subjectFilter.value);
        });
    }

    // Handle class change request
    const requestClassChangeBtn = document.getElementById("requestClassChange");
    if (requestClassChangeBtn) {
        requestClassChangeBtn.addEventListener("click", function () {
            const newClass = prompt("Enter the class you want to switch to:");
            if (newClass) {
                const requests = JSON.parse(localStorage.getItem("classChangeRequests")) || [];
                const studentUsername = localStorage.getItem("studentUsername");
                requests.push({ studentName: studentUsername, currentClass: studentClass, requestedClass: newClass });
                localStorage.setItem("classChangeRequests", JSON.stringify(requests));
                alert("Your request to change class has been sent to the teacher for approval.");
            }
        });
    }

    // Check for teacher's response to class change requests
    function checkClassChangeApproval() {
        const approvedClass = localStorage.getItem("approvedClass");
        if (approvedClass && approvedClass !== studentClass) {
            alert(`Your class change request has been approved. Your new class is: ${approvedClass}`);
            localStorage.setItem("studentClass", approvedClass);
            localStorage.removeItem("approvedClass");
            window.location.reload();
        }
    }

    // Periodically check for teacher approval
    setInterval(checkClassChangeApproval, 5000); // Check every 5 seconds
});
