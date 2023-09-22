document.addEventListener("DOMContentLoaded", function() {
    // Get voice note ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const voiceNoteID = urlParams.get('id'); 

    const voiceNotePlayer = document.getElementById('voiceNotePlayer');
    const voiceNoteImage = document.getElementById('voiceNoteImage');

    if(voiceNoteID) {
        // voiceNotePlayer.src = `notes/${voiceNoteID}.mp3`;
        // voiceNoteImage.src = `notes/${voiceNoteID}.jpg`;
        voiceNotePlayer.src = `https://users-notes-bucket.s3.amazonaws.com/${voiceNoteID}.mp3`;
        voiceNoteImage.src = `https://users-notes-bucket.s3.amazonaws.com/${voiceNoteID}.png`;

        initControl(voiceNotePlayer);
    } else {
        youtubePlayer.outerHTML = '<p>Please provide a valid voice note id in the query parameters.</p>';
    }
});

function initControl(vioceNote){
    let progress = document.getElementById("progress");
    let ctrl = document.getElementById("ctrlIcon");
    let divCtrl = document.getElementById("divCtrl");
    divCtrl.addEventListener("click", playPause);

    vioceNote.onloadedmetadata = function(){
        progress.max = vioceNote.duration;
        progress.value = vioceNote.currentTime;
    }

    if(vioceNote.play())
    {
        setInterval(()=>{
            progress.value = vioceNote.currentTime;
        },500)
    }
    progress.onchange = function(){
        vioceNote.play();
        vioceNote.currentTime = progress.value;
        ctrl.classList.add("fa-pause");
        ctrl.classList.remove("fa-play");
    }
    function playPause(){
        let ctrl = document.getElementById("ctrlIcon");
        if(ctrl.classList.contains("fa-pause")){
            vioceNote.pause();
            ctrl.classList.remove("fa-pause");
            ctrl.classList.add("fa-play");
        }
        else{
            vioceNote.play();
            ctrl.classList.add("fa-pause");
            ctrl.classList.remove("fa-play");
        }
    }
}
