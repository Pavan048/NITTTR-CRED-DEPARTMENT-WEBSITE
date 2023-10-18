// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function () {
    // Get the element that you want to make clickable
    var clickableElement = document.getElementById('clickableText');
    
    // Add a click event listener to the element
    clickableElement.addEventListener('click', function () {
        // Open a new pop-up window when the element is clicked
        var newWindow = window.open('timeline.html', '_blank', 'width=400,height=300');
        
        // Optional: Customize the appearance and behavior of the new window using the third argument (window features)
        // The example above opens a new window with a width of 400 pixels and a height of 300 pixels.
    });
});
