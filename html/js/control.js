function renderStreamControls() {
    const streamControls = document.getElementById('stream-controls');

    let html = '';
    for (let i = 1; i <= STREAM_NUM; i++) {
        // Create the div container
        html += `
            <div class="stream-container p-2">
                <div id="streamHeader${i}" class="text-xl"></div>
                ${getJsmpegPlayerHtml(i)}
                <div id="stream-outs-${i}"></div>
                <details class="collapse bg-base-200 mt-2">
                    <summary class="collapse-title font-medium">More</summary>

                    <div class="collapse-content">`;

        html += `
            <div class="my-1">
                <button
                    class="btn btn-xs btn-primary"
                    href="/control.php?streamno=${i}&action=out&actnumber=98&state=on"
                    target="_blank">
                    on
                </button>
                <button
                    class="btn btn-xs btn-error"
                    href="/control.php?streamno=${i}&action=out&actnumber=98&state=off"
                    target="_blank">
                    off
                </button>
                Record
            </div>

            <div class="my-1">
                <b>Overlays:</b>
                <a href="/control.php?streamno=${i}&action=super&actnumber=1&state=" target="_blank" class="btn btn-xs btn-primary">Add 1</a>
                <a href="/control.php?streamno=${i}&action=super&actnumber=2&state=" target="_blank" class="btn btn-xs btn-primary">Add 2</a>
                <a href="/control.php?streamno=${i}&action=super&actnumber=3&state=" target="_blank" class="btn btn-xs btn-primary">Add 3</a>
                <a href="/control.php?streamno=${i}&action=super&actnumber=4&state=" target="_blank" class="btn btn-xs btn-primary">Add 4</a>
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
            </form>

            <div class="mt-3 font-bold">
                <button
                    onclick="executePhpAndShowResponse('/control.php?streamno=${i}&action=off&actnumber=&state=')"
                    class="btn btn-xs btn-error">off</button>
                    Choose Input:
            </div>
            <div class="my-1">
                <span class="stream-status" id="main-status${i}"></span>
                <button
                    onclick="executePhpAndShowResponse('/control.php?streamno=${i}&action=main&actnumber=&state=turnon')"
                    class="btn btn-xs btn-primary">
                    on
                </button>
                Main Live Stream
            </div>
            <div class="my-1">
                <span class="stream-status" id="backup-status${i}"></span>
                <button
                    onclick="executePhpAndShowResponse('/control.php?streamno=${i}&action=back&actnumber=&state=turnon')"
                    class="btn btn-xs btn-primary" target="_blank">on</button>
                    Backup Live stream
            </div>

            <form method="post" id="videoInputForm${i}" class="my-1">
                <input
                    type="submit"
                    class="btn btn-xs btn-primary"
                    style="display: inline" value="on"
                    onclick="event.preventDefault(); submitFormAndShowResponse('videoInputForm${i}','control.php?streamno=${i}&action=video&actnumber=&state=turnon');" />
                Uploaded
                <select name="video_no" class="select select-bordered select-xs max-w-xs">
                    <option selected value="video">Video</option>
                    <option value="holding">Holding</option>
                </select>
                <input type="text" name="startmin" size="1" value="0" class="input input-bordered input-neutral input-xs w-9"/>m
                <input type="text" style="display: inline" name="startsec" size="1" value="0" class="input input-bordered input-neutral input-xs w-10"/>s
            </form>

            <div class="my-1">
                <button
                    onclick="executePhpAndShowResponse('/control.php?streamno=${i}&action=playlist&actnumber=&state=')"
                    class="btn btn-xs btn-primary">on</button>
                Playlist
            </div>`;

        html += `
                    </div>
                </details>
            </div>`;
    }
    streamControls.innerHTML = html;
}

function renderStreamHeaders() {
    const streams = getActiveStreams();
    let statuses = {
        distribute: Array(STREAM_NUM),
        main: Array(STREAM_NUM),
        backup: Array(STREAM_NUM),
    };
    streams.distribute.forEach((stream) => (statuses.distribute[stream.streamId] = true));
    streams.main.forEach((stream) => (statuses.main[stream.streamId] = true));
    streams.backup.forEach((stream) => (statuses.backup[stream.streamId] = true));

    for (let i = 1; i <= STREAM_NUM; i++) {
        const headerElem = document.getElementById(`streamHeader${i}`);
        const streamName = streamNames[i];
        const suffix = streamName ? ` (${streamName})` : '';
        headerElem.innerHTML = `
			<span class="stream-status ${statuses.distribute[i] ? 'on' : 'off'}" id="distribute-status${i}"></span>
			Stream ${i}${suffix}`;

        document.getElementById(`main-status${i}`).className =
            `stream-status ${statuses.main[i] ? 'on' : 'off'}`;
        document.getElementById(`backup-status${i}`).className =
            `stream-status ${statuses.backup[i] ? 'on' : 'off'}`;
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
        const outSize = streamOutsConfig[i]
            .slice(0, STREAM_NUM)
            .findLastIndex((info) => !isOutEmpty(info));

        for (var j = 1; j <= outSize; j++) {
            let info = streamOutsConfig[i][j];
            if (isOutEmpty(info)) info = { stream: '', out: '', url: '', encoding: '', name: '' };
            const on = `<button class="btn btn-xs btn-primary"
				onclick="executePhpAndShowResponse('/control.php?streamno=${i}&action=out&actnumber=${j}&state=on')">on</button>`;
            const off = `<button class="btn btn-xs btn-error"
				onclick="executePhpAndShowResponse('/control.php?streamno=${i}&action=out&actnumber=${j}&state=off')">off</button>`;
            let title = `Out ${j}`;
            let destDiv = `<span id="destination${i}-${j}">${info.name}</span>`;
            if (info.name !== '') {
                title =
                    (info.encoding === 'source' ? '' : `<b>${capitalize(info.encoding)}</b> `) +
                    `${title}: `;
                destDiv = `<div class="tooltip" data-tip="${info.url}">${destDiv}</div>`;
            }
            outsHtml += `
				<div class="my-1">
					<span class="stream-status ${statuses[i][j] ? 'on' : 'off'}" id="status${i}-${j}"></span>
					${on} ${off} ${title} ${destDiv}
				</div>`;
        }
        if (outSize < 1) {
            outsHtml += 'No configured outs...';
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
    let distribute = statsJson.rtmp.server.application.find(
        (app) => app.name['#text'] == 'distribute',
    ).live.stream;
    let main = statsJson.rtmp.server.application.find((app) => app.name['#text'] == 'main').live
        .stream;
    let backup = statsJson.rtmp.server.application.find((app) => app.name['#text'] == 'backup').live
        .stream;

    return {
        distribute: extractStreamIds(distribute),
        main: extractStreamIds(main),
        backup: extractStreamIds(backup),
    };
}

function batchInputControlClick(isOn) {
    const inputType = document.getElementById('inputType').value;
    const streams = document
        .getElementById('batchInputStreams')
        .value.split(' ')
        .map((id) => id.trim())
        .filter((id) => id !== '');
    executePhpAndShowResponse(
        '/control.php?batch-input-control',
        { 'Content-Type': 'application/json' },
        JSON.stringify({
            inputType: inputType,
            streams: streams,
            state: isOn ? 'on' : 'off',
        }),
    );
}

async function rerender() {
    streamNames = await fetchStreamNames();
    statsJson = await fetchStats();
    streamOutsConfig = await fetchConfigFile();
    renderStreamHeaders();
    renderOuts();
}

window.onload = async function () {
    renderStreamControls();
    setVideoPlayers();
    rerender();
    setInterval(rerender, 5000);
};

(function renderServerDetails() {
    const address = window.location.hostname;
    const detailsElem = document.getElementById('server-details');
    detailsElem.innerHTML = detailsElem.innerHTML.replaceAll('${address}', address);
})();
