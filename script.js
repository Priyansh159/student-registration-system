document.addEventListener("DOMContentLoaded", () => {
    loadStudents();
});

document.querySelector(".form").addEventListener("submit", function (e) {
    e.preventDefault();     // to submit the form adding sumbmit event listener

    let name = document.getElementById("sname").value.trim();
    let studentId = document.getElementById("stdid").value.trim();
    let studentClass = document.getElementById("sclass").value.trim();
    let rollNo = document.getElementById("roll").value.trim();
    let email = document.getElementById("email").value.trim();

    if (!validateInput(name, studentId, email)) {
        return;
    }       

    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({ name, studentId, studentClass, rollNo, email });
    localStorage.setItem("students", JSON.stringify(students));

    this.reset();
    loadStudents();
});

function validateInput(name, studentId, email) {
    if (!name || !isNaN(name)) {        // will not shows Not a number 
        alert("Invalid name! It should contain only letters.");
        return false;
    }
    if (!studentId || isNaN(studentId)) {
        alert("Invalid ID! It should contain only numbers.");
        return false;
    }
    if (!email.includes("@") || !email.includes(".")) {     // for email 
        alert("Invalid Email! It should contain '@' and a domain.");
        return false;
    }
    return true;
}

function loadStudents() {       // to store the data tried with JSON (Youtube needed sometime)
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let table = document.querySelector(".table");
    table.innerHTML = `<div class="items">
                        <h2>Name</h2>
                        <h2>ID</h2>
                        <h2>Class</h2>
                        <h2>Roll No.</h2>
                        <h2>Email</h2>
                        <h2>Actions</h2>
                      </div>`;

    students.forEach((student, index) => {
        let row = document.createElement("div");
        row.classList.add("row");
        row.innerHTML = `
            <p>${student.name}</p>
            <p>${student.studentId}</p>
            <p>${student.studentClass}</p>
            <p>${student.rollNo}</p>
            <p>${student.email}</p>
            <div>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </div>
        `;
        table.appendChild(row);
    });
}

function deleteStudent(index) {     // to delete
    let students = JSON.parse(localStorage.getItem("students"));
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}

function editStudent(index) {   // to edit 
    let students = JSON.parse(localStorage.getItem("students"));
    let student = students[index];

    document.getElementById("sname").value = student.name;
    document.getElementById("stdid").value = student.studentId;
    document.getElementById("sclass").value = student.studentClass;
    document.getElementById("roll").value = student.rollNo;
    document.getElementById("email").value = student.email;

    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}
