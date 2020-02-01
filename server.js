// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// arrays
var reservation = [
    {
      routeName: "ton",
      name: "Ton",
      phone: "998",
      email: "ton@ton.com",
      id: 55
    },
    {
        routeName: "pinhead",
        name: "Pen",
        phone: "998",
        email: "ton@ton.com",
        id: 55
      },
  ];

  var waitingList  = [
      {
        routeName: "ton",
        name: "Ton",
        phone: "998",
        email: "ton@ton.com",
        id: 55  
      },
      {
        routeName: "jack",
        name: "Jack",
        phone: "998",
        email: "jack@ton.com",
        id: 55  
      }
  ];


// Basic route that sends the user first to the AJAX Page

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
  });

  app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });
  
  
  // Displays all reservations
  app.get("/api/reservation", function(req, res) {
    return res.json(reservation);
  });
 

    // Displays watiting list
    app.get("/api/waitingList", function(req, res) {
        return res.json(waitingList);
      });
  
  // Displays a single booking, or returns false
  app.get("/api/reservation/:character", function(req, res) {
    var chosen = req.params.reservation;
  
    console.log(chosen);
  
    for (var i = 0; i < reservation.length; i++) {
      if (chosen === reservation[i].routeName) {
        return res.json(reservation[i]);
      }
    }
  
    return res.json(false);
  });

    // Displays a single booking, or returns false
    app.get("/api/waitingList/:character", function(req, res) {
        var chosen = req.params.waitingList;
      
        console.log(chosen);
      
        for (var i = 0; i < waitingList.length; i++) {
          if (chosen === waitingList[i].routeName) {
            return res.json(waitingList[i]);
          }
        }
      
        return res.json(false);
      });

  // Create New booking - takes in JSON input
app.post("/api/reservation", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newReservation);
    if (reservation.length <5 ) {
      reservation.push(newReservation);
    } 
    else {
      waitingList.push(newReservation);
    }
  
    res.json(newReservation);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
  