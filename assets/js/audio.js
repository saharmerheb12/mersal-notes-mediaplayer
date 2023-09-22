document.addEventListener("DOMContentLoaded", function() {
    // Get voice note ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const voiceNoteID = urlParams.get('id'); 

    const voiceNotePlayer = document.getElementById('voiceNotePlayer');
    const voiceNoteImage = document.getElementById('voiceNoteImage');

    if(voiceNoteID) {
        // voiceNotePlayer.src = `notes/${voiceNoteID}.mp3`;
        // voiceNoteImage.src = `notes/${voiceNoteID}.jpg`;
        voiceNotePlayer.src = 'https://users-notes-bucket.s3.us-east-1.amazonaws.com/${voiceNoteID}.mp3';
        voiceNoteImage.src ='https://users-notes-bucket.s3.us-east-1.amazonaws.com/123456.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaDGV1LWNlbnRyYWwtMSJGMEQCIGeIr2iy5qRjdnc9QOg7vtLOACWuiaFXPU4f5QgWerqMAiAVWEs1E47gjUZvLTDaFYBxjmfCU2jzOeyKq4vApFrLyiqIAwj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDIxODYxNjA3OTIwMCIMFEcflDpivHK2rqwBKtwCmVRmUKZln6ZDfyQVFDbpjiJ7GXpF7jXCBrSgIogtNBeZDNfz1iVQV%2FpjwyS%2Flddb98HJGE3HRy0MxN9s8J7eumPQo%2BA0EwzB1RwZGvvCD27rnsPYMOdCDR5PTbe4dnX1AVMX9F4PRIgR%2FgYEbXcEclrsjuNH4Hljuf2lkSDCAHdb9z386TByPSXSajzkcWz%2FChxut9MalV1s9bArcAn5Lc96WWUQRdUrMFfiAS4AydyerWtFlxYpEIdU5IZyx2DcBkrFvz6cnw0SNVjKkC0z29mnNOO%2FFPCr8IMF7bHv%2FQivKAJzaBv5abrhtL%2Bfs3qh4jjwPCqiDUgGL4yiPq2ZFEsNZ6aDAFIxLAcbqMzE88Cip0mVqR9tkazsHhlzPXHn4QBHTIVonQv%2Fn2gkrJK4DRWzbq1z6%2BeSWPlVM%2BHZx37nRHXIoEobSoO2WCmCNGZTf7hZtJnIo1o7QrYZMITPtKgGOrQCMe5p0SA8xdaxrc%2FcC8a1d6q%2F1hRy6ktoY%2B%2FjYlgpnaufduU8jwB0WHFj6mdi2crA9e5qQFnCy7Ijl79QjN0V7jWuCpeSB1iP2dmVkhL3T8NdnVeTQoTwtt1xA7TYK99b72eyN4owyPwonTG8zgAuTEM1ZQ1Jv%2FkLOB8vtQAfB%2By%2Bc7imfZhDHxW5HQOoWKOpoRiNdCpTnMaeq0ivadWHgYuHwmeumTFJnBqegZp5zcREYwOkTB%2Bhh57q2PnVhMmvbC1yeTiW9v%2B7XlrxO07VQJCGhYukrA6P0jiZrMtXxOb%2B4oxHTH5caMo%2BPU5nVjNQFVXE8bW%2FygpvwjsUaDMtXTL%2FzOwbg6XyiGyActkDfbI15XT7S%2BtR4%2BWwQY0m6dODwGYOAoOdpsyg%2F6pP0LfF%2B3ORjFw%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230922T143936Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIATFZUIUNQCTYXI4WW%2F20230922%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=231bd5340ac53b2ef9bb652e01d52164f4277482e5a4c7f9525ab4efbb036121' 
        //  `https://users-notes-bucket.s3.us-east-1.amazonaws.com/${voiceNoteID}.jpg`;

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
