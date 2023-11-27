// Get elements by ID
const paymentList = document.getElementById("paymentList");
const paymentSelect = document.getElementById("paymentSelect");
const creditElement = document.querySelector(".credit p");
const totalAmountElement = document.querySelector(".total-amount p");

let credit = 800;
let totalAmount = 900;

// Function to handle payment
function handlePayment() {
    // Get the selected payment option
    const selectedPaymentOption = paymentSelect.options[paymentSelect.selectedIndex];
  
    // Get the payment amount from the data-amount attribute
    const paymentAmount = parseInt(selectedPaymentOption.dataset.amount);
  
    // Check if credit can cover the payment
    if (credit >= paymentAmount) {
      // Deduct the payment amount from credit
      credit -= paymentAmount;
  
      // Update credit and total amount elements
      creditElement.textContent = `Your Credit: $${credit}`;
      totalAmount -= paymentAmount;
      totalAmountElement.textContent = `Total Required Amount: $${totalAmount}`;
  
      // Remove the paid payment from the list and dropdown
      const paymentId = selectedPaymentOption.value;
      removePayment(paymentId);
    } else {
      alert("Insufficient credit to cover the payment.");
    }
  }
  
  // Function to remove a payment from the list and dropdown
  function removePayment(paymentId) {
    // Remove the payment from the list
    const listItem = document.getElementById(paymentId);
    if (listItem) {
      listItem.remove();
    }
  
    // Remove the payment from the dropdown
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



  
