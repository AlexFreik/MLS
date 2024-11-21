let refreshTime = 5000;
let refreshIntervalId = null;

function renderStreamControls() {
    const streamControls = document.getElementById('stream-controls');

    let html = '';
    for (let i = 1; i <= STREAM_NUM; i++) {
        // Create the div container
        html += `
            <div id="stream-container${i}" class="inline-block max-w-[400px] m-2 rounded-box bg-base-300 text-left p-2">
                <div id="streamHeader${i}" class="text-xl"></div>
                ${getJsmpegPlayerHtml(i)}
                <div id="stream-outs-${i}"></div>
                <div class="collapse collapse-arrow bg-base-200 mt-2">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl font-medium">More</div>
                    <div class="collapse-content">`;

        html += `
            <div class="my-1">
                <div class="badge badge-xs badge-outline" id="recording-status${i}"></div>
                <button
                    class="btn btn-xs btn-primary"
                    onclick="executePhp('/control.php?streamno=${i}&action=out&actnumber=98&state=on')"
                    target="_blank">
                    on
                </button>
                <button
                    class="btn btn-xs btn-error"
                    onclick="executePhp('/control.php?streamno=${i}&action=out&actnumber=98&state=off')"
                    target="_blank">
                    off
                </button>
                Record
            </div>

            <div class="mt-3 font-bold">
                Choose Input:
            </div>
            <div class="my-1">
                <span class="badge badge-xs badge-outline" id="main-status${i}"></span>
                <button
                    onclick="executePhp('/control.php?streamno=${i}&action=main&actnumber=&state=turnon')"
                    class="btn btn-xs btn-primary">
                    on
                </button>
                Main Live Stream
            </div>
            <div class="my-1">
                <span class="badge badge-xs badge-outline" id="backup-status${i}"></span>
                <button
                    onclick="executePhp('/control.php?streamno=${i}&action=back&actnumber=&state=turnon')"
                    class="btn btn-xs btn-primary" target="_blank">on</button>
                    Backup Live stream
            </div>

            <form method="post" id="videoInputForm${i}" class="my-1">
                <span class="badge badge-xs badge-outline" id="video-status${i}"></span>
                <input
                    type="submit"
                    class="btn btn-xs btn-primary"
                    style="display: inline" value="on"
                    onclick="event.preventDefault(); submitForm('videoInputForm${i}','control.php?streamno=${i}&action=video&actnumber=&state=turnon');" />
                Local
                <select name="video_no" class="select select-bordered select-xs max-w-xs">
                    <option selected value="video">Video</option>
                </select>
                <input type="text" name="startmin" size="1" value="0" class="input input-bordered input-neutral input-xs w-9"/>m
                <input type="text" style="display: inline" name="startsec" size="1" value="0" class="input input-bordered input-neutral input-xs w-10"/>s
            </form>

            <form method="post" id="holdingInputForm${i}" class="my-1">
                <span class="badge badge-xs badge-outline" id="holding-status${i}"></span>
                <input
                    type="submit"
                    class="btn btn-xs btn-primary"
                    style="display: inline" value="on"
                    onclick="event.preventDefault(); submitForm('holdingInputForm${i}','control.php?streamno=${i}&action=video&actnumber=&state=turnon');" />
                Local
                <select name="video_no" class="select select-bordered select-xs max-w-xs">
                    <option selected value="holding">Holding</option>
                </select>
                <input type="text" name="startmin" size="1" value="0" class="input input-bordered input-neutral input-xs w-9"/>m
                <input type="text" style="display: inline" name="startsec" size="1" value="0" class="input input-bordered input-neutral input-xs w-10"/>s
            </form>

            <div class="my-1">
                <button
                    onclick="executePhp('/control.php?streamno=${i}&action=playlist&actnumber=&state=')"
                    class="btn btn-xs btn-primary ml-4">on</button>
                Playlist
            </div>

            <div>
                <button
                    onclick="executePhp('/control.php?streamno=${i}&action=off&actnumber=&state=')"
                    class="btn btn-xs btn-error">off</button>
                Current Input
            </div>

            <div class="my-1 mt-3">
                <b>Overlays:</b>
                <a href="/control.php?streamno=${i}&action=super&actnumber=1&state=" target="_blank" class="btn btn-xs btn-primary">Add 1</a>
                <a href="/control.php?streamno=${i}&action=super&actnumber=2&state=" target="_blank" class="btn btn-xs btn-primary">Add 2</a>
                <a href="/control.php?streamno=${i}&action=super&actnumber=3&state=" target="_blank" class="btn btn-xs btn-primary">Add 3</a>
                <a href="/control.php?streamno=${i}&action=super&actnumber=4&state=" target="_blank" class="btn btn-xs btn-primary">Add 4</a>
                <br />
                <a href="/control.php?streamno=${i}&action=super&actnumber=5&state=" target="_blank" class="btn btn-xs btn-primary">Add 5</a>
                <a href="/control.php?streamno=${i}&action=super&actnumber=6&state=" target="_blank" class="btn btn-xs btn-primary">Add 6</a>
                <a href="/control.php?streamno=${i}&action=super&actnumber=7&state=" target="_blank" class="btn btn-xs btn-primary">Add 7</a>
                <a href="/control.php?streamno=${i}&action=super&actnumber=8&state=" target="_blank" class="btn btn-xs btn-primary">Add 8</a>
                <a href="/control.php?streamno=${i}&action=super&actnumber=off&state=" target="_blank" class="btn btn-xs btn-error">Remove</a>
            </div>

            <form method="post" target="_blank" action="/control.php?streamno=${i}&action=volume&actnumber=&state=volume">
            <p>
                <span class="font-bold">Volume:</span>
                <input type="text" name="vol_level" size="5" placeholder="1" class="input input-bordered input-neutral input-xs max-w-xs"/>
                <input type="submit" value="Change" class="btn btn-xs btn-outline"/>
            </p>
            </form>`;

        html += `
                    </div>
                </div>
            </div>`;
    }
    streamControls.innerHTML = html;
}

function renderStreamHeaders() {
    if (streamNames === null) {
        return;
    }
    const streams = getActiveStreams();
    let statuses = {
        distribute: Array(STREAM_NUM),
        main: Array(STREAM_NUM),
        backup: Array(STREAM_NUM),
        recording: Array(STREAM_NUM),
    };
    streams.distribute.forEach((stream) => (statuses.distribute[stream.streamId] = true));
    streams.main.forEach((stream) => (statuses.main[stream.streamId] = true));
    streams.backup.forEach((stream) => (statuses.backup[stream.streamId] = true));
    streams.recording.forEach((stream) => (statuses.recording[stream.streamId] = true));

    for (let i = 1; i <= STREAM_NUM; i++) {
        const headerElem = document.getElementById(`streamHeader${i}`);
        const streamName = streamNames[i];
        if (streamName === '') {
            document.getElementById('stream-container' + i).classList.add('hidden');
            continue;
        } else {
            document.getElementById('stream-container' + i).classList.remove('hidden');
        }
        headerElem.innerHTML = `
            <div class="mb-2 badge badge-lg bg-base-100 font-semibold">${i}</div>
            <div class="mb-2 badge ${statuses.distribute[i] ? 'badge-primary' : 'badge-outline'}">dist</div>
            <div class="badge ${statuses.main[i] ? 'badge-primary' : 'badge-outline'}">main</div>
            <div class="badge ${statuses.backup[i] ? 'badge-primary' : 'badge-outline'}">back</div>
            <span class="badge badge-lg bg-base-200 rounded-md">${streamName}</span>`;

        document.getElementById(`recording-status${i}`).className =
            `badge badge-xs ${statuses.recording[i] ? 'badge-primary' : 'badge-outline'}`;

        document.getElementById(`main-status${i}`).className =
            `badge badge-xs ${processes.includes(i + 'main') ? 'badge-primary' : 'badge-outline'}`;
        document.getElementById(`backup-status${i}`).className =
            `badge badge-xs ${processes.includes(i + 'back') ? 'badge-primary' : 'badge-outline'}`;
        document.getElementById(`video-status${i}`).className =
            `badge badge-xs ${processes.includes(i + 'video') ? 'badge-primary' : 'badge-outline'}`;
        document.getElementById(`holding-status${i}`).className =
            `badge badge-xs ${processes.includes(i + 'holding') ? 'badge-primary' : 'badge-outline'}`;
    }
}

function renderOuts() {
    const actives = getActiveOuts();
    let statuses = Array(STREAM_NUM)
        .fill()
        .map((_) => []);
    actives.forEach((out) => (statuses[out.streamId][out.outId] = true));

    for (let i = 1; i <= STREAM_NUM; i++) {
        const outsDiv = document.getElementById(`stream-outs-${i}`);

        let outsHtml = '';
        // we need to slice slice(0, STREAM_NUM) because outs 98 are used for recording.
        const outSize = getOutSize(i);
        if (outSize === 0) {
            outsHtml += 'No configured outs...';
        }
        for (var j = 1; j <= outSize; j++) {
            let info = streamOutsConfig[i][j];
            if (isOutEmpty(info)) info = { stream: '', out: '', url: '', encoding: '', name: '' };
            const isProcRunning = processes.includes(i + 'out' + j);
            const stateClass = isProcRunning
                ? statuses[i][j]
                    ? 'badge-primary'
                    : 'badge-error'
                : 'badge-outline';
            console.assert(isProcRunning || !statuses[i][j]);

            outsHtml += `
                <div class="my-1">
                    <span class="badge badge-xs ${stateClass}"
                        id="status${i}-${j}"></span>
                    <button class="btn btn-xs btn-primary"
                        onclick="executePhp('/control.php?streamno=${i}&action=out&actnumber=${j}&state=on')">
                        on
                    </button>
                    <button class="btn btn-xs btn-error"
                        onclick="executePhp('/control.php?streamno=${i}&action=out&actnumber=${j}&state=off')">
                        off
                    </button>
                    ${info.encoding === 'source' ? '' : `<b>${capitalize(info.encoding)}</b> `}
                    Out ${j}
                    <div class="tooltip" data-tip="${info.url}">
                        <span id="destination${i}-${j}">${info.name}</span>
                    </div>
                </div>`;
        }

        outsDiv.innerHTML = outsHtml;
    }
}

function parseOutputStreamName(str) {
    const dashIndex = str.indexOf('-');
    return {
        streamId: Number(str.substring(6, dashIndex)),
        destinationName: str.substring(dashIndex + 1),
    };
}

function getActiveOuts() {
    if (statsJson === null) {
        return [];
    }
    let streams = statsJson.rtmp.server.application.find((app) => app.name['#text'] == 'output')
        .live.stream;
    if (streams === undefined) streams = []; // no streams
    if (!Array.isArray(streams)) streams = [streams]; // only one stream
    streams = streams.map((s) => s.name['#text']);

    return streams
        .map((name) => parseOutputStreamName(name))
        .map((p) => ({
            streamId: p.streamId,
            outId: streamOutsConfig[p.streamId].findIndex(
                (info) => info?.name === p.destinationName,
            ),
        }))
        .filter((p) => p.outId !== -1);
}

function extractStreamIds(streamsStats) {
    let streams = streamsStats;
    if (streams === undefined) streams = []; // no streams
    if (!Array.isArray(streams)) streams = [streams]; // only one stream

    return streams
        .map((s) => s.name['#text'])
        .map((name) => ({ streamId: Number(name.substring(6)) }));
}

function getActiveStreams() {
    if (statsJson === null) {
        return { distribute: [], main: [], backup: [], recording: [] };
    }
    let distribute = statsJson.rtmp.server.application.find(
        (app) => app.name['#text'] == 'distribute',
    ).live.stream;
    let main = statsJson.rtmp.server.application.find((app) => app.name['#text'] == 'main').live
        .stream;
    let backup = statsJson.rtmp.server.application.find((app) => app.name['#text'] == 'backup').live
        .stream;
    let recording = statsJson.rtmp.server.application.find(
        (app) => app.name['#text'] == 'recording',
    ).live.stream;

    return {
        distribute: extractStreamIds(distribute),
        main: extractStreamIds(main),
        backup: extractStreamIds(backup),
        recording: extractStreamIds(recording),
    };
}

function batchInputControlClick(isOn) {
    const inputType = document.getElementById('inputType').value;
    const streams = document
        .getElementById('batchInputControl')
        .value.split(' ')
        .map((id) => id.trim())
        .filter((id) => id !== '');
    showResponse(
        `Turning ${isOn ? 'on' : 'off'} ${inputType} input ` + `for streams ${streams.join(', ')}.`,
    );
    executePhp(
        '/control.php?batch-input-control',
        { 'Content-Type': 'application/json' },
        JSON.stringify({
            inputType: inputType,
            streams: streams,
            state: isOn ? 'on' : 'off',
        }),
    );
}

function updateRefreshTime() {
    refreshTime = Math.max(1, Number(document.getElementById('refreshTime').value)) * 1000;
    clearInterval(refreshIntervalId);
    refreshIntervalId = setInterval(rerender, refreshTime);
}

async function rerender() {
    hideBadConnectionAllert();
    streamNames = await fetchStreamNames();
    statsJson = await fetchStats();
    streamOutsConfig = await fetchConfigFile();
    processes = await fetchProcesses();
    renderStreamHeaders();
    renderOuts();
}

window.onload = async function () {
    renderStreamControls();
    setVideoPlayers();
    rerender();
    updateRefreshTime();
    renderLogs();
};

(function renderServerDetails() {
    const address = window.location.hostname;
    const detailsElem = document.getElementById('server-details');
    detailsElem.innerHTML = detailsElem.innerHTML.replaceAll('${address}', address);
})();
