function renderStreamSelectors() {
    const streamSelectors = document.getElementsByClassName('stream-selector');

    for (let selector of streamSelectors) clearAndAddChooseOption(selector);

    for (let i = 1; i <= STREAM_NUM; i++) {
        for (let selector of streamSelectors) {
            let option = document.createElement('option');
            option.value = String(i);
            const name = streamNames[i];
            option.text = 'Stream ' + i + (name ? ': ' + name : '');
            selector.appendChild(option);
        }
    }
}

function renderOutputs() {
    const outSelector = document.getElementById('out-selector');
    clearAndAddChooseOption(outSelector);

    for (let i = 1; i <= OUT_NUM; i++) {
        let option = document.createElement('option');
        option.value = String(i);
        option.text = 'Out ' + i;
        outSelector.appendChild(option);
    }
}

function updateRtmpUrl() {
    const serverUrl = document.getElementById('server-url').value;
    const streamKey = document.getElementById('stream-key').value;
    const rtmpUrl = document.getElementById('rtmp-url');
    rtmpUrl.value = serverUrl + streamKey;
}

function renderStreamNameTable() {
    const tableHead = document.getElementById('name-table').tHead;
    let tHeadHtml = '<tr>';
    for (let i = 1; i <= STREAM_NUM; i++) {
        tHeadHtml += `<th>Stream ${i}</th>`;
    }
    tHeadHtml += '</tr>';
    tableHead.innerHTML = tHeadHtml;

    const table = document.getElementById('name-table-body');
    let tr = table.insertRow();
    for (let i = 1; i <= STREAM_NUM; i++) {
        const td = tr.insertCell();
        const input = document.createElement('input');
        input.className = 'input input-bordered w-20 max-w-sm input-xs';
        input.type = 'text';
        input.size = '20';
        input.value = streamNames[i];
        input.name = streamNames[i];
        td.appendChild(input);
    }
}

function extractStreamNamesFromTable() {
    const table = document.getElementById('name-table');

    const ans = ['ignored'];
    const row = table.rows[1];
    for (let i = 0; i < STREAM_NUM; i++) {
        const cell = row.cells[i];
        ans.push(cell.firstChild.value);
    }
    return ans;
}

function saveStreamNamesTable() {
    streamNames = extractStreamNamesFromTable();
    renderStreamSelectors();
    writeStreamNames();
}

function bulkSetOuts() {
    const rawText = document.getElementById('bulk-outs').value;
    const outs = rawText
        .split('\n')
        .map((line) => parseOutLine(line))
        .filter((out) => !isOutEmpty(out))
        .map((out) => ({
            name_id: out.name,
            stream_id: out.stream,
            output_id: out.out,
            resolution: out.encoding,
            rtmp_url: out.url,
        }));
    showResponse('Executing bulk outs setting.');
    executePhp(`config.php?bulkset`, { 'Content-Type': 'application/json' }, JSON.stringify(outs));
}

function resetStreamOutputs() {
    const stream = document.getElementById('reset-stream').value;
    if (stream === '') {
        return;
    }
    const i = Number(stream);
    const outSize = getOutSize(i);
    const outs = Array(outSize)
        .fill(0)
        .map((_, j) => ({
            name_id: '',
            stream_id: String(i),
            output_id: String(j + 1),
            resolution: '',
            rtmp_url: '',
        }));
    showResponse('Reseting outs.');
    executePhp(
        `config.php?bulkset`,
        { 'Content-Type': 'application/json' },
        JSON.stringify(outs),
        false,
    );
}

window.onload = async function () {
    streamNames = await fetchStreamNames();
    renderOutputs();
    renderStreamSelectors();
    renderStreamNameTable();
};
