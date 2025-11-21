let investmentChart, returnChart;

// Default stock data
const defaultStocks = [
  { Stock: "Apple", Price: 180, Expected_Return: 22 },
  { Stock: "Google", Price: 130, Expected_Return: 18 },
  { Stock: "Amazon", Price: 145, Expected_Return: 25 },
  { Stock: "Tesla", Price: 210, Expected_Return: 40 },
  { Stock: "Meta", Price: 115, Expected_Return: 15 },
  { Stock: "Netflix", Price: 155, Expected_Return: 28 },
  { Stock: "Microsoft", Price: 135, Expected_Return: 20 },
];

// Parse uploaded CSV
function parseCSV(file, callback) {
  const reader = new FileReader();
  reader.onload = e => {
    const rows = e.target.result.trim().split("\n");
    const headers = rows.shift().split(",");
    const data = rows.map(r => {
      const values = r.split(",");
      const obj = {};
      headers.forEach((h, i) => obj[h.trim()] = values[i].trim());
      return obj;
    });
    callback(data);
  };
  reader.readAsText(file);
}

// Fractional Knapsack Algorithm
function fractionalKnapsack(stocks, budget) {
  stocks.forEach(s => {
    s.Price = parseFloat(s.Price);
    s.Expected_Return = parseFloat(s.Expected_Return);
    s.Efficiency = s.Expected_Return / s.Price;
  });

  stocks.sort((a, b) => b.Efficiency - a.Efficiency);
  const portfolio = [];
  let remaining = budget;

  for (let s of stocks) {
    if (remaining <= 0) break;
    const fraction = Math.min(1, remaining / s.Price);
    const invested = fraction * s.Price;
    const returnAmt = fraction * s.Expected_Return;
    remaining -= invested;
    portfolio.push({
      Stock: s.Stock,
      Price: s.Price,
      Fraction: fraction,
      Invested: invested,
      Return_Amount: returnAmt,
      ROI: ((returnAmt / invested) * 100).toFixed(2),
    });
  }
  return portfolio;
}

// Main Function
function optimizePortfolio() {
  const budget = parseFloat(document.getElementById("budget").value);
  if (!budget || budget <= 0) {
    alert("⚠️ Please enter a valid budget!");
    return;
  }

  const file = document.getElementById("data").files[0];
  if (file) parseCSV(file, data => processPortfolio(data, budget));
  else processPortfolio(defaultStocks, budget);
}

function processPortfolio(data, budget) {
  const portfolio = fractionalKnapsack(data, budget);

  const invested = portfolio.reduce((sum, s) => sum + s.Invested, 0);
  const totalReturn = portfolio.reduce((sum, s) => sum + s.Return_Amount, 0);
  const roi = ((totalReturn / invested) * 100).toFixed(2);

  document.getElementById("results").classList.remove("hidden");
  document.getElementById("summary-invested").innerText = `$${invested.toFixed(2)}`;
  document.getElementById("summary-return").innerText = `$${totalReturn.toFixed(2)}`;
  document.getElementById("summary-roi").innerText = `${roi}%`;

  renderTable(portfolio);
  renderCharts(portfolio);
}

// Table render
function renderTable(portfolio) {
  const tbody = document.querySelector("#portfolio-table tbody");
  tbody.innerHTML = "";
  portfolio.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.Stock}</td>
        <td>${p.Price.toFixed(2)}</td>
        <td>${(p.Fraction * 100).toFixed(1)}%</td>
        <td>${p.Invested.toFixed(2)}</td>
        <td>${p.Return_Amount.toFixed(2)}</td>
        <td>${p.ROI}%</td>
      </tr>
    `;
  });
}

// Charts
function renderCharts(portfolio) {
  const labels = portfolio.map(p => p.Stock);
  const invested = portfolio.map(p => p.Invested);
  const returns = portfolio.map(p => p.Return_Amount);

  if (investmentChart) investmentChart.destroy();
  if (returnChart) returnChart.destroy();

  investmentChart = new Chart(document.getElementById("investmentChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{ label: "Investment ($)", data: invested, backgroundColor: "rgba(59,130,246,0.7)" }],
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } },
  });

  returnChart = new Chart(document.getElementById("returnChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{ label: "Expected Return ($)", data: returns, backgroundColor: "rgba(34,197,94,0.7)" }],
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } },
  });
}

// Dark / Light Theme
function toggleTheme() {
  document.body.classList.toggle("dark");
  const icon = document.querySelector(".theme-toggle");
  icon.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}
