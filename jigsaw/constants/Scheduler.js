const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var map = {};

// user is the name of the user
// map is a hashmap
// obj is a sorted array of events for the user
function populateMapForUser(user,obj,map){
  var timeblock = 30;
  for(var i = 1; i<8; i++){
    for(var j = 0; j<24; j++){
      for(var k = 0; k<2; k++){
        var hash = i+":"+j+":"+(k*timeblock);
        var empty = [];
        map[hash] = empty;
      }
    }
  }

  var counter = 0;

  for(var i = 1; i<8; i++){
    for(var j = 0; j<24; j++){
      for(var k = 0; k<2; k++){
        var hash = i+":"+j+":"+(k*timeblock);
        while (counter < obj.length && check(i,j,k,obj[counter]) == "after"){
          counter++;
        }
        if(counter == obj.length || check(i,j,k,obj[counter]) == "nonoverlap"){
          map[hash] = map[hash].concat(user);
        }
      }
    }
  }
  return map;
}

function check(i,j,k,event){
  var start = event.Start;
  var end = event.End;
  var startTime = event.Day*1440 + parseInt(start.split(":")[0],10)*60 + parseInt(start.split(":")[1],10);
  var endTime = event.Day*1440 +  parseInt(end.split(":")[0],10)*60 + parseInt(end.split(":")[1],10);
  endTime = endTime % 30 == 0
    ? endTime
    : endTime + 30;
  var timeBlock = i*1440+j*60+k*30;
  startTime = startTime - startTime%30;
  endTime = endTime - endTime%30;
  if(startTime > timeBlock){
    return "nonoverlap";
  }
  if(startTime == timeBlock){
    return "overlap";
  }
  if(startTime<timeBlock && timeBlock < endTime){
    return "overlap";
  }
  return "after";
}

var parseTime = (se, time) => {
  const minutes = parseInt(time.slice(-2));
  var newmin;
  var newhour = parseInt(time.slice(0, 2));
  // se stands for start or end.
  if(se === "start") {
    // we floor here
    if(minutes >= 0 && minutes < 30) {
      newmin = "00";
    } else {
      newmin = "30";
    }
  } else {
    // we ceil here.
    if(minutes > 0 && minutes <= 30) {
      newmin = "30";
    } else if(minutes != 0) {
      newmin = "00";
      newhour = newhour + 1;
    } else {
      newmin = "00";
    }
  };

  if(newhour < 10) {
    newhour = "0" + newhour.toString();
  } else {
    newhour = newhour.toString();
  }
  return newhour + ":" + newmin;
}

var parseEventForUser = (user) => {
  var events = [];
  user.Schedule.forEach((event) => {
    var newEvent  = {
      "Busy": 1,
      "Day": days.indexOf(event.Day) + 1,
      "Name": event.Name,
      "Start": parseTime("start", event.Start),
      "End": parseTime("end", event.End),
    };
    events.push(newEvent);
  });
  events.sort(function(a,b) {
    return (a.Day > b.Day) ? 1 : ((b.Day > a.Day) ? -1 : ((a.Start > b.Start) ? 1 : ((b.Start > a.Start) ? -1 : ((a.End > b.End) ? 1 : 0))));
  })
  return events;
}

function schedule(users, preferences) {
  // With hash map, timeblock free times in our hash map.
  var map = {};
  for(var i = 0; i<users.length; i++){
    map = populateMapForUser(users[i],parseEventForUser(users[i]),map);
  }
  return map;
}

class timeBlock{
  constructor(){
    var people = 0;
    var startTime = 0;
    var endTime = 0;
  }
}

// grabintersect returns the people that are available for all blocks in window.
// Takes in window.
function incrementTime(timestamp,increment){
  var times = timestamp.split(":");
  var i = parseInt(times[0],10);
  var j = parseInt(times[1],10);
  var k = parseInt(times[2],10);
  if(k == 0){
    k = 1;
    return i+":"+j+":"+k*30;
  }
  else if(j == 23){
    i++;
    j = 0;
    k = 0;
    return i+":"+j+":"+k*30;
  }
  else{
    k = 0;
    j++;
    return i+":"+j+":"+k*30;
  }
}

function grabintersect(window) {
  var initialpeople = window[0][1];
  for(var i = 1; i < window.length; i++) {
    initialpeople = initialpeople.filter(value => window[i][1].includes(value))
  }
  return initialpeople;
}

// Blocksize is how many 30 min blocks.
// getBestTimes should:
// 1. Given block size and configured map with all users.
// 2. Output best blocksize amount of blocks from map.
function getBestTimes(blockSize, map){
  // for(var i = 1; i<8; i++){
  //   for(var j = 0; j<24; j++){
  //     for(var k = 0; k<2; k++){
  //
  //       // check if RHS of window is out of range.
  //       if((i*1440+j*60+k*30 + blockSize*30) > (7*1440+23*60+30)){
  //         break;
  //       }
  //       var hash = i+":"+j+":"+(k*timeblock);
  //       var arr = map[hash];
  //
  //
  //       for(var x = 0; x < blockSize - 1; x++) {
  //         compareBlock(map[hash ])
  //       }
  //     }
  //   }
  // }

  // assume that map is ordered.
  var times = Object.keys(map);
  var bestTimes = [];

  for(var i = 0; i < times.length - blockSize; i++){
    // get window of blockSize
    var window = [];
    for(var x = 0; x < blockSize; x++) {
      // times[i+x] = i:j:k
      // map[times[i+x]] = the users...
      window.push([times[i+x], map[times[i+x]]]);
    }

    // check for blocks that are in the same day...

    // grab intersection of people
    var smallWindow = {
      starTime: window[0][0],
      people: grabintersect(window),
    };
    bestTimes.push(smallWindow);
  }

}

function test(){
  var map = {};
  var events = [];
  var event1  = {
    "Busy": 1,
    "Day": 1,
    "Name": "Event Name",
    "Start": "11:12",
    "End": "13:55",
  };
  var event2  = {
    "Busy": 1,
    "Day": 2,
    "Name": "Event Name",
    "Start": "11:12",
    "End": "13:23",
  };
  var event3  = {
    "Busy": 1,
    "Day": 2,
    "Name": "Event Name",
    "Start": "11:12",
    "End": "14:44",
  };
  events.push(event2);
  events.push(event1);
  events.push(event3);
  events.sort(function(a,b) {
    return (a.Day > b.Day) ? 1 : ((b.Day > a.Day) ? -1 : ((a.Start > b.Start) ? 1 : ((b.Start > a.Start) ? -1 : ((a.End > b.End) ? 1 : 0))));
  })
  map = populateMapForUser("userA",events, map);
  getBestTimes(2,map);
}
test();
