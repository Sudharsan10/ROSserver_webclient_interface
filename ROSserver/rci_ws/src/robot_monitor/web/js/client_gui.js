var ros = new ROSLIB.Ros({
    url : 'ws://129.2.171.12:9090'
});


Plotly.plot('sensor-data-plot', [{ 
    y:[0],
    type: 'line',
}, {
    autosize: true,
    margin: {
        l: 10,
        r: 10
    }
}]);

ros.on('connection', function() {
    document.getElementById("status").innerHTML = "<img src=\"https://img.shields.io/badge/Status-Connected-brightgreen\" />";
});

ros.on('error', function(error) {
    document.getElementById("status").innerHTML = "<img src=\"https://img.shields.io/badge/Status-Error-Red\"/>";
});

ros.on('close', function() {
    document.getElementById("status").innerHTML = "<img src=\"https://img.shields.io/badge/Status-Closed-inactive\"/>";
});

// Initialise the var for each topic of interest
var topic_sensor_data = new ROSLIB.Topic({
    ros : ros,
    name : '/sensor_data',
    messageType : 'std_msgs/Int64'
});

var topic_cmd_vel = new ROSLIB.Topic({
    ros : ros,
    name : "/cmd_vel",
    messageType : 'geometry_msgs/Twist' 
});

// Publisher
var controlcmds =  function(linear, angular) {
    var msg = new ROSLIB.Message({
        linear: {
            x: linear[0],
            y: linear[1],
            z: linear[2]
        },
        angular: {
            x: angular[0],
            y: angular[1],
            z: angular[2]
        }        
    });

    topic_cmd_vel.publish(msg);
}

var counter = 0;

// Subscribers
topic_sensor_data.subscribe(function(m) {
    Plotly.extendTraces('sensor-data-plot', {y:[[m.data]]}, [0]);  
    counter ++;
    
    if (counter>20) {
        Plotly.relayout('sensor-data-plot',{
            xaxis:{
                range:[counter - 20, counter]
            }
        });
    }
});



// on-click events
var goforward =  function() {
    console.log('Go forward')
    controlcmds([1, 0, 0], [0, 0, 0])
}
var goback=  function() {
    console.log('Go Back')
    controlcmds([-1, 0, 0], [0, 0, 0])
}
var rotateccw =  function() {
    console.log('Rotate Counter Clock Wise')
    controlcmds([0, 0, 0], [0, 0, 1])
}
var rotatecw =  function() {
    console.log('Rotate clock wise')
    controlcmds([0, 0, 0], [0, 0, -1])
}