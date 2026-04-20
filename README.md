# NotesNest - Notes Management Web App

A frontend-only notes management project designed for teachers and students.
Teachers can upload and manage class-wise notes, while students can view notes for their class and request class changes.

## Project Overview

This repository currently contains one main web project in `Notes_Mangement/`.
The application is built using:

- `HTML` for page structure
- `CSS` for styling
- `Vanilla JavaScript` for interactions
- `localStorage` as a temporary client-side data store

No backend, database, or build tool is required to run the app locally.

## Key Features

- Landing page with app introduction and navigation
- Role-based login (Teacher / Student)
- Teacher workflow:
  - Upload notes by class
  - Add title and optional description
  - Edit and delete previously uploaded notes
  - View student class change requests
- Student workflow:
  - View notes for their own class
  - Filter notes by subject/title
  - Request class change
- Common notes page for both roles to view all uploaded notes

## Folder Structure

```text
suhas/
└── Notes_Mangement/
    ├── about.html
    ├── about.css
    ├── common.html
    ├── common.css
    ├── home.html
    ├── login.html
    ├── login.css
    ├── login.js
    ├── studentpage.html
    ├── student.css
    ├── student.js
    ├── teacher page.html
    ├── teacher upload.css
    ├── teacher.js
    ├── styles.css
    └── Test.java
```

## Page-by-Page Flow

1. Open `home.html` to access the application.
2. Click **Login** to go to `login.html`.
3. Select role:
   - **Teacher** -> redirected to `teacher page.html`
   - **Student** -> redirected to `studentpage.html` (class selection required)
4. Both teacher and student can open `common.html` to view all notes.

## Data Storage Model (`localStorage`)

The app stores state in browser `localStorage`:

- `teacherUsername`: logged-in teacher username
- `studentUsername`: logged-in student username
- `studentClass`: current student class
- `notes`: array of uploaded notes
- `classChangeRequests`: array of class change requests
- `approvedClass`: class value used by student approval-check logic

### Example `notes` item

```json
{
  "standard": "8th",
  "title": "Science",
  "description": "Chapter 1 notes",
  "fileName": "science-ch1.pdf",
  "date": "4/20/2026, 10:30:00 AM"
}
```

## How to Run Locally

Because this is a static frontend project, there are two simple options:

### Option A: Open directly in browser

1. Go to `Notes_Mangement/`.
2. Double-click `home.html`.

### Option B: Use VS Code Live Server (recommended)

1. Open `Notes_Mangement/` in VS Code.
2. Install **Live Server** extension if needed.
3. Right-click `home.html` -> **Open with Live Server**.

Using a local server generally provides a smoother browser experience.

## How to Use the App

### Teacher

1. Login with role set to **Teacher**.
2. On the upload page:
   - Select class
   - Enter title
   - Add description (optional)
   - Choose file
   - Click upload
3. Use **Edit** or **Delete** on existing notes.
4. View incoming class change requests section.

### Student

1. Login with role set to **Student** and choose class.
2. View notes filtered to selected class.
3. Use subject filter dropdown.
4. Click **Request Class Change** to submit a request.

## Suggested Next Improvements

- Add backend API for login and note management
- Store uploaded files in server/cloud storage
- Implement real note download links
- Complete class request approval/rejection workflow
- Add form validation and better error handling
- Add responsive/mobile refinements
- Add automated tests

## Troubleshooting

- If pages do not reflect latest data, refresh browser and check localStorage.
- If student page redirects to login, ensure `studentClass` is set during login.
- If notes appear missing, verify they were uploaded in the same browser profile.
