// sidepanel.js - Chrome Extension Side Panel
const analyseFunctionUrl = "https://political-leaning-article.azurewebsites.net/api/HttpTrigger";
const searchFunctionUrl = "https://political-leaning-article.azurewebsites.net/api/HttpTrigger1";

document.addEventListener("DOMContentLoaded", () => {
    const analyticsButton = document.getElementById("analyticsButton");
    const switchButton = document.getElementById("switchButton");
    const searchButton = document.getElementById("searchButton");

    if (analyticsButton) analyticsButton.addEventListener("click", getCurrentUrl);
    if (switchButton) switchButton.addEventListener("click", switchAnalysis);
    if (searchButton) searchButton.addEventListener("click", switchSearch);

    initializeChart();
});



function initializeChart() {
    var analysisChart = new Chart(document.getElementById('analysisChart'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{ 
                data: [],
                label: "Positive",
                borderColor: "#8ac926",
                fill: false
            }, { 
                data: [],
                label: "Negative",
                borderColor: "#FF595E",
                fill: false
            }, { 
                data: [],
                label: "Neutral",
                borderColor: "#FFCA3A",
                fill: false
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Sentiment Analysis'
            }, 
        }
    });
}

function getCurrentUrl() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let url = tabs[0].url;
        analyseFunction(url);
    });
}

async function analyseFunction(url) {
    const response = await fetch(analyseFunctionUrl + "?url=" + encodeURIComponent(url));
    const jsonData = await response.json();
    updateChart(jsonData);
}

function updateChart(data) {
    let chart = Chart.instances[0];
    chart.data.labels.push(chart.data.labels.length + 1);
    chart.data.datasets[0].data.push(data.positive);
    chart.data.datasets[1].data.push(data.negative);
    chart.data.datasets[2].data.push(data.neutral);
    chart.update();
}