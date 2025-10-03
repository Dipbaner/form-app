var nameError = document.getElementById("name-error");
var phoneError = document.getElementById("phone-error");
var emailError = document.getElementById("email-error");
var messageError = document.getElementById("message-error");
var submitError = document.getElementById("submit-error");

function validateName() {
  var name = document.getElementById("contact-name").value;
  if (name.length == 0) {
    nameError.innerHTML = "Name is required";
    return false;
  }
  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = "Write full name";
    return false;
  }

  nameError.innerHTML = "Valid";
  nameError.style = "color : green";
  return true;
}

function validatePhone() {
  var phone = document.getElementById("contact-phone").value;
  if (phone.length !== 10) {
    phoneError.innerHTML = "Phone no. is required";
    phoneError.style = "color : red";
    return false;
  }
  if (!phone.match(/^[0-9]{10}$/)) {
    phoneError.innerHTML = "Write valid phone no.";
    phoneError.style = "color : red";
    return false;
  }

  phoneError.innerHTML = "Valid";
  phoneError.style = "color : green";
  return true;
}

function validateEmail() {
  var email = document.getElementById("contact-email").value;
  if (email.length == 0) {
    emailError.innerHTML = "Email id is required";
    emailError.style = "color : red";
    return false;
  }
  if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
    emailError.innerHTML = "Write valid email id";
    emailError.style = "color : red";
    return false;
  }

  emailError.innerHTML = "Valid";
  emailError.style = "color : green";
  return true;
}

function validateMessage() {
  var message = document.getElementById("contact-message").value;
  var required = 30;
  var left = required - message.length;

  if (left > 0) {
    messageError.innerHTML = left + " more characters required";
    messageError.style = "color : red";
    return false;
  }

  messageError.innerHTML = "Valid";
  messageError.style = "color : green";
  return true;
}
function validateForm() {
  const validName = validateName();
  const validPhone = validatePhone();
  const validEmail = validateEmail();
  const validMessage = validateMessage();

  console.log("Validation status:", {
    validName,
    validPhone,
    validEmail,
    validMessage,
  });

  if (validName && validPhone && validEmail && validMessage) {
    submitError.style.display = "none";
    return true;
  } else {
    submitError.style.display = "block";
    submitError.innerHTML = "Please fix the error to submit";
    submitError.style.color = "red";
    submitError.style.textAlign = "center";
    setTimeout(function () {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
}

// function validateForm() {
//   if (
//     !validateName() ||
//     !validatePhone() ||
//     !validateEmail() ||
//     !validateMessage()
//   ) {
//     submitError.style.display = "block";
//     submitError.innerHTML = "Please fix the error to submit";
//     submitError.style.color = "red";
//     submitError.style.textAlign = "center";
//     setTimeout(function () {
//       submitError.style.display = "none";
//     }, 3000);
//     return false;
//   }
// }

const form = document.getElementById("myForm");
const inputs = form.querySelectorAll("input, textarea");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progress-text");

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    let filled = [...inputs].filter((i) => i.value.trim() !== "").length;
    let percent = Math.round((filled / inputs.length) * 100);

    progress.value = percent;
    progressText.innerText = percent + "% completed";

    // Change color based on percent
    if (percent <= 30) {
      progress.style.setProperty("--progress-color", "red");
    } else if (percent <= 70) {
      progress.style.setProperty("--progress-color", "orange");
    } else {
      progress.style.setProperty("--progress-color", "green");
    }
  });
});

// // Submit Handling with Node.js backend
// form.addEventListener("submit", async function (e) {
//   e.preventDefault(); // prevent default submit

//   if (!validateForm()) return;

//   const data = {
//     name: document.getElementById("contact-name").value,
//     phone: document.getElementById("contact-phone").value,
//     email: document.getElementById("contact-email").value,
//     message: document.getElementById("contact-message").value,
//   };

//   try {
//     const response = await fetch("http://localhost:5000/send", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const result = await response.text();
//     alert(result);

//     form.reset();
//     document.getElementById("progress").value = 0;
//     document.getElementById("progress-text").innerText = "0% completed";
//   } catch (error) {
//     alert("Error sending message.");
//     console.error(error);
//   }
// });

document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    const data = {
      name: document.getElementById("contact-name").value,
      phone: document.getElementById("contact-phone").value,
      email: document.getElementById("contact-email").value,
      message: document.getElementById("contact-message").value,
    };

    fetch("/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log("✅ Server response:", data);
        alert(data);
      })
      .catch((err) => {
        console.error("❌ Submission error:", err);
      });
  } else {
    alert("Please fix validation errors before submitting.");
  }
});
