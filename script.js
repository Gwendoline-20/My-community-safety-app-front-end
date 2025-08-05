// ===== Panic Button (index.html) =====
const panicBtn = document.getElementById("panicBtn");
if (panicBtn) {
  panicBtn.addEventListener("click", function () {
    const area = document.getElementById("areaSelect").value;

    if (!area) {
      alert("⚠️ Please select your area before continuing.");
      return;
    }

    // Save selected area for use on form.html
    localStorage.setItem("selectedArea", area);

    fetch("http://127.0.0.1:8000/send_alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        area: area,
        name: "Anonymous",
        phone: "Not Provided",
        incident: "🚨 Panic Button Pressed"
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        document.getElementById("confirmation").classList.remove("hidden");
        document.getElementById("areaDisplay").textContent = area;
      } else {
        alert("❌ Error: " + data.message);
      }
    })
    .catch(err => alert("❌ Could not send alert. Check API connection."));
  });
}

// ===== User Info Form (form.html) =====
const submitBtn = document.getElementById("submitBtn");
if (submitBtn) {
  submitBtn.addEventListener("click", function () {
    const name = document.getElementById("userName").value.trim();
    const phone = document.getElementById("userPhone").value.trim();
    const area = localStorage.getItem("selectedArea") || "Unknown Area";

    if (!name || !phone) {
      alert("⚠️ Please fill in both your name and cellphone number.");
      return;
    }

    fetch("http://127.0.0.1:8000/send_alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        area: area,
        name: name,
        phone: phone,
        incident: "User provided details"
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        document.getElementById("confirmation").classList.remove("hidden");
      } else {
        alert("❌ Failed to send: " + data.message);
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("❌ An error occurred while sending your details.");
    });
  });
}
