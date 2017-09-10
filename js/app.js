// The button click event is replaced with a Form submit event and jQuery submit method
// When a visitor submits the form, the programming inside this function will run
// evt - argument that uses jQuery passes to all event handlers (click, mouse over, submit and so on)
$('.search__form').submit(function (evt) {
    /*
     When we click a form, it posts to a web server and we leave the current page.
     But we are using AJAX so we don't wanna load a new web page.
     preventDefault() - prevents a browser from completing its normal action in response to an event,
     so it stops the form from submitting.
     */
    evt.preventDefault();

    // Retrieves the value the visitor typed in the input field
    var searchTag = $('#search__input').val();

    // Blocks input field and Enables button "Searching..."
    var $searchInput = $('#search__input');
    var $submitBtn = $('#submit-btn');
    $searchInput.prop("disabled", true);
    $submitBtn.attr("disabled", true).text("Searching...");

    var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var flickrOptions = {
        tags: searchTag,
        format: "json"
    };

    function displayPhotos(data) {
        var photoHTML = '<ul>';
        $.each(data.items, function (i, photo) {
            photoHTML += '<li class="photo-container">';
            photoHTML += '<a href="' + photo.link + '" class="image">';
            photoHTML += '<img src="' + photo.media.m + '">';
            photoHTML += '</a></li>';
        });
        photoHTML += '</ul>';
        $('#photos').html(photoHTML);

        // Reanables button "searching..."
        $searchInput.prop("disabled", false);
        $submitBtn.attr("disabled", false).text("Search");
    }
    $.getJSON(flickrAPI, flickrOptions, displayPhotos);
});