document.addEventListener("DOMContentLoaded", function() {
    const youtubePlayer = document.getElementById('youtubePlayer');
    const apiKey = 'AIzaSyCrVyNj3xtxbHuCD9yKTnbODguLfWJsauY';
    // Get video ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const videoID = urlParams.get('id'); // assuming the parameter name is 'id'
    
    // If a videoID exists, embed the YouTube video, else show an error or default message
    if(videoID) {
        youtubePlayer.src = `https://www.youtube.com/embed/${videoID}`;
        fetchVideoDetails(videoID, apiKey);


    } else {
        youtubePlayer.outerHTML = '<p>Please provide a valid videoID in the query parameters.</p>';
    }
});

window.addEventListener("load", function() {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.display = "none";
});

function fetchVideoDetails(videoId, apiKey) {

    const endpoint = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const videoData = data.items[0].snippet;

                videoTitle.textContent = videoData.title;
                videoDescription.textContent = videoData.description;

                // Handle other attributes here or process the data as needed
            } else {
                console.error("No video found with the provided ID.");
            }
        })
        .catch(error => {
            console.error("Error fetching video details:", error);
        });
}
