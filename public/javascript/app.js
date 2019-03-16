// grabs articles in json format
$.getJSON("/articles", function (data) {
    for (var i = 0;i < data.length; i++) {
        $("articles").append ("<p data-id='" + data[i]._id + "'> " + data[i].title + "<br />" + data[i].link + "</p>");     
    }
}); 

$(document).on('click','p',function () {
    $("#notes").empty();
    var currentID = $(this).attr("data-id");
})
    // ajax call
    $.ajax({ 
        method: "GET", 
        url: "/articles/" + currentID
    })
    .then (function (data) { 
        //title of the article
        $('#notes').append ('<h2>' + data.title + '</h2>');
        //an input
        $('#notes').append("<input id = 'titleinput' name = 'title'>");
        // text area 
        $('#notes').append("<textarea id='bodyinput' name='body'> </textarea>");
        // button to submit new note 
        $('#notes').append("<button data-id ='" + data._id + "' id ='savenote'> Save Note </button>");

        //if note in articles
        if (data.note) { 
            $('#titleinput').val(data.note.title);
            $('#bodyinput').val(data.note.body);
        }
    });

    $(document).on('click','savenote',function () {
        var currentID = $(this).attr("data-id");
    }); 

    $.ajax({ 
        method: 'POST', 
        url :'/articles/' + currentID,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .then(function (data) {
            console.log(data);
            $("#notes").empty();
    })

    $(".scrape-new").on("click", function () {
        $.ajax({
            method: "GET",
            url: "/scrape",
        }).done(function (data) {
            console.log(data)
            window.location = "/"
        })
    });