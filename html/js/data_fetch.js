// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, getDoc, doc , collection , onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkKXVTFUA26ed0lcv4bjGbRjaxRLIDOu4",
    authDomain: "school-erp-93b2a.firebaseapp.com",
    projectId: "school-erp-93b2a",
    storageBucket: "school-erp-93b2a.firebasestorage.app",
    messagingSenderId: "710573059611",
    appId: "1:710573059611:web:a8a6d9fa72a02d0a7292be",
    measurementId: "G-PTRD7GJTP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =  getFirestore(app);

// Reference to the student container div
var studentsContainer = document.getElementById('studentsContainer');

// Function to create and append student cards dynamically
function AddItemToDiv(Name, Mobile, docId) {
    // Create the student card div
    let studentDiv = document.createElement("div");
    studentDiv.classList.add("bg-white", "p-4", "rounded-2xl", "shadow-lg", "flex", "items-center", "justify-between", "w-screen", "h-20", "px-4", "gap-4", "my-2");

    // Create the left section with the image and student details
    let leftSection = document.createElement("div");
    leftSection.classList.add("flex", "items-center", "space-x-4");

    let img = document.createElement("img");
    img.src = "https://static.vecteezy.com/system/resources/previews/000/505/670/original/male-student-icon-design-vector.jpg";
    img.alt = "Student Icon";
    img.classList.add("w-12", "h-12", "rounded-full");

    let textDiv = document.createElement("div");
    let namePara = document.createElement("p");
    namePara.classList.add("font-bold", "text-lg");
    namePara.innerText = Name;

    let mobilePara = document.createElement("p");
    mobilePara.classList.add("text-gray-600", "text-sm");
    mobilePara.innerText = Mobile;

    textDiv.appendChild(namePara);
    textDiv.appendChild(mobilePara);

    leftSection.appendChild(img);
    leftSection.appendChild(textDiv);

    // Create the remove button
    let removeButton = document.createElement("button");
    removeButton.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "rounded-md", "hover:bg-red-700");
    removeButton.innerText = "Remove";

    // Add click event to delete student from Firebase
    removeButton.addEventListener("click", async function () {
        if (confirm(`Are you sure you want to remove ${Name}?`)) {
            try {
                await deleteDoc(doc(db, "12A", docId)); // Delete from Firestore
                studentDiv.remove(); // Remove from UI
                alert(`${Name} has been removed successfully!`);
            } catch (error) {
                console.error("Error removing student:", error);
                alert("Failed to remove student.");
            }
        }
    });

    // Append sections to the student card
    studentDiv.appendChild(leftSection);
    studentDiv.appendChild(removeButton);

    // Append the student card to the container
    studentsContainer.appendChild(studentDiv);
}

// Function to add all student records to the div
function AddAllItemsToDiv(TheStudent) {
    studentsContainer.innerHTML = ""; // Clear existing content
    TheStudent.forEach(element => {
        AddItemToDiv(element.Name, element.Mobile, element.docId);
    });
}

// Fetching data from Firebase
async function GetAllDataOnceRealtime() {
    const dbRef = collection(db, "12A");
    onSnapshot(dbRef, (querySnapshot) => {
        var students = [];
        querySnapshot.forEach(doc => {
            students.push({ ...doc.data(), docId: doc.id }); // Store doc ID
        });
        AddAllItemsToDiv(students);
    });
}

// Load data on page load
window.onload = GetAllDataOnceRealtime;



