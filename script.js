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

function getPositiveNumber(id) {
  const input = document.getElementById(id);
  const value = Number(input.value);

  if (!Number.isFinite(value) || value <= 0 || value > 1000000) {
    input.focus();
    return null;
  }

  return value;
}

function calculateBudget() {
  const income = getPositiveNumber("incomeInput");
  const result = document.getElementById("budgetResult");

  if (income === null) {
    result.innerHTML = "Enter a realistic monthly take-home pay between $1 and $1,000,000.";
    return;
  }

  const needs = income * 0.5;
  const wants = income * 0.3;
  const savings = income * 0.2;

  result.innerHTML = `
    <strong>Suggested starting split</strong>
    <div class="result-breakdown">
      <span>Needs <strong>${formatMoney(needs)}</strong></span>
      <span>Wants <strong>${formatMoney(wants)}</strong></span>
      <span>Savings / emergency fund <strong>${formatMoney(savings)}</strong></span>
    </div>
    <small>For ${formatMoney(income)} take-home pay, this gives you a simple structure to review against your real expenses.</small>
  `;
}

function resetBudget() {
  document.getElementById("incomeInput").value = "";
  document.getElementById("budgetResult").textContent = "Your suggested budget will appear here.";
}

function calculateHealth() {
  const expenses = getPositiveNumber("expenseInput");
  const savingInput = document.getElementById("savingInput");
  const savings = Number(savingInput.value);
  const result = document.getElementById("healthResult");

  if (expenses === null || !Number.isFinite(savings) || savings < 0 || savings > 10000000) {
    savingInput.focus();
    result.innerHTML = "Enter realistic values: expenses above $0 and savings between $0 and $10,000,000.";
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

  const score = Math.min(100, Math.round((monthsCovered / 6) * 100));

  result.innerHTML = `
    <strong>${score}/100 — ${status}</strong>
    <div class="score-meter" aria-label="Financial health score: ${score} out of 100">
      <span style="width: ${score}%"></span>
    </div>
    <strong>Emergency fund coverage: ${monthsCovered.toFixed(1)} month(s)</strong><br>
    <small>${note} A score closer to 100 means your current savings cover more of a six-month emergency buffer.</small>
  `;
}

function resetHealth() {
  document.getElementById("expenseInput").value = "";
  document.getElementById("savingInput").value = "";
  document.getElementById("healthResult").textContent = "Your readiness score will appear here.";
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
