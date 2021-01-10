
var ctx = document.getElementById('chart').getContext('2d');
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
  
    var plugins = {
        zoom: {
            // Container for pan options
            pan: {
                // Boolean to enable panning
                enabled: true,
    
                // Panning directions. Remove the appropriate direction to disable
                // Eg. 'y' would only allow panning in the y direction
                // A function that is called as the user is panning and returns the
                // available directions can also be used:
                //   mode: function({ chart }) {
                //     return 'xy';
                //   },
                mode: 'xy',
    
                rangeMin: {
                    // Format of min pan range depends on scale type
                    x: null,
                    y: null
                },
                rangeMax: {
                    // Format of max pan range depends on scale type
                    x: null,
                    y: null
                },
    
                // On category scale, factor of pan velocity
                speed: 20,
    
                // Minimal pan distance required before actually applying pan
                threshold: 10,
    
                // Function called while the user is panning
                onPan: function({chart}) { console.log(`I'm panning!!!`); },
                // Function called once panning is completed
                onPanComplete: function({chart}) { console.log(`I was panned!!!`); }
            },
    
            // Container for zoom options
            zoom: {
                // Boolean to enable zooming
                enabled: true,
    
                // Enable drag-to-zoom behavior
                drag: true,
    
                // Drag-to-zoom effect can be customized
                // drag: {
                // 	 borderColor: 'rgba(225,225,225,0.3)'
                // 	 borderWidth: 5,
                // 	 backgroundColor: 'rgb(225,225,225)',
                // 	 animationDuration: 0
                // },
    
                // Zooming directions. Remove the appropriate direction to disable
                // Eg. 'y' would only allow zooming in the y direction
                // A function that is called as the user is zooming and returns the
                // available directions can also be used:
                //   mode: function({ chart }) {
                //     return 'xy';
                //   },
                mode: 'xy',
    
                rangeMin: {
                    // Format of min zoom range depends on scale type
                    x: null,
                    y: null
                },
                rangeMax: {
                    // Format of max zoom range depends on scale type
                    x: null,
                    y: null
                },
    
                // Speed of zoom via mouse wheel
                // (percentage of zoom on a wheel event)
                speed: 0.1,
    
                // Minimal zoom distance required before actually applying zoom
                threshold: 2,
    
                // On category scale, minimal zoom level before actually applying zoom
                sensitivity: 3,
    
                // Function called while the user is zooming
                onZoom: function({chart}) { console.log(`I'm zooming!!!`); },
                // Function called once zooming is completed
                onZoomComplete: function({chart}) { console.log(`I was zoomed!!!`); }
            }
        }
    }

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
        plugins: {
            zoom: {
                // Container for pan options
                pan: {
                    // Boolean to enable panning
                    enabled: true,

                    // Panning directions. Remove the appropriate direction to disable 
                    // Eg. 'y' would only allow panning in the y direction
                    mode: 'xy'
                },

                // Container for zoom options
                zoom: {
                    // Boolean to enable zooming
                    enabled: true,

                    // Zooming directions. Remove the appropriate direction to disable 
                    // Eg. 'y' would only allow zooming in the y direction
                    mode: 'xy',
                }
            }
        }
    }
    
    );
   


    for (i=4; i < duration+4; i++){
        data['labels'].push(dateToMD(new Date(startDate.getTime() + 86400000 * i)));
        data['datasets'][1]['data'].push(2000);
    }
    chart.update();
}



initGraph([1000, 3000, 4000, 2000], [5000,5000,5000,5000], new Date(0), 4);