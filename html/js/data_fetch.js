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

var stdNo = 0;
var tbody = document.getElementById('tbody1');
function AddItemToTable(Name,Mobile){
    let trow = document.createElement("trow");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");

    td1.innerHTML = Name;
    td2.innerHTML = Mobile;

    trow.appendChild(td1);
    trow.appendChild(td2);

    tbody.appendChild(trow);

}

function AddAllItemsToTable(TheStudent) {
    tbody.innerHTML="";
    TheStudent.forEach(element => {
        AddItemToTable(element.Name, element.Mobile);
    });
}


async function GetAllDataOnce() {
    const querySnapshot = await getDocs(collection(db,"12A"));
    var students = [];
    querySnapshot.forEach(doc => {
        students.push(doc.data());        
    });

    AddAllItemsToTable(students);    
}

async function GetAllDataOnceRealtime(){
    const dbRef = collection(db,"12A");
    onSnapshot(dbRef,(querySnapshot)=>{
        var students = [];

        querySnapshot.forEach(doc => {
            students.push(doc.data());
        });
        AddAllItemsToTable(students);
    })
}

window.onload = GetAllDataOnceRealtime;