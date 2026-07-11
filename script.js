const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    maximumFractionDigits: 0
  }).format(value);
}

function calculateBudget() {
  const income = Number(document.getElementById("incomeInput").value);
  const result = document.getElementById("budgetResult");

  if (!income || income <= 0) {
    result.innerHTML = "Enter a valid monthly take-home pay.";
    return;
  }

  const needs = income * 0.5;
  const wants = income * 0.3;
  const savings = income * 0.2;

  result.innerHTML = `
    <strong>Suggested starting split:</strong><br>
    Needs: ${formatMoney(needs)}<br>
    Wants: ${formatMoney(wants)}<br>
    Savings / emergency fund: ${formatMoney(savings)}<br>
    <small>Use this as a starting point, then adjust based on your real expenses.</small>
  `;
}

function calculateHealth() {
  const expenses = Number(document.getElementById("expenseInput").value);
  const savings = Number(document.getElementById("savingInput").value);
  const result = document.getElementById("healthResult");

  if (!expenses || expenses <= 0 || savings < 0) {
    result.innerHTML = "Enter valid monthly expenses and current savings.";
    return;
  }

  const monthsCovered = savings / expenses;

  let status = "Needs attention";
  let note = "Build your emergency fund and track your spending more closely.";

  if (monthsCovered >= 6) {
    status = "Strong";
    note = "You have a solid emergency buffer. Continue reviewing your goals.";
  } else if (monthsCovered >= 3) {
    status = "Moderate";
    note = "You have some buffer, but should continue building savings.";
  }

  result.innerHTML = `
    <strong>Status: ${status}</strong><br>
    Emergency fund coverage: ${monthsCovered.toFixed(1)} month(s)<br>
    <small>${note}</small>
  `;
}

if (themeToggle) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️ Light";
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙 Dark";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️ Light";
    }
  });
}
