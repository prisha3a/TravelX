// ===============================
// TravelX Frontend JS (Basic)
// Tech: Bootstrap + Vanilla JS
// ===============================

// Set active link automatically
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
});

// Booking Form Submission (frontend only)
function handleBooking(event) {
  event.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const destination = document.getElementById("destination").value;
  const date = document.getElementById("travelDate").value;

  if (!name || !email || !destination || !date) {
    alert("⚠️ Please fill all required fields!");
    return;
  }

  alert(`✅ Booking Request Submitted!
Name: ${name}
Destination: ${destination}
Date: ${date}

(Backend not connected yet)`);

  event.target.reset();
}
