$(document).ready(function() {
  $('input').keypress(function(e) {
    var inputVal = $(this).val();

    if (e.which == 13) { // in case of hit 'enter'
      if (inputVal !== "") {
        // Remove previous data
        $(".searchResultList").remove();

        console.log("input value: " + inputVal);
        getWiki(function(data) {
          console.log("data[0]: " + data[0]);
          console.log("data[1]: " + data[1]);

          // $('.searchResultBoard').append("<div class='col-xs-12'>Search result" + data[0] + "</div>");

          for (var i = 1; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++) {
              switch (i) {
                case 1: // for title
                  $('.searchResultBoard').append("<div class='searchResultList'><a href='" + data[3][j] + "' target='_blank'><dt>" + data[i][j] + "</dt></a></div>");
                  break;
                  //<a href='link...'> </a>
                case 2: // for description
                  var descriptionVar = ".searchResultList:nth-of-type(";
                  descriptionVar += j + 1;
                  descriptionVar += ")";
                  // console.log("descriptionVar: " + descriptionVar);
                  $(descriptionVar).append("<dd>" + data[i][j] + " </dd>");
                  break;
              } // end of switch
            } // end of "for j"
          } // end of "for i"
        }); // end of getWiki
      } // end of "if enter"

      if (inputVal === "") {
        $(".searchResultList").remove();
      }

      return false; // stop defaultAction of form
    } // end of keypress function


    function getWiki(callback) {
      var requestUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
      requestUrl += inputVal;
      requestUrl += "&limit=10&namespace=0&format=json&callback=?";

      console.log("requestUrl: " + requestUrl);

      $.getJSON(requestUrl, function(data) {
        callback(data);
      });
    }

  }); // end of keypress function
}); // end of document ready function
