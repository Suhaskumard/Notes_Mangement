
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value.trim();
    const studentClass = document.getElementById("class").value.trim();

    if (!username || !password || !role) {
        alert("Please fill out all fields.");
        return;
    }

    if (role === "teacher") {
        // Store teacher data and redirect
        localStorage.setItem("teacherUsername", username);
        window.location.href = "teacher page.html";
    } else if (role === "student") {
        if (studentClass) {
            // Store student data
            localStorage.setItem("studentClass", studentClass); // Correctly store the chosen class
            localStorage.setItem("studentUsername", username);
            window.location.href = "studentpage.html";
        } else {
            alert("Please select a class.");
        }
    } else {
        alert("Invalid role selected.");
    }
});

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
