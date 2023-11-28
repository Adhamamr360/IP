
const paymentList = document.getElementById("paymentList");
const paymentSelect = document.getElementById("paymentSelect");
const creditElement = document.querySelector(".credit p");
const totalAmountElement = document.querySelector(".total-amount p");

let credit = 800;
let totalAmount = 900;


function handlePayment() {
    const selectedPaymentOption = paymentSelect.options[paymentSelect.selectedIndex];
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
  
    const optionToRemove = Array.from(paymentSelect.options).find(option => option.value === paymentId);
    if (optionToRemove) {
      optionToRemove.remove();
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click",function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior : "smooth"
        })
    })
  })

  function submitFeedback() {
    const feedbackType = document.querySelector('input[name="feedbackType"]:checked');
    const feedbackText = document.getElementById('feedbackText');

    if (feedbackType && feedbackText.value) {
        alert(`Feedback Type: ${feedbackType.value}\nFeedback Text: ${feedbackText.value}`);

        feedbackText.value = ''; 
        document.querySelector('input[name="feedbackType"]:checked').checked = false; 
        document.getElementById('feedbackBox').style.display = 'none'; 
        alert('Please choose feedback type and provide feedback text.');
    }
}

document.querySelectorAll('input[name="feedbackType"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        const feedbackBox = document.getElementById('feedbackBox');
        const feedbackText = document.getElementById('feedbackText');
        
        if (radio.value === 'complaint') {
            feedbackText.placeholder = 'Type your complaint here...';
        } else if (radio.value === 'suggestion') {
            feedbackText.placeholder = 'Type your suggestion here...';
        }

        feedbackBox.style.display = 'block';
    });
});


const users = [];


function performSignUp() {
  const fullName = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!fullName || !email || !password) {
      alert('Please fill in all fields.');
      return;
  }

  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = storedUsers.some(user => user.email === email);

  if (userExists) {
      alert('Email already exists. Please use a different email.');
  } else {

      storedUsers.push({ fullName, email, password });
      // Store the updated array in local storage
      localStorage.setItem('users', JSON.stringify(storedUsers));

      alert('Sign up successful. You can now log in.');
      window.location.href = 'login.html';
  }
}


function performLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Retrieve stored users from local storage
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  const user = storedUsers.find(user => user.email === email);

  if (!user) {
      alert('Email not found. Please sign up.');
  } else if (user.password !== password) {
      alert('Incorrect password. Please try again.');
  } else {
      alert(`Welcome, ${user.fullName}! You are now logged in.`);
      window.location.href = 'home.html';
  }
}






  
