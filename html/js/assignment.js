// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, getDoc, doc , collection } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";



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

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);


//Function to upload pdf file
function uploadFile(){
    const fileInput = document.getElementById("fileInput");
    const folder = document.getElementById("upload-folder").value;
    const uploadStatus = document.getElementById("uploadStatus");

    if (!fileInput.files.length){
        alert("Please select a PDF File.");
        return;
    }

    const file = fileInput.files[0];

    // Check if the file is a PDF
    if (file.type !== "application/pdf"){
        alert("Only pdf files are allowed!");
        return;
    }

   
    const storageRef = ref(storage, `${folder}/${file.name}`);


    //Upload File
    storageRef.put(file).then(snapshot => {
        return snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
        //Store file URL in firestore
        return db.collection("pdf_files").add({
            folder: folder,
            name: file.name,
            url: downloadURL,
            uploadedAt: new Date()
        });
    }).then(() => {
        uploadStatus.textContent = "Upload successfull!";
        uploadStatus.style.color="green";
        fileInput.value = ""; //Clear file input
    }).catch(error => {
        uploadStatus.textContent = "Upload failed!";
        uploadStatus.style.color = "red";
        console.error("Error uploading file:", error);
    });
}

function popUp(message , callback){
    console.log("Popup function is triggered!");
    var confirmBox = document.createElement("div");
    confirmBox.classList.add("confirm-box"); //This is the class for Styling of confirm box

    var messageBox = document.createElement("div"); //Message box is inside confirm box
    messageBox.classList.add("message-box");
    messageBox.textContent = message;
    confirmBox.appendChild(messageBox);

    var buttonBox = document.createElement("div"); //Message box is inside confirm box
    buttonBox.classList.add("button-box");
    messageBox.appendChild(buttonBox);

    document.body.appendChild(confirmBox);

    var yesButton = document.createElement("button"); //Message box is inside confirm box
    yesButton.classList.add("yes-button");
    yesButton.textContent = "Yes";
    buttonBox.appendChild(yesButton);
    yesButton.addEventListener('click', YesButtonClick);

    var noButton = document.createElement("button"); //Message box is inside confirm box
    noButton.classList.add("no-button");
    noButton.textContent = "No";
    buttonBox.appendChild(noButton);
    noButton.addEventListener('click', NoButtonClick);

   function removePopUp(){
    document.body.removeChild(confirmBox);
   }

    function YesButtonClick(){
        callback(true);
        uploadFile();
        removePopUp();
    }

    function NoButtonClick(){
        callback(false);
        removePopUp();
    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#openpopup").addEventListener("click", () => {
        popUp("Are you sure you want to Upload?", function(result) {
            if(result) {
                console.log("YES");
            } else {
                console.log("NO");
            }
        });
    });
});

//Function to fetch files from Firestore
function fetchFiles(){
    const folder = document.getElementById("download-folder").value;
    const fileList = document.getElementById("fileList");

    fileList.innerHTML = "Loading...";

    db.collection("pdf_files").where("folder", "==" ,folder).get()
    .then(snapshot => {
        fileList.innerHTML = "";
        if(snapshot.empty){
            fileList.innerHTML = "<li>No files in this folder</li>";
            return;
        }
        snapshot.forEach(doc => {
            const data = doc.data();
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = data.url;
            link.textContent = data.name;
            link.target = "_blank";
            li.appendChild(link);
            fileList.appendChild(li);
        })
    })
    .catch(error => {
        console.error("Error fetching files:", error);
        fileList.innerHTML = "<li>Error loading files.</li>";
    });
}
