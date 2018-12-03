"use strict";

//show message at top
const message = document.getElementById('message');
message.style.display = 'block';

const search = document.getElementById("search");
let searchFocusState = false;

search.addEventListener('mouseenter', e => {
    search.classList.add('search__input--is-hovered');
});
search.addEventListener('mouseleave', e => {
    if (!searchFocusState) {
        search.classList.remove('search__input--is-hovered');
    }
});
search.addEventListener('focusin', e => {
    searchFocusState = true;
    search.classList.add('search__input--is-focused');
});
search.addEventListener('focusout', e => {
    searchFocusState = false;
    search.classList.remove('search__input--is-hovered');
    search.classList.remove('search__input--is-focused');
});    

const icnClose = document.getElementById('icnClose');

icnClose.addEventListener('click', e => {
    message.style.display = 'none';
});


//--------------------------------traffic chart---------------------------------
const traffic = document.getElementById("chartTraffic").getContext('2d');
var chartTraffic = new Chart(traffic, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["16-22", "25-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
        datasets: [{
            backgroundColor: 'rgb(116, 122, 191, 0.3)',
            borderColor: 'rgb(116, 122, 191)',
            borderWidth: '1',
            pointRadius: '6',
            pointBackgroundColor: '#FFFFFF',
            pointBorderWidth: '2',
            data: [0, 750, 1250, 1000, 2000, 1500, 1750, 1250, 1750, 2250, 1750, 2250],
            lineTension: 0
        }]
    }, 
    options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: false,
    }
});
//--------------------------------end traffic chart---------------------------------


//--------------------------------daily traffic chart---------------------------------
const dailyTraffic = document.getElementById("chartDailyTraffic").getContext('2d');
var chartDailyTraffic = new Chart(dailyTraffic, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
            labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            datasets: [{
            backgroundColor: 'rgb(116, 122, 191)',
            data: [75, 100, 175, 125, 225, 200, 100]
        }]
    }, 
    options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: false,
    }
});
//--------------------------------end daily traffic chart---------------------------------

//--------------------------------Mobile users chart---------------------------------
const mobileUsers = document.getElementById("chartMobileUsers").getContext('2d');
var mobileUsersChart = new Chart(mobileUsers, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [10, 10, 40],
            backgroundColor: ['#7DC991', '#6FB2C0', '#727ABF'],
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Phones',
            'Tablets',
            'Desktop'
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
            position: 'right',
            labels: {
                boxWidth: 20,
                fontSize: 14,
                padding: 22,
            }
        }
    }
});
//--------------------------------end mobile users chart---------------------------------

//--------------------------------end daily traffic chart---------------------------------
//--------------------------------end daily traffic chart---------------------------------
//--------------------------------end daily traffic chart---------------------------------
window.addEventListener('resize', e => {
    chartDailyTraffic.resize();
});