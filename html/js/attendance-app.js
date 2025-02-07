// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, getDocs, setDoc, doc, collection } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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

const studentsList = document.getElementById("students-list");
const attendanceForm = document.getElementById("attendance-form");

function navigateToViewAttendance() {
    window.location.href = "view-attendance.html";
}

// Fetch student data and create the attendance form
async function fetchStudents() {
    try {
        const querySnapshot = await getDocs(collection(db, '12A'));
        querySnapshot.forEach((docSnap) => {
            const student = docSnap.data();
            const studentDiv = document.createElement('div');

            studentDiv.innerHTML = `
                <p>Name: ${student.Name}  |  Roll No: ${student.RollNo}</p>
                <div>
                    <label>
                        <input type="radio" name="attendance-${student.RollNo}" value="present" /> Present
                    </label>
                    <label>
                        <input type="radio" name="attendance-${student.RollNo}" value="absent" /> Absent
                    </label>
                </div>
            `;

            studentDiv.classList.add("bg-white", "p-4", "rounded-2xl", "shadow-xl", "flex", "items-center", "justify-between", "w-screen", "h-10", "px-4", "gap-4", "my-2");

            studentsList.appendChild(studentDiv);
        });
    } catch (error) {
        console.error("Error fetching students:", error);
    }
}

// Submit attendance data to Firestore
attendanceForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const date = new Date().toISOString().split('T')[0];
    const attendanceData = {};

    try {
        const querySnapshot = await getDocs(collection(db, '12A'));
        querySnapshot.forEach((docSnap) => {
            const student = docSnap.data();
            const attendanceStatus = document.querySelector(`input[name="attendance-${student.RollNo}"]:checked`)?.value || "absent";

            attendanceData[student.RollNo] = {
                name: student.Name,
                rollno: student.RollNo,
                status: attendanceStatus
            };
        });

        await setDoc(doc(db, 'attendance', date), attendanceData);
        alert('Attendance marked successfully');
    } catch (error) {
        console.error("Error marking attendance:", error);
    }
});

fetchStudents();
