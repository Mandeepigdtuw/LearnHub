// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, getDoc, getDocs, setDoc, doc, collection } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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
const attendanceList = document.getElementById("attendance-list");

async function fetchAttendance() {
    const date = attendanceDateInput.value;
    if (!date) {
        alert("Please select a date");
        return;
    }

    attendanceList.innerHTML = ""; // Clear previous data

    try {
        const docRef = doc(db, "attendance", date);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const attendanceData = docSnap.data();
            attendanceList.innerHTML = ""; // Clear previous results

            for (const rollno in attendanceData) {
                const student = attendanceData[rollno];
                const listItem = document.createElement("li");
                listItem.textContent = `Name: ${student.name} | Roll No: ${student.rollno} | Status: ${student.status}`;
                attendanceList.appendChild(listItem);
            }
        } else {
            attendanceList.innerHTML = "<p>No attendance data found for the selected date</p>";
        }
    } catch (error) {
        console.error("Error fetching attendance:", error);
    }
}


window.fetchAttendance = fetchAttendance;