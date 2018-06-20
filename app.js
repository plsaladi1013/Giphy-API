$(document).ready(function() {

    event.preventDefault();
    

var topics = ["Saab", "Volvo", "BMW"];

function renderButtons(){
    $("#display").empty();
    for(var i=0; i<topics.length; i++){

        var a= $("<button>");
        a.addClass("topic");
        a.attr("topic-name",topics[i]);
        a.text(topics[i]);
        $("#display").append(a);
        }
}
    
$(".gif").on("click", function(){
            var state = $(this).attr("data-state");
                if(state === "still"){
                     $(this).attr("src", $(this).attr("data-animate"));
                     $(this).attr("data-state", "animate");
                 }
                else if(state === "animate"){
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state","still");
                }
        
        });
    $("#add-topic").on("click", function(event){
        event.preventDefault();
        var title = $("#new").val().trim();
        topics.push(title);
        console.log(title); 
        console.log(topics);
        renderButtons();
    });
        
    renderButtons();
    

$("button").on("click",function(){
    console.log(this);
    var topicName = $(this).attr("topic-name");
    console.log(topicName);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topicName+"&api_key=DMePXuPCCHzl3vLJ6jpI4tXGlLvgUGxY&limit=5";
    
        $.ajax({
        url: queryURL,
        method:"GET"
        })
        .then(function(response){
            var topicDiv = $("<div class='topic'>");
            console.log(queryURL);
            console.log(response.data);
            var results = response.data;
            for(var i=0; i<results.length; i++){
                var stillURL = results[i].images.fixed_height_still.url;
                var animateURL = results[i].images.fixed_height.url;
                var rating = results[i].rating;
                console.log(stillURL);
                console.log(animateURL);
                console.log(rating);
                $("#topic-div").empty();
                var topicRating = $("<p>").text("Rating: " + rating);
                topicDiv.append(topicRating);
                var image = $("<img class='gif'>");         
                image.attr("data-still",stillURL);
                image.attr("data-animate", animateURL);
                image.attr("data-state","still");
                image.attr("src", stillURL);
                topicDiv.append(image);
                $("#topic-div").prepend(topicDiv);

            }
        });

   });


});

       



//for(var i=0; i<topics.length; i++){
//     var divButton = $("<button>");
//         divButton.attr("value", topics[i]);
//         $("#display").text(divButton);
//}
