var movieDB = [ ];
movieDB.push ({ name: "In Bruges",stars: 5, watched: true });
movieDB.push ({ name: "Frozen", stars:4.5, watched: false });
movieDB.push ({ name: "Les Miserables", stars:3.5, watched: false });


// CONDITIONAL
// var voteable = (age < 18) ? "Too young":"Old enough";

// USING FOR
for (var i=0; i < movieDB.length; i++) {
  console.log("You have " + ((movieDB[i].watched) ? "watched \"":"not watched \"") + movieDB[i].name + "\" - " + movieDB[i]["stars"] + " stars");
}

// USING FOREACH
movieDB.forEach(function(eachMovie) {
  console.log("You have " + ((eachMovie.watched) ? "watched \"":"not watched \"") + eachMovie.name + "\" - " + eachMovie["stars"] + " stars");
});

// EXPECTED OUTPUT
// You have watched "In Bruges" - 5 stars
// You have not watched "Frozen" - 4.5 stars
// You have not watched "Les Miserables" - 3.5 stars
