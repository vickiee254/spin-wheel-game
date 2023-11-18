// Initialize balance and deposit variables
let balance = 0;
let deposit = 0;

// Retrieve DOM elements
const depositInput = document.getElementById("depositInput");
const depositButton = document.getElementById("depositButton");
const balanceDisplay = document.getElementById("balanceDisplay");

// Function to update the balance display
function updateBalance() {
  balanceDisplay.textContent = `sh${balance}`;
}

// Event listener for the deposit button
depositButton.addEventListener("click", () => {
  // Get the deposit amount entered by the user
  const depositAmount = parseFloat(depositInput.value);

  // Check if the entered value is a valid number
  if (!isNaN(depositAmount) && depositAmount > 0) {
    // Add the deposit to the balance
    deposit += depositAmount;
    balance += depositAmount;

    // Update the balance display
    updateBalance();

    // Clear the deposit input field
    depositInput.value = "";
  } else {
    alert("Please enter a valid deposit amount.");
  }
});

/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: 0 },
  { minDegree: 31, maxDegree: 60, value: 20 },
  { minDegree: 0, maxDegree: 30, value: 30 },
  { minDegree: 331, maxDegree: 360, value: 40 },
  { minDegree: 301, maxDegree: 330, value: 50 },
  { minDegree: 271, maxDegree: 300, value: 60 },
  { minDegree: 241, maxDegree: 270, value: 70 },
  { minDegree: 211, maxDegree: 240, value: 80 },
  { minDegree: 181, maxDegree: 210, value: 90 },
  { minDegree: 151, maxDegree: 180, value: 100 },
  { minDegree: 121, maxDegree: 150, value: 110 },
  { minDegree: 91, maxDegree: 120, value: 120 },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#138D75",
  "#F1C40F",
  "#b163da",
  "#E74C3C",
  "#7D3C98",
  "#138D75",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      // Calculate the won amount based on spin value
      const wonAmount = i.value;

      // Add the won amount to the balance
      balance += wonAmount;

      // Update the balance display
      updateBalance();

      // Display the congratulations message with the won amount
      text.innerHTML = `<p>Congratulations, You Have Won KSH${wonAmount}! Your new balance is KSH${balance}.</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Best Of Luck! BY VIC WHEEL</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */
