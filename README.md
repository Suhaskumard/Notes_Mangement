# NotesNest

NotesNest is a simple browser-based notes management app for school workflows.
It provides separate teacher and student experiences, and stores all data in browser `localStorage`.

## What This Project Is

- A static frontend project inside `Notes_Mangement/`
- Built with `HTML`, `CSS`, and vanilla `JavaScript`
- No backend, database, or build setup required
- Best suited as a prototype or mini-project 

## Quick Start

1. Open the `Notes_Mangement/` folder.
2. Launch `home.html` in a browser.
3. Click **Login** and choose a role:
   - **Teacher** -> redirected to `teacher page.html`
   - **Student** -> redirected to `studentpage.html` (class required)

For smoother behavior, run with VS Code Live Server instead of opening files directly.

## Core Features

### Teacher

- Upload notes with class, title, description, and file name
- Edit and delete uploaded notes
- View class-change requests from students
- Open a common page listing all notes

### Student

- Login with selected class
- View only notes matching their class
- Filter visible notes using subject/title dropdown
- Send class-change requests
- Open a common page listing all notes

### Shared

- Landing page (`home.html`) with app overview
- About page (`about.html`)
- Common notes page (`common.html`) for both roles

## Project Structure

```text
suhas/
└── Notes_Mangement/
    ├── home.html
    ├── login.html
    ├── teacher page.html
    ├── studentpage.html
    ├── common.html
    ├── about.html
    ├── styles.css
    ├── login.css
    ├── teacher upload.css
    ├── student.css
    ├── common.css
    ├── about.css
    ├── login.js
    ├── teacher.js
    ├── student.js
    └── Test.java
```

## Local Storage Schema

The app persists data in browser `localStorage` using these keys:

- `teacherUsername`
- `studentUsername`
- `studentClass`
- `notes` (array of note objects)
- `classChangeRequests` (array of request objects)
- `approvedClass`

Example note object:

```json
{
  "standard": "8th",
  "title": "Science",
  "description": "Chapter 1 notes",
  "fileName": "science-ch1.pdf",
  "date": "4/20/2026, 10:30:00 AM"
}
```

## Current Gaps / Known Issues

- Login is form-based only (no real authentication).
- Files are not actually uploaded or stored; only file names are saved.
- Download actions currently show alerts, not real downloads.
- Class-change request approval buttons exist in UI, but full approval/rejection behavior is incomplete.
- `common.html` references `common.js`, but that file is missing.
- Data is browser-local and can be lost if storage is cleared.

## Suggested Next Steps

1. Add backend APIs for authentication and notes.
2. Persist uploaded files in server/cloud storage.
3. Implement real download URLs.
4. Complete class-change approval workflow.
5. Add validation, error states, and better UX messages.
6. Add responsive improvements and tests.

## Troubleshooting

- If student access fails, confirm `studentClass` is selected during login.
- If notes are missing, check whether localStorage was cleared.
- If UI behaves inconsistently, refresh the page and retry with Live Server.

## License

No `LICENSE` file is currently present in this repository.
