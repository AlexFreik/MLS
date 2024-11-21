function getJsmpegPlayerHtml(streamId) {
    return `
        <div class="jsmpeg text-center">
            ${
                streamId === 1
                    ? `
                <canvas
                    width="300"
                    height="169"
                    id="video-canvas${streamId}"
                    class="inline border border-solid border-gray-400"></canvas>`
                    : ``
            }
            <p id="stream${streamId}">
                <a href="javascript:void(0);" onclick="genericFunction('player.php?appname=main&streamname=', jsmpegPlay, this)" class="mx-1">
                    <i class="material-icons text-3xl">play_arrow</i>M</a>
                <a href="javascript:void(0);" onclick="genericFunction('player.php?appname=backup&streamname=', jsmpegPlay, this)" class="mx-1">
                    <i class="material-icons text-3xl">play_arrow</i>B</a>
                <a href="javascript:void(0);" onclick="genericFunction('player.php?appname=distribute&streamname=', jsmpegPlay, this)" class="mx-1">
                    <i class="material-icons text-3xl">play_arrow</i>D</a>
                <a href="javascript:void(0);" onclick="jsmpegStop()" class="mx-1"><i class="material-icons text-3xl">stop</i></a>
                <a href="javascript:void(0);" onclick="jsmpegVolumeup()" class="mx-1"><i class="material-icons text-3xl">volume_up</i></a>
                <a href="javascript:void(0);" onclick="jsmpegVolumedown()" class="mx-1"><i class="material-icons text-3xl">volume_down</i></a>
            </p>
        </div>`;
}

function genericFunction(url, cFunction, elem) {
    var streamno = elem.parentNode.id;
    url += streamno;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cFunction(this, streamno);
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}

function jsmpegPlay(xhttp, streamno) {
    var stream1 = document.getElementById(streamno);
    stream1.parentElement.insertBefore(canvas1, stream1);
    if (player1 == 'initial state') {
        player1 = new JSMpeg.Player(url1, {
            canvas: canvas1,
            autoplay: false,
            pauseWhenHidden: false,
            videoBufferSize: 100 * 1024,
            audioBufferSize: 50 * 1024,
        });
    }
    player1.play();
    player1.volume = 1;
    return false;
}

function jsmpegStop() {
    player1.stop();
    return false;
}

function jsmpegVolumeup() {
    player1.volume = player1.volume + 0.2;
    return false;
}

function jsmpegVolumedown() {
    player1.volume = player1.volume - 0.2;
    if (player1.volume < 0) {
        player1.volume = 0;
    }
    return false;
}

function setVideoPlayers() {
    for (let i = 1; i <= STREAM_NUM; i++) {
        for (let j = 1; j <= OUT_NUM; j++) {
            eval(`window.canvas${i} = document.getElementById('video-canvas${i}');`);
            eval(`window.url${i} = 'ws://' + document.location.hostname + ':443/';`);
            eval(`window.player${i} = 'initial state';`);
        }
    }
}
