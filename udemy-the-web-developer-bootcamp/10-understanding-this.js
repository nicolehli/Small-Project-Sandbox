# empty object
var comments = {};

# object { data: Array[3]}
comments.data = ["blah1", "blah2", "blah3"];

# a function that prints an array input
function printing (arr) {
  arr.forEach(function(element) {
    console.log(element);
  });
}


# Expected output:
# blah1
# blah2
# blah3

# Method 1:
printing (comments.data);

# Method 2:
# print the array assigned to the data within comments - with this
# the word this will refer to comments object within comments.print that already have data inside of it
comments.printing = function () {
  this.data.forEach(
    function(el) {
    console.log(el);
    }
  );
}

comments.printing();
