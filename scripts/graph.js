
var ctx = document.getElementById('chart').getContext('2d');

datas = []

function dateToMD(date) {
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    return '' + (d <= 9 ? '0' + d : d) + '-' + m;
}

//arr, arr, date, int
function initGraph(targetData, currentData, startDate, duration) {
    console.log();
    var data = {
        labels:[],
        datasets:[
            {
            label:"Target",
            backgroundColor: 'rgba(5,195,154,0.2)',
            borderColor:'rgba(5,195,154,1)',
            borderWidth: 1,
            data: targetData,
        }, 
        {
            label: "Currentl words",
            backgroundColor: 'rgba(10, 102, 141, 0.2)',
            borderColor:'rgba(10, 102, 141,1)',
            borderWidth: 1,
            data: currentData
        }
    ]
    };
  
   

    var options = {
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: false,
                ticks: {
                    beginAtZero: true,
                    suggestedMax: (Math.max(...currentData) * 1.25)
                }
            }]
        },
        
    };

    var i;
    for (i=0; i < duration; i++){
        data['labels'].push(dateToMD(new Date(startDate.getTime() + 86400000 * i)));
    }
    

    

    var chart = new Chart(ctx, 
        {
        type : 'bar',
        data: data,
        options:options,
    }
    );
   


    for (i=4; i < duration+4; i++){
        data['labels'].push(dateToMD(new Date(startDate.getTime() + 86400000 * i)));
        data['datasets'][1]['data'].push(2000);
    }
    chart.update();
}




function makeNewProject(wordCount, days, startDate, projectName){
    const avg = Math.round(wordCount/days);
    var currentData = [];
    var targetData = [];
    for (var i=0; i < days, i++;){
        currentData.push(0);
        targetData.push(avg);
    }
    console.log(auth.currentUser);
    const email = auth.currentUser.email;
    
    db.collection(email).doc(''+startDate).set({
        currentWords : currentData,
        targetWords : targetData,
        name: projectName,
        startDate:startDate,
        totalWordCount: wordCount, 
        days: days
    })
}

window.onload  = makeNewProject(80000, 30, new Date(), 'awosd');