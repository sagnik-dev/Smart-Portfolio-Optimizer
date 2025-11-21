# 💹 Stock Investment Optimizer

> A modern, interactive web application that helps investors **optimize their stock portfolios** using the **Fractional Knapsack Algorithm** — all running directly in your browser, built with pure HTML, CSS, and JavaScript.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tech](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JavaScript-orange)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## 🚀 Project Overview

**Stock Investment Optimizer** is a sleek, responsive web application that calculates the *optimal investment distribution* among various stocks to **maximize returns** based on user-defined budget constraints.

The app visually represents investments and expected returns using **interactive charts** and provides a **beautiful, glass-style dashboard interface** with **dark/light theme support**.

---

## 🎯 Key Features

✅ **Fractional Knapsack Optimization**  
Smartly divides your investment budget among multiple stocks for maximum returns.  

✅ **Dynamic Data Input**  
Upload your own `.csv` file with stock data or use the default sample dataset.  

✅ **Interactive Charts**  
Beautiful **Chart.js**-based visualizations for investment & return distribution.  

✅ **Dark / Light Mode**  
Auto theme toggle with persistent, aesthetic UI transitions.  

✅ **Fully Client-Side**  
Runs entirely in the browser — no backend or API required.  

✅ **Responsive + Glassmorphism UI**  
Looks and feels like a professional fintech dashboard.

---

## 🧮 Algorithm Used

This project uses the **Fractional Knapsack Algorithm**, a classic greedy approach that selects stocks based on their **return-to-price ratio (efficiency)** until the investment budget is fully utilized.

**Formula:**

\[
\text{Efficiency} = \frac{\text{Expected Return}}{\text{Stock Price}}
\]

Stocks are picked in descending order of efficiency, allowing fractional investments for maximum ROI.

---

## 🧰 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **HTML5** | Structure and content |
| **CSS3 (Glassmorphism + Animations)** | UI design and layout |
| **JavaScript (ES6)** | Core logic and interactivity |
| **Chart.js** | Data visualization |
| **FileReader API** | Parsing uploaded CSV files |

---

## 📂 Project Structure

