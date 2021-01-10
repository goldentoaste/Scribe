


var datas = []
var graphDatas = []
var currentProject = 0
var chart = null;

if (document.getElementById('chart')){
    //for init only
auth.onAuthStateChanged(async user => {
    if (user){
        //await makeNewProject(80000, 30, new Date().getTime(), 'awsd');
        await loadProjects(user);
        if (datas.length > 0){
            displayGraph(0);
        }
    }
})

}

const addButton = document.getElementById('add-button')
if (addButton){
    addButton.addEventListener('click',e => {
        var amount = prompt("How many words to add?", "0");

        if (amount != null && amount != ""){
            updateToday(amount);
        }
    });
}
function updateToday(wordsWrote){
    var project = datas[currentProject];
    const today = new Date().getTime();
    log(today);
    //const avg = Math.round(project['totalWordCount'] / project['days']);

    var pastToday = false;
    var missingWords = 0;
    var todayIndex = 0;
    for (var i = 0; i < project['days']; i++){
        if (!pastToday){
            const curTime = project['startDate'] + 86400000 * (i - 1);
            if(today < curTime){
                pastToday = true;
                project['currentWords'][i] += parseInt(wordsWrote);
                const diff = project['currentWords'][i] - project['targetWords'][i];
                if (diff > 0){
                    missingWords -= diff;
                }
                todayIndex = i;
            }
            else{
                const diff = - project['currentWords'][i] + project['targetWords'][i];
                if (diff > 0){
                    missingWords += diff
                }
            }
        }
        else{
            //going past 'today', add more future days' target
            project['targetWords'][i] += Math.round(missingWords / (project['days'] - todayIndex));
        }
    }

    
    
    db.collection(auth.currentUser.email).doc(project['id']).update({
        currentWords:project['currentWords']
    });
    db.collection(auth.currentUser.email).doc(project['id']).update({
        targetWords:project['targetWords']
    });
    displayGraph(currentProject);
}



function dateToMD(date) {
    date = new Date(date.getTime() + new Date().getTimezoneOffset() * 1000 * 60);
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    return '' + (d <= 9 ? '0' + d : d) + '-' + m;
}



//arr, arr, date, int
function displayGraph(index) {
    var ctx = document.getElementById('chart');
    var project = datas[index];
  
    var data = {
        labels:[],
        datasets:[
            {
                label: "Currentl words",
                backgroundColor: 'rgba(10, 102, 141, 0.3)',
                borderColor:'rgba(10, 102, 141,1)',
                borderWidth: 2,
                data: project['currentWords'],
                
            },
            {
            label:"Target",
            backgroundColor: 'rgba(5,195,154,0.2)',
            borderColor:'rgba(5,195,154,1)',
            borderWidth: 2,
            data: project['targetWords'],
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
                    
                }
            }]
        },
        
    };
    options['scales']['yAxes'][0]['ticks']['suggestedMax'] = Math.max(...project['targetWords']) * 1.25;
    var i;
    for (i=0; i < project['days']; i++){
        //
        data['labels'].push(dateToMD(new Date(project['startDate'] + 86400000 * i)));
    }
    
    

    if (chart == null) {
        chart = new Chart(ctx.getContext('2d'), 
        {  
        type : 'bar',
        data : data,
        options : options,
        events :['click']
    });
    }
    else{
        chart.data = data;
        chart.update();
    }

    

    ctx.onclick = (event) =>{
        log(chart.getElementsAtEvent(event));
    };
  

}

function updateDashBoard(index){

}


async function loadProjects(user){
  
    await db.collection(user.email).where('name', '!=', null).get()
        .then(snapshot =>{
            snapshot.forEach(doc => {
                data = doc.data();
                data["id"] = doc.id; 
                datas.push(data);
            })
        });
    
    const container = document.getElementById("project-container");
    if (container){
        var str = "";

        for (var i = 0; i < datas.length; i++){
            str =str + `<div>
            <div id=${i} style="margin: 8px" class="uk-card uk-height-small uk-width-small uk-card-default uk-card-body">
              <h5 style="text-align: center">${datas[i]['name']}</h5>
            </div>
          </div>`
        }
        container.innerHTML = str;
        for (var i = 0; i < datas.length; i++){
            const k = i;
            document.getElementById(`${k}`).addEventListener('click', e=>{
                currentProject = k;
                displayGraph(k);
                updateDashBoard(k);
                
            });
        }
    }
}


const newButt = document.getElementById("newproject-button");

if (newButt){
    newButt.addEventListener('click',e=>{
        window.location.href = 'newproject.html';
    });
}

const createButton = document.getElementById("create-button");

if (createButton){
  
    createButton.addEventListener('click', async(e) =>{

  
        const title = document.getElementById('title').value;
        const goal = document.getElementById('goal').value;
        const days = document.getElementById('days').value;
        const date = document.getElementById('date').value;
        
        await makeNewProject(parseInt(goal), parseInt(days),new Date(date).getTime(), title);
        window.location.href ="home.html";
    });
}

const logoutButton = document.getElementById("logout-button");
if (logoutButton){
    logoutButton.addEventListener('click', (e) =>{
        auth.signOut();
        window.location.href ="index.html";

    });
}

async function makeNewProject(wordCount, days, startDate, projectName){
    const avg = Math.round(wordCount/days);
    var currentData = [];
    var targetData = [];
    for (var i=0; i < days; i++){
        currentData.push(0);
        targetData.push(avg);
    }
    const email = auth.currentUser.email;
    
    db.collection(email).doc(projectName).set({
        currentWords : currentData,
        targetWords : targetData,
        name: projectName,
        startDate:startDate,
        totalWordCount: wordCount, 
        days: days
    });
    await loadProjects(auth.currentUser);
}




function log(stuff){
    console.log(stuff);
}