document
  .getElementById("bookingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const service = document.getElementById("service").value;
    const raand = document.getElementById("raand").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const confirmation = document.getElementById("confirmation");
    const details = document.getElementById("confirmationDetails");

    details.innerHTML = `
    Thank you, <strong>${name}</strong>!<br>
    Your appointment for <strong>${service}</strong> is confirmed on <strong>${date}</strong> at <strong>${time}</strong> with raand <strong>${raand}</strong>.
  `;

    confirmation.classList.remove("hidden");

    this.reset();
  });
