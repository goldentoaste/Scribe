

var ctx = document.getElementById('chart').getContext('2d');

function dateToMD(date) {
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    return '' + (d <= 9 ? '0' + d : d) + '-' + m;
}

//arr, arr, date, int
function initGraph(targetData, currentData, startDate, duration) {
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
                    beginAtZero: true
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
        options:options
    }
    );
    ctx.height = 500;


}



initGraph([1000, 3000, 4000, 2000], [5000,5000,5000,5000], new Date(0), 4);