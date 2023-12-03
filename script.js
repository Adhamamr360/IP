const path = window.location.pathname;
const page = path.split("/").pop();

const paymentList = document.getElementById("paymentList");
const paymentSelect = document.getElementById("paymentSelect");
const creditElement = document.querySelector(".credit p");
const totalAmountElement = document.querySelector(".total-amount p");

let credit = 800;
let totalAmount = 900;

function handlePayment() {
  const selectedPaymentOption =
    paymentSelect.options[paymentSelect.selectedIndex];
  const paymentAmount = parseInt(selectedPaymentOption.dataset.amount);

  if (credit >= paymentAmount) {
    credit -= paymentAmount;
    creditElement.textContent = `Your Credit: $${credit}`;
    totalAmount -= paymentAmount;
    totalAmountElement.textContent = `Total Required Amount: $${totalAmount}`;
    const paymentId = selectedPaymentOption.value;
    removePayment(paymentId);
  } else {
    alert("Insufficient credit to cover the payment.");
  }
}

function removePayment(paymentId) {
  const listItem = document.getElementById(paymentId);
  if (listItem) {
    listItem.remove();
  }

  const optionToRemove = Array.from(paymentSelect.options).find(
    (option) => option.value === paymentId
  );
  if (optionToRemove) {
    optionToRemove.remove();
  }
}

if (page === "home.html" || page === "index.html" || page === "previous.html") {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

if (page === "C&S.html" || page === "xC&S.html") {
  function submitFeedback() {
    const feedbackType = document.querySelector(
      'input[name="feedbackType"]:checked'
    );
    const feedbackText = document.getElementById("feedbackText");

    if (feedbackType && feedbackText.value.trim() !== "") {
      alert(
        `Feedback Type: ${feedbackType.value}\nFeedback Text: ${feedbackText.value}`
      );

      feedbackText.value = "";
      document.querySelector(
        'input[name="feedbackType"]:checked'
      ).checked = false;
      document.getElementById("feedbackBox").style.display = "none";
    } else {
      alert("Please provide feedback text.");
    }
  }

  document
    .querySelectorAll('input[name="feedbackType"]')
    .forEach(function (radio) {
      radio.addEventListener("change", function () {
        const feedbackBox = document.getElementById("feedbackBox");
        const feedbackText = document.getElementById("feedbackText");

        if (radio.value === "complaint") {
          feedbackText.placeholder = "Type your complaint here...";
        } else if (radio.value === "suggestion") {
          feedbackText.placeholder = "Type your suggestion here...";
        }

        feedbackBox.style.display = "block";
      });
    });
}

const users = [];

function performSignUp() {
  const fullName = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!fullName || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = storedUsers.some((user) => user.email === email);

  if (userExists) {
    alert("Email already exists. Please use a different email.");
  } else {
    storedUsers.push({ fullName, email, password });
    // Store the updated array in local storage
    localStorage.setItem("users", JSON.stringify(storedUsers));

    alert("Sign up successful. You can now log in.");
    window.location.href = "login.html";
  }
}

function performLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  const user = storedUsers.find((user) => user.email === email);

  if (!user) {
    alert("Email not found. Please sign up.");
  } else if (user.password !== password) {
    alert("Incorrect password. Please try again.");
  } else {
    localStorage.setItem("loggedin", JSON.stringify(user));
    alert(`Welcome, ${user.fullName}! You are now logged in.`);
    window.location.href = "home.html";
  }
}

function calculateSemesterGPA(semesterId) {
  const semester = document.getElementById(semesterId);
  const subjects = semester.querySelectorAll(".subject");
  let totalCreditHours = 0;
  let totalGradePoints = 0;

  subjects.forEach((subject) => {
    const creditHours = parseInt(
      subject.querySelector("p:nth-child(2)").textContent.split(" ")[2]
    );
    const grade = subject
      .querySelector("p:nth-child(3)")
      .textContent.split(" ")[1];

    let gradePoint;
    switch (grade) {
      case "A":
        gradePoint = 4.0;
        break;
      case "A-":
        gradePoint = 3.7;
        break;
      case "B+":
        gradePoint = 3.3;
        break;
      case "B":
        gradePoint = 3.0;
        break;
      case "B-":
        gradePoint = 2.7;
        break;
      case "C+":
        gradePoint = 2.3;
        break;
      case "C":
        gradePoint = 2.0;
        break;
      case "C-":
        gradePoint = 1.7;
        break;
      case "D+":
        gradePoint = 1.3;
        break;
      case "D":
        gradePoint = 1;
        break;

      default:
        gradePoint = 0.0;
    }

    totalCreditHours += creditHours;
    totalGradePoints += creditHours * gradePoint;
  });

  const semesterGPA = totalGradePoints / totalCreditHours;
  const resultContainer = document.createElement("div");
  resultContainer.innerHTML = `<p>Semester GPA: ${semesterGPA.toFixed(
    2
  )}</p><p>Total Credit Hours: ${totalCreditHours}</p>`;
  semester.appendChild(resultContainer);
}

if (page === "previous.html") {
  calculateSemesterGPA("semester1");
  calculateSemesterGPA("semester2");
}

function logout() {
  localStorage.removeItem("loggedin");
  window.location.href = "login.html";
}

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}

function updateAccountInfo() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedin"));

  if (loggedInUser) {
    const usernameElement = document.getElementById("username");
    if (usernameElement) {
      usernameElement.textContent = `Username: ${loggedInUser.fullName}`;
    }
  }
}
updateAccountInfo();

if (page === "game.html") {
  function startGame() {
    const userName = document.getElementById("nameInput").value;

    document.getElementById("userName").textContent = userName;
  }

  function changeFontSize(action) {
    const displayElement = document.getElementById("display");
    const currentSize = parseInt(
      window.getComputedStyle(displayElement).fontSize
    );

    if (action === "expand") {
      displayElement.style.fontSize = `${currentSize + 2}px`;
    } else if (action === "shrink" && currentSize > 2) {
      displayElement.style.fontSize = `${currentSize - 2}px`;
    }
  }

  function changeColor() {
    const displayElement = document.getElementById("display");
    const randomColor = getRandomColor();
    displayElement.style.color = randomColor;
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function exitGame() {
    window.location.href = "index.html";
  }
}
