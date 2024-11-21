document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById("uploadForm");
    const uploadedNotesList = document.getElementById("uploadedNotes");
    const requestsContainer = document.getElementById("requestsContainer");

    // Utility functions for localStorage
    const getNotes = () => JSON.parse(localStorage.getItem("notes")) || [];
    const saveNotes = (notes) => localStorage.setItem("notes", JSON.stringify(notes));
    const getRequests = () => JSON.parse(localStorage.getItem("classChangeRequests")) || [];
    const saveRequests = (requests) => localStorage.setItem("classChangeRequests", JSON.stringify(requests));

    // Render uploaded notes
    function renderUploadedNotes() {
        const notes = getNotes();
        uploadedNotesList.innerHTML = ""; // Clear the list

        if (notes.length === 0) {
            uploadedNotesList.innerHTML = "<li>No notes uploaded yet.</li>";
            return;
        }

        notes.forEach((note, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${note.title} - ${note.standard} 
                <button class="delete" data-index="${index}">Delete</button>
            `;
            uploadedNotesList.appendChild(listItem);
        });
    }

    // Handle note upload
    uploadForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const standard = document.getElementById("standard").value;
        const subject = document.getElementById("subject").value;
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const fileInput = document.getElementById("file");

        if (!fileInput.files[0]) {
            alert("Please upload a file.");
            return;
        }

        const fileName = fileInput.files[0].name;
        const newNote = { standard, subject, title, description, fileName, date: new Date().toLocaleString() };

        const notes = getNotes();
        notes.push(newNote);
        saveNotes(notes);

        uploadForm.reset();
        alert("Note uploaded successfully!");
        renderUploadedNotes();
    });

    // Handle delete button for notes
    uploadedNotesList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete")) {
            const index = event.target.dataset.index;
            const notes = getNotes();
            notes.splice(index, 1); // Remove the note
            saveNotes(notes); // Update localStorage
            renderUploadedNotes(); // Re-render notes
        }
    });

    // Render student requests
    function renderRequests() {
        const requests = getRequests();
        requestsContainer.innerHTML = "";

        if (requests.length === 0) {
            requestsContainer.innerHTML = "<p>No student requests available.</p>";
            return;
        }

        requests.forEach((request, index) => {
            const requestItem = document.createElement("div");
            requestItem.classList.add("request-item");
            requestItem.innerHTML = `
                <p>${request.studentName} (Current Class: ${request.currentClass}) requested to change to ${request.requestedClass}</p>
                <button class="approve" data-index="${index}">Approve</button>
                <button class="deny" data-index="${index}">Deny</button>
            `;
            requestsContainer.appendChild(requestItem);
        });
    }

    // Handle approve/deny actions
    requestsContainer.addEventListener("click", function (event) {
        const target = event.target;
        const index = target.dataset.index;
        const requests = getRequests();

        if (target.classList.contains("approve")) {
            alert(`Request approved for ${requests[index].studentName}.`);
            requests.splice(index, 1); // Remove the request
            saveRequests(requests);
            renderRequests();
        } else if (target.classList.contains("deny")) {
            alert(`Request denied for ${requests[index].studentName}.`);
            requests.splice(index, 1); // Remove the request
            saveRequests(requests);
            renderRequests();
        }
    });

    // Initialize page
    renderUploadedNotes();
    renderRequests();
});
