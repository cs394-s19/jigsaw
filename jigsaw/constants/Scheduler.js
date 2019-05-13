var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var map = {};
var makeHashMap = (range) => {

  var inc = 30;

  for(var i = 1; i<8; i++){
    for(var j = 0; j<23; j++){
      for(var k = 0; k<2; k++){
        var hash = i+":"+j+":"+(k*inc);
        map[hash] = 0;
        // console.log(hash);
      }
    }
  }
};

export function schedule(users, preferences) {

}
