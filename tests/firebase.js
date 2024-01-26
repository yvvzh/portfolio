import { initializeApp } from "./firebase/firebaseApp";
import { collection, getFirestore, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "./firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAjuX5P0b6bP6FCXmL1fSglBMm4qqFSdEg",
    authDomain: "emilejoly-portfolio.firebaseapp.com",
    projectId: "emilejoly-portfolio",
    storageBucket: "emilejoly-portfolio.appspot.com",
    messagingSenderId: "1011981664777",
    appId: "1:1011981664777:web:daf9eb49f571945fc1aed8",
    measurementId: "G-SRE5SE9BH9",
});

const db = getFirestore(firebaseApp);

const todoColRef = collection(db, "todo_app");

onSnapshot(todoColRef, (snapshot) => {
    let todos = [];
    snapshot.docs.forEach((doc) => {
        todos.push({
            ...doc.data(),
            id: doc.id,
        });
    });
    console.log(todos);
});

const addTaskForm = document.querySelector(".add");
addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addDoc(todoColRef, {
        text: addTaskForm.text.value,
        status: false,
    }).then(() => {
        addTaskForm.reset();
    });
});

const deleteTaskForm = document.querySelector(".delete");
deleteTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(db, "todo_app", deleteTaskForm.id.value);

    deleteDoc(docRef).then(() => {
        deleteTaskForm.reset();
    });
});

const updateTaskForm = document.querySelector(".update");
updateTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(db, "todo_app", updateTaskForm.id.value);

    updateDoc(docRef, {
        status: true,
    }).then(() => {
        updateTaskForm.reset();
    });
});
