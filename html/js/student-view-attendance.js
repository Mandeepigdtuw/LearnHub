// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase Configuration
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
const db = getFirestore(app);

// Select the necessary DOM elements
const attendanceDateInput = document.getElementById("attendance-date");
const rollNoInput = document.getElementById("roll-no");
const attendanceList = document.getElementById("attendance-list");

async function fetchAttendance() {
    const date = attendanceDateInput.value.trim();
    const rollNo = rollNoInput.value.trim();

    if (!date || !rollNo) {
        alert("Please select both a date and roll number");
        return;
    }

    attendanceList.innerHTML = ""; // Clear previous data

    try {
        // Fetch the attendance document for the given date
        const docRef = doc(db, "attendance", date);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const attendanceData = docSnap.data();

            // Check if the specific roll number exists in the data
            if (attendanceData[rollNo]) {
                const student = attendanceData[rollNo];
                const listItem = document.createElement("li");
                listItem.textContent = `Name: ${student.name} | Roll No: ${student.rollno} | Status: ${student.status}`;
                listItem.classList.add("bg-white", "p-4", "rounded-2xl", "shadow-lg", "flex", "items-center", "justify-between", "h-15", "px-4", "gap-4", "my-2", "font-bold");
                attendanceList.appendChild(listItem);
            } else {
                attendanceList.innerHTML = `<p>No attendance record found for Roll No: ${rollNo} on ${date}</p>`;
            }
        } else {
            attendanceList.innerHTML = `<p>No attendance data found for ${date}</p>`;
        }
    } catch (error) {
        console.error("Error fetching attendance:", error);
    }
}

// Expose function globally
window.fetchAttendance = fetchAttendance;
