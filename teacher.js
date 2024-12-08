document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById("uploadForm");
    const uploadedNotesList = document.getElementById("uploadedNotes");
    const requestsContainer = document.getElementById("requestsContainer");

    
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
                <strong>${note.title}</strong> - Class: ${note.standard} <br>
                ${note.description ? `<small>${note.description}</small><br>` : ""}
                <em>Uploaded File:</em> ${note.fileName} <br>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            uploadedNotesList.appendChild(listItem);
        });
    }

    // Handle note upload/edit
    uploadForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const standard = document.getElementById("standard").value;
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value || "";
        const fileInput = document.getElementById("file");

        if (!fileInput.files[0]) {
            alert("Please upload a file.");
            return;
        }

        const fileName = fileInput.files[0].name;
        const newNote = { standard, title, description, fileName, date: new Date().toLocaleString() };

        const notes = getNotes();
        const noteIndex = uploadForm.dataset.editIndex;

        if (noteIndex !== undefined) {
            notes[noteIndex] = newNote; 
        } else {
            notes.push(newNote); 
        }

        saveNotes(notes);
        uploadForm.reset();
        delete uploadForm.dataset.editIndex;
        alert(noteIndex !== undefined ? "Note updated successfully!" : "Note uploaded successfully!");
        renderUploadedNotes();
    });

    // Handle delete button for notes
    uploadedNotesList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete")) {
            const index = event.target.dataset.index;
            const notes = getNotes();
            notes.splice(index, 1); 
            saveNotes(notes); 
            renderUploadedNotes(); 
        } else if (event.target.classList.contains("edit")) {
            const index = event.target.dataset.index;
            const notes = getNotes();
            const note = notes[index];

            // Fill the form with the note data for editing
            document.getElementById("standard").value = note.standard;
            document.getElementById("title").value = note.title;
            document.getElementById("description").value = note.description;
            uploadForm.dataset.editIndex = index;
        }
    });

    // Render requests for class changes
    function renderRequests() {
        const requests = getRequests();
        requestsContainer.innerHTML = "";

        if (requests.length === 0) {
            requestsContainer.innerHTML = "<p>No requests pending.</p>";
            return;
        }

        requests.forEach(request => {
            const requestItem = document.createElement("div");
            requestItem.classList.add("request-item");
            requestItem.innerHTML = `
                <p><strong>${request.studentName}</strong> wants to change class to ${request.newClass}.</p>
                <button class="approve" data-id="${request.id}">Approve</button>
                <button class="reject" data-id="${request.id}">Reject</button>
            `;
            requestsContainer.appendChild(requestItem);
        });
    }

    // Render all notes and requests on page load
    renderUploadedNotes();
    renderRequests();
});
