const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// user is the name of the user
// map is a hashmap
// obj is a sorted array of events for the user
function populateMapForUser(user,obj,map){
  var timeblock = 30;
  if(Object.keys(map).length==0){
    for(var i = 1; i<8; i++){
      for(var j = 0; j<24; j++){
        for(var k = 0; k<2; k++){
          var hash = i+":"+j+":"+(k*timeblock);
          var empty = [];
          map[hash] = empty;
        }
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
  for (var event in user.Schedule) {
    var newEvent  = {
      "Busy": 1,
      "Day": days.indexOf(user.Schedule[event].Day) + 1,
      "Name": user.Schedule[event].Name,
      "Start": parseTime("start", user.Schedule[event].Start),
      "End": parseTime("end", user.Schedule[event].End),
    };
    events.push(newEvent);
  }

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

// grabintersect returns the people that are available for all blocks in window.
// Takes in window.
function timeCheck(window){
  //window[0][0], window[1][0];
  for(var i = 0; i<window.length-1; i++){
    var times = window[i][0].split(":");
    var i = parseInt(times[0],10);
    var j = parseInt(times[1],10);
    var k = parseInt(times[2],10);
    // Second time
    if(i+1 >= window.length){
      return true;
    }
    var times2 = window[i+1][0].split(":");
    var i2 = parseInt(times[0],10);
    var j2 = parseInt(times[1],10);
    var k2 = parseInt(times[2],10);
    if(!noGap(i,j,k,i2,j2,k2)){
      return false;
    }
  }
  return true;
}

function noGap(i,j,k,i2,j2,k2){
  if(i == i2){
    if(j == j2){
      return k2 == k+30;
    }
    else{
      return k2 == k-30;
    }
  }
  else{
    return i == i2-1 && j==23 && j2==0 && k2 == k-30;
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
    // given the window (size of blocksize), return bool if all blocks in window are valid
    // valid means all consecutive times in the window are 30 minutes apart.
    // console.log(window);
    if(!timeCheck(window)){
      continue;
    }

    // grab intersection of people
    var smallWindow = {
      startTime: window[0][0],
      people: grabintersect(window),
    };
    bestTimes.push(smallWindow);

  }
  // order bestTimes by the amount of people.
  function compare(a, b){
    // const dayA = a.startTime[0];
    // const dayB = b.startTime[0];
    // const hourA = parseInt(a.startTime.substring(
    //     a.startTime.lastIndexOf(":") + 1,
    //     a.startTime.lastIndexOf(";")
    // ));
    // const hourB = parseInt(b.startTime.substring(
    //     b.startTime.lastIndexOf(":") + 1,
    //     b.startTime.lastIndexOf(";")
    // ));
    // const minutesA = parseInt(a.startTime.split(":").pop());
    // const minutesB = parseInt(b.startTime.split(":").pop());

    if (a.people.length > b.people.length) {
      return -1;
    }
    else if (a.people.length == b.people.length && (a.startTime < b.startTime)) {
      return -1;
    }
    else{
      return 1;
    }
  }
  bestTimes.sort(compare);
  return bestTimes;
}

var scheduleBestTime = (blockSize, users) => {
  var map = {};

  // populate map with user data.
  for (var user in users) {
    if (users.hasOwnProperty(user)) {
      var userEvents = parseEventForUser(users[user]);
      map = populateMapForUser(user, userEvents, map);
    }
  }
  return getBestTimes(blockSize, map);
}

function test(){
  const users = {
    "Andres" : {
      "Email" : "andreskim315@gmail.com",
      "Schedule" : {
        "Event1" : {
          "Busy" : 1,
          "Day" : "Sunday",
          "End" : "12:00",
          "Name" : "School Work",
          "Start" : "09:00"
        },
        "Event10" : {
          "Busy" : 1,
          "Day" : "Thursday",
          "End" : "16:00",
          "Name" : "School Work",
          "Start" : "14:00"
        },
        "Event11" : {
          "Busy" : 1,
          "Day" : "Friday",
          "End" : "12:00",
          "Name" : "School Work",
          "Start" : "09:00"
        },
        "Event12" : {
          "Busy" : 1,
          "Day" : "Saturday",
          "End" : "12:00",
          "Name" : "School Work",
          "Start" : "09:00"
        },
        "Event2" : {
          "Busy" : 1,
          "Day" : "Monday",
          "End" : "11:00",
          "Name" : "School Work",
          "Start" : "09:00"
        },
        "Event3" : {
          "Busy" : 1,
          "Day" : "Monday",
          "End" : "16:00",
          "Name" : "School Work",
          "Start" : "14:00"
        },
        "Event4" : {
          "Busy" : 1,
          "Day" : "Monday",
          "End" : "21:00",
          "Name" : "School Work",
          "Start" : "18:00"
        },
        "Event5" : {
          "Busy" : 1,
          "Day" : "Tuesday",
          "End" : "13:00",
          "Name" : "School Work",
          "Start" : "09:00"
        },
        "Event6" : {
          "Busy" : 1,
          "Day" : "Tuesday",
          "End" : "16:00",
          "Name" : "School Work",
          "Start" : "14:00"
        },
        "Event7" : {
          "Busy" : 1,
          "Day" : "Wednesday",
          "End" : "12:00",
          "Name" : "School Work",
          "Start" : "09:00"
        },
        "Event8" : {
          "Busy" : 1,
          "Day" : "Wednesday",
          "End" : "16:00",
          "Name" : "School Work",
          "Start" : "14:00"
        },
        "Event9" : {
          "Busy" : 1,
          "Day" : "Thursday",
          "End" : "13:00",
          "Name" : "School Work",
          "Start" : "09:00"
        }
      }
    },
    "Justin" : {
      "Email" : "justinpeh2019@u.northwestern.edu",
      "Schedule" : {
        "Event1" : {
          "Busy " : 1,
          "Day" : "Sunday",
          "End" : "23:00",
          "Name" : "Church",
          "Start" : "09:00"
        },
        "Event2" : {
          "Busy " : 1,
          "Day" : "Monday",
          "End" : "11:30",
          "Name" : "Piano Lessons",
          "Start" : "09:00"
        },
        "Event3" : {
          "Busy " : 1,
          "Day" : "Monday",
          "End" : "17:00",
          "Name" : "Guitar Lessons",
          "Start" : "15:00"
        },
        "Event4" : {
          "Busy " : 1,
          "Day" : "Tuesday",
          "End" : "16:00",
          "Name" : "Violin Lessons",
          "Start" : "11:00"
        },
        "Event5" : {
          "Busy " : 1,
          "Day" : "Wednesday",
          "End" : "16:00",
          "Name" : "Harp Lessons",
          "Start" : "09:00"
        },
        "Event6" : {
          "Busy " : 1,
          "Day" : "Wednesday",
          "End" : "23:00",
          "Name" : "Gong Lessons",
          "Start" : "22:00"
        },
        "Event7" : {
          "Busy " : 1,
          "Day" : "Thursday",
          "End" : "16:00",
          "Name" : "Drum Lessons",
          "Start" : "11:00"
        },
        "Event8" : {
          "Busy " : 1,
          "Day" : "Thursday",
          "End" : "23:00",
          "Name" : "Timpani Lessons",
          "Start" : "18:00"
        }
      },
      "Token" : ""
    },
    "Matthew" : {
      "Email" : "matthewwang2020@u.northwestern.edu",
      "Schedule" : {
        "Event1" : {
          "Busy" : 1,
          "Day" : "Monday",
          "End" : "17:00",
          "Name" : "Monday",
          "Start" : "11:00"
        },
        "Event2" : {
          "Busy" : 1,
          "Day" : "Tuesday",
          "End" : "15:00",
          "Name" : "School",
          "Start" : "11:00"
        },
        "Event3" : {
          "Busy" : 1,
          "Day" : "Wednesday",
          "End" : "14:00",
          "Name" : "School",
          "Start" : "11:00"
        },
        "Event4" : {
          "Busy" : 1,
          "Day" : "Thursday",
          "End" : "18:00",
          "Name" : "School",
          "Start" : "11:00"
        }
      },
      "token" : " "
    }
  }
  var bestTimes = scheduleBestTime(2,users);
  var times = Object.keys(bestTimes);
  for(var i = 0; i<times.length; i++){
    console.log(bestTimes[times[i]]);
  }
}
// test();
module.exports.scheduleBestTime = scheduleBestTime;
