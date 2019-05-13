const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var map = {};
var makeHashMap = () => {
  const timeblock = 30;

  for(var i = 1; i<8; i++){
    for(var j = 0; j<23; j++){
      for(var k = 0; k<2; k++){
        var hash = i+":"+j+":"+(k*timeblock);
        var empty = [];
        map[hash] = empty;
        // console.log(hash);
        // console.log(map[hash]);
      }
    }
  }
};

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
      "End": parseTime("end", event.End);
    };
    events.push(newEvent);
  });
  events.sort(function(a,b) {
    return (a.Start > b.Start) ? 1 : ((b.Start > a.Start) ? -1 : ((a.End > b.End) ? 1 : 0));
  })
  return events;
}

export function schedule(users, preferences) {

  // First check if we need to make a new hash map.


  // With hash map, inc free times in our hash map.


}
