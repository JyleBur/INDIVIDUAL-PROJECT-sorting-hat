
const renderToDom = (divId, htmlToRender) => {
    const selectedDiv = document.querySelector(divId);
    selectedDiv.innerHTML = htmlToRender;
};


const showButton = document.querySelector('#start-btn');
const showAddStduent = document.querySelector('#add-student');
const showHouseButton = document.querySelector('#house-buttons');
const showSearch = document.querySelector('#search')

showButton.addEventListener('click', () => {
    showAddStduent.style.display = 'flex';
    showHouseButton.style.display = 'flex';
    showSearch.style.display = 'flex';

});

// ------------
//      STUDENT LIST ARRAY INFORMATION
// -------------

let studentList = [

];

// -------------
//     CREATE
// -------------
const createStudent = (e) => {
    let houseName = ['ravenclaw', 'slytherin', 'hufflepuff', 'gryffindor'];
    var randomIndex = Math.floor(Math.random() * houseName.length);

    // Get the value of the student name input field
    const studentNameInput = document.querySelector("#studentName");
    const studentName = studentNameInput.value;

    // Check if the student name is empty
    if (studentName.trim() === '') {
        alert("Please enter a student name.");
        return;
    }

    const newStudentObj = {
        studentId: studentList.length + 1,
        studentName: studentName,
        studentHouse: houseName[randomIndex],
    }

    studentList.unshift(newStudentObj);


}


const studentListDiv = (studentList) => {
    let domString = "";


    for (const student of studentList) {
        let houseColor;
        let housePic;
        let houseDescription;
        switch (student.studentHouse) {
            case "ravenclaw":
                houseColor = "rgba(60, 78, 145)";
                housePic = "imgs/ravenclaw.jpg";
                houseDescription = "Intelligence, Wit, Wisdom, Creativity, Orginality, Indviduality, Acceptance, Sharpness ";
                break;
            case "slytherin":
                houseColor = "rgba(54,100,71)";
                housePic = "imgs/slytherin.jpg";
                houseDescription = "Ambition, Resourcefulness, Determination, and Cleverness";
                break;
            case "hufflepuff":
                houseColor = "rgba(239, 188, 47)";
                housePic = "imgs/hufflepuff.jpg";
                houseDescription = "Strong sense of justice, loyalty, patience, and Propensity for hard work ";
                break;
            case "gryffindor":
                houseColor = "rgba(166, 51, 46)"
                housePic = "imgs/gryffindor.jpg";
                houseDescription = "Courage, bravery, nerve, and chivalry ";
                break;
        }
        domString += `<div class="card" style="width: 18rem; background-color: ${houseColor};">
        <img src="${housePic}" class="card-img-top" alt="...">
        <div class="card-body" style:"background-color: ${houseColor};">
        <p class="card-text">${student.studentName}</p>
        <hr>
        <p class="card-text">${student.studentHouse}</p>
        <hr>
        <p class="card-text">${houseDescription}</p>
        <button class="btn btn-danger" id="delete--${student.studentId}">Expel</button>
        </div>
            </div>`;
    }


    renderToDom('#students', domString); // responsible for updating the content of the HTML element on the page #add-student. domString is the htmlToRender parameter.
}


const eventAddStudent = document.querySelector('#add-btn');
eventAddStudent.addEventListener('click', (e) => {
    createStudent();
    studentListDiv(studentList);
});







// -------------
//     DELETE
// -------------
// An empty array to store the list of expelled students
let expelList = [];

// Get the element with the id 'students'
const expel = document.querySelector('#students');

// Add a 'click' event listener
expel.addEventListener('click', (e) => {
    if (e.target.id.includes("delete")) {
        const [, id] = e.target.id.split("--");

        const index = studentList.findIndex(e => e.studentId == Number(id));

        // Remove the expelled student from the studentList and store it in the expelledStudent variable
        const expelledStudent = studentList.splice(index, 1)[0];

        // Display a confirmation dialog to confirm 
        if (window.confirm(`Are you sure you want to expel ${expelledStudent.studentName}?`)) {
            expelList.push(expelledStudent);
            studentListDiv(studentList);
        } else {
            studentList.splice(index, 0, expelledStudent);
        }

        studentListDiv(studentList);
        exeplledListDiv(expelList);
    }
});


const exeplledListDiv = (expelList) => {
    let domString = "";


    for (const expeled of expelList) {
        let houseColor;
        let housePic;
        let houseDescription;
        switch (expeled.studentHouse) {
            case "ravenclaw":
                houseColor = "rgba(60, 78, 145)";
                housePic = "imgs/ravenclaw.jpg";
                houseDescription = "Intelligence, Wit, Wisdom, Creativity, Orginality, Indviduality, Acceptance, Sharpness ";
                break;
            case "slytherin":
                houseColor = "rgba(54,100,71)";
                housePic = "imgs/slytherin.jpg";
                houseDescription = "Ambition, Resourcefulness, Determination, and Cleverness";
                break;
            case "hufflepuff":
                houseColor = "rgba(239, 188, 47)";
                housePic = "imgs/hufflepuff.jpg";
                houseDescription = "Strong sense of justice, loyalty, patience, and Propensity for hard work ";
                break;
            case "gryffindor":
                houseColor = "rgba(166, 51, 46)"
                housePic = "imgs/gryffindor.jpg";
                houseDescription = "Courage, bravery, nerve, and chivalry ";
                break;
        }
        domString += `<div class="card" style="width: 18rem; background-color: ${houseColor};">
        <img src="${housePic}" class="card-img-top" alt="...">
        <div class="card-body" style:"background-color: ${houseColor};">
        <p class="card-text">${expeled.studentName}</p>
        <hr>
        <p class="card-text">${expeled.studentHouse}</p>
        <hr>
        <p class="card-text">${houseDescription}</p>
        <hr>
        <p class="card-text">EXPELLED</p>
        </div>
            </div>`
    }


    renderToDom('#expel', domString); // responsible for updating the content of the HTML element on the page #add-student. domString is the htmlToRender parameter.
}


// ----------------------
//     BUTTONS TO SORT HOUSE
// ----------------------

const filter = (studentHouseName) => {
    const studentHouseNameArray = [];

    for (const student of studentList) {
        if (student.studentHouse === studentHouseName) {
            studentHouseNameArray.push(student);
        }
    }

    return studentHouseNameArray;
}

// This function filters the list of expelled students based on the input house name AND name of student
const filterExpel = (studentHouseName) => {
    const studentHouseNameArray = [];

    // Loop through the expelList and add any students from the given house to studentHouseNameArray
    for (const student of expelList) {
        if (student.studentHouse === studentHouseName) {
            studentHouseNameArray.push(student);
        }
    }

    return studentHouseNameArray;
}

// This function handles the search functionality
const search = (e) => {
    const eventLC = e.target.value.toLowerCase();
    const searchResult = studentList.filter(taco =>
        taco.studentName.toLowerCase().includes(eventLC) ||
        taco.studentHouse.toLowerCase().includes(eventLC))

    studentListDiv(searchResult);
    expelListDiv(searchResult);
}

// Add event listener to the search input to trigger the search function on keyup
document.querySelector('#searchInput').addEventListener('keyup', search);

// This event listener is for the "All" button, which displays all students and expelled students
const allBtn = document.querySelector('#all-btn');
allBtn.addEventListener('click', () => {
    studentListDiv(studentList);
    expelListDiv(expelList);
});

// These event listeners are for the house buttons, which filter the student list and expelled student list to show only students from the selected house
const ravenclawBtn = document.querySelector('#ravenclaw-btn');
ravenclawBtn.addEventListener('click', () => {
    studentListDiv(filter("ravenclaw"));
    exeplledListDiv(filterExpel("ravenclaw"));
});

const slytherinBtn = document.querySelector('#slytherin-btn');
slytherinBtn.addEventListener('click', () => {
    studentListDiv(filter("slytherin"));
    exeplledListDiv(filterExpel("slytherin"));
});

const hufflepuffBtn = document.querySelector('#hufflepuff-btn');
hufflepuffBtn.addEventListener('click', () => {
    studentListDiv(filter("hufflepuff"));
    exeplledListDiv(filterExpel("hufflepuff"));
});

const gryffindorBtn = document.querySelector('#gryffindor-btn');
gryffindorBtn.addEventListener('click', () => {
    studentListDiv(filter("gryffindor"));
    exeplledListDiv(filterExpel("gryffindor"));
});

// -----------------------
//      OLD CODE
// -----------------------


// const addStudentBtn = document.querySelector("#sorting-btn");
// addStudentBtn.addEventListener('click', () => {
//     addStudentFormToDom();
//     console.log('you clicked me');
// });

// const addStudentFormToDom = () => {
//     let domString = "";

//     domString += `<form>
//         <div class="form-group">
//             <label>
//             Student Name:</label>
//             <input type="text" class="form-text" id="studentName" placeholder="Enter Name Here" required>
//         </div>
//         <button type="button" class="btn btn-outline-dark" id="add-btn">Submit</button>
//     </form>`

//     renderToDom('#add-student', domString); // responsible for updating the content of the HTML element on the page #add-student. domString is the htmlToRender parameter.
// }


    // for (const student of studentList) {
    //     let houseColor;
    //     let housePic;
    //     let houseDescription;
    //     switch (student.studentHouse) {
    //         case "ravenclaw":
    //             houseColor = "rgba(60, 78, 145)";
    //             housePic = "imgs/ravenclaw.jpg";
    //             houseDescription = "Intelligence, Wit, Wisdom, Creativity, Orginality, Indviduality, Acceptance, Sharpness ";
    //             break;
    //         case "slytherin":
    //             houseColor = "rgba(54,100,71)";
    //             housePic = "imgs/slytherin.jpg";
    //             houseDescription = "Ambition, Resourcefulness, Determination, and Cleverness";
    //             break;
    //         case "hufflepuff":
    //             houseColor = "rgba(239, 188, 47)";
    //             housePic = "imgs/hufflepuff.jpg";
    //             houseDescription = "Strong sense of justice, loyalty, patience, and Propensity for hard work ";
    //             break;
    //         case "gryffindor":
    //             houseColor = "rgba(166, 51, 46)"
    //             housePic = "imgs/gryffindor.jpg";
    //             houseDescription = "Courage, bravery, nerve, and chivalry ";
    //             break;
    //     }
    //     domString += `<div class="card" style="width: 13%; background-color: ${houseColor};">
    //     <img src="${housePic}" class="card-img-top" alt="...">
    //     <div class="card-body" style:"background-color: ${houseColor};">
    //     <p class="card-text">${student.studentName}</p>
    //     <hr>
    //     <p class="card-text">${student.studentHouse}</p>
    //     <hr>
    //     <p class="card-text">${houseDescription}</p>
    //     <button class="btn btn-danger" id="delete--${student.studentId}">Expel</button>
    //     </div>
    //         </div>`
    // }