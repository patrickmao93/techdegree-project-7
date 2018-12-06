"use strict";

class ToggleButton {
    constructor(dom, defaultState = 'on') {
        this.dom = dom;
        this.state = defaultState;
        if (defaultState === 'on') {
            this.dom.children[0].style.left = '0px';
            this.dom.children[0].style.background = '#727ABF';
        } else {
            this.dom.children[0].style.left = '-46px';
            this.dom.children[0].style.background = '#B3B3B3';
        }
    }

    toggle() {
        if (this.state === 'on') {
            this.state = 'off';
            this.dom.children[0].style.left = '-46px';
            this.dom.children[0].style.background = '#B3B3B3';
        } else {
            this.state = 'on';
            this.dom.children[0].style.left = '0px';
            this.dom.children[0].style.background = '#727ABF';
        }
    }
}
const toggle1 = document.getElementById('toggle1');
const toggle2 = document.getElementById('toggle2');
const checkbox1 = document.getElementById('sendNotification');
const checkbox2 = document.getElementById('profilePublic');
const saveBtn = document.getElementById('saveBtn');

const nav = document.getElementById('nav');
const alert = document.getElementById('message');
const search = document.getElementById("search");
const icnClose = document.getElementById('icnClose');
const traffic = document.getElementById("chartTraffic").getContext('2d');
const trafficChartOptions = document.getElementById('trafficChartOptions');
const dailyTraffic = document.getElementById("chartDailyTraffic").getContext('2d');
const mobileUsers = document.getElementById("chartMobileUsers").getContext('2d');
const messageForm = document.getElementById('message-form');
let searchFocusState = false;

//////////////////////////////////////////////////
//function showMessage
//input: name - user name the message is sent to 
//       type - message type
//return: none
//////////////////////////////////////////////////
const showMessage = (message, type) => {
    let color;
    switch (type) {
        case 'success':
            alert.children[0].textContent = message;
            color = '#7DC991';
            break;

        default:
            alert.children[0].innerHTML = '<span class="bold">Alert: </span>You know nothing about charts, Jon Snow.'
            color = '#dfc75f';
            break;
    }
    alert.style.borderLeftColor = color;
    alert.classList.add('message--show');
}


//////////////////////////////////////////////////
//function hideMessage
//input: none
//return: none
//////////////////////////////////////////////////
const hideMessage = () => {
    alert.classList.remove('message--show');
}


//////////////////////////////////////////////////
//function setChartData
//input: chartObject, label string array, data array, option button index
//return: none
//////////////////////////////////////////////////
const setChartData = (chart, labelArr, dataArr, index) => {
    chart.data.labels = labelArr[index];
    chart.data.datasets[0].data = dataArr[index];
}

////////////////////////////////////////////////////////////////////////////////
//-------------------------------initialization---------------------------------
////////////////////////////////////////////////////////////////////////////////
//show message when page loads
showMessage();

//if first time here, set both toggle to 'on'
if (localStorage.sendNotification === undefined || localStorage.profilePublic === undefined) {
    localStorage.sendNotification = 'on';
    localStorage.profilePublic = 'off';
}
//initialize toggle buttons
const toggleBtn1 = new ToggleButton(toggle1, localStorage.sendNotification);
const toggleBtn2 = new ToggleButton(toggle2, localStorage.profilePublic);

//////////////////////////////////////////////////////////////////////////////////
//-------------------------UI nteraction handlers---------------------------------
//////////////////////////////////////////////////////////////////////////////////
for (let i = 0; i < nav.children.length; i++) {
    let navItem = nav.children[i];
    navItem.addEventListener('click', e => {
        let targetDiv = document.getElementById('widget' + (i + 1));
        targetDiv.scrollIntoView({
            behavior: 'smooth', 
            block: 'start'
        });
        
        for (let j = 0; j < nav.children.length; j++) {
            let navItem = nav.children[j];
            navItem.classList.remove('sidebar__icon--active');
        }

        navItem.classList.add('sidebar__icon--active');
    });
}

//close message when user clicks on x
icnClose.addEventListener('click', e => {
    hideMessage();
});

//search hover state and edit state functionsalities
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

//On form submit, inform user message is sent
messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('sendName').value;
    const alertMsg = 'Message successfully sent to ' + name
    showMessage(alertMsg, 'success');   
    //hide message after 3 secs
    setTimeout(() => {
        hideMessage();
    }, 3000);
});

//toggle button 1 functionality
toggle1.addEventListener('click', e => {
    toggleBtn1.toggle();
});
//toggle button 2 functionality
toggle2.addEventListener('click', e => {
    toggleBtn2.toggle();
});

saveBtn.addEventListener('click', e => {
    localStorage.sendNotification = toggleBtn1.state;
    localStorage.profilePublic = toggleBtn2.state;
});


//////////////////////////////////////////////////////////////////////////////////
//-----------------------------Chart initialization-------------------------------
//////////////////////////////////////////////////////////////////////////////////
//--------------------------------traffic chart---------------------------------
const trafficLabels = [
    ["0:00", "2:00", "4:00", "6:00", "8:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
    ["day1", "day2", "day3", "day4", "day5", "day6", "day7"],
    ["week1", "week2", "week3", "week3", "week4", "week5", "week6", "week7", "week8", "week9", "week10", "week11"],
    ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
];
const trafficData = [
    [750, 1250, 750, 750, 1750, 1750, 1250, 1000, 800, 930, 300, 400],
    [1000, 1200, 900, 935, 950, 1250, 1400],
    [0, 750, 1250, 1000, 2000, 1500, 1750, 1250, 1750, 2250, 1750, 2250],
    [800, 900, 800, 834, 855, 890, 1000, 988, 912, 940, 1032, 1100],
];

const chartTraffic = new Chart(traffic, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: trafficLabels[2],
        datasets: [{
            backgroundColor: 'rgb(116, 122, 191, 0.3)',
            borderColor: 'rgb(116, 122, 191)',
            borderWidth: '1',
            pointRadius: '6',
            pointBackgroundColor: '#FFFFFF',
            pointBorderWidth: '2',
            data: trafficData[2],
            lineTension: 0
        }]
    },
    options: {
        responsive: true,
        aspectiRatio: 3,
        legend: false,
    }
});

//traffic chart "display by time" options
trafficChartOptions.addEventListener('click', e => {
    let target = e.target;
    //add/remove highlight
    if (target.className !== 'chart-header__options') { //prevents from clicking on ul 
        target.classList.add('chart-header__options__item--active');
        let lis = trafficChartOptions.children;
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i];
            if (li !== target) {
                li.classList.remove('chart-header__options__item--active');
            }
        }
    }

    switch (target.textContent) {
        case 'Hourly':
            setChartData(chartTraffic, trafficLabels, trafficData, 0);
            break;

        case 'Daily':
            setChartData(chartTraffic, trafficLabels, trafficData, 1);
            break;

        case 'Weekly':
            setChartData(chartTraffic, trafficLabels, trafficData, 2);
            break;

        case 'Monthly':
            setChartData(chartTraffic, trafficLabels, trafficData, 3);
            break;

        default:
            break;
    }

    chartTraffic.update();
});

//--------------------------------end traffic chart---------------------------------


//--------------------------------daily traffic chart---------------------------------
const chartDailyTraffic = new Chart(dailyTraffic, {
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
const mobileUsersChart = new Chart(mobileUsers, {
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

//When 'responsive' option is set to 'true', the charts are supposed to resize themselves upon window resize. 
//This part exists because there is a weird bug prevents the charts to resize properly when window is sized down
window.addEventListener('resize', e => {
    chartDailyTraffic.resize();
});
