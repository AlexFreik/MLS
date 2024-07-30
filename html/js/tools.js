// CONSTANTS
const STREAM_NUM = 25;
const OUT_NUM = 95;

// This will be fetched from a file
let streamNames = [];
let streamOutsConfig = [];
let statsJson = [];

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Tools
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function clearAndAddChooseOption(selector) {
    removeAllChildNodes(selector);
    let option = document.createElement('option');
    option.value = '';
    option.text = 'Choose';
    selector.appendChild(option);
}

// AJAX request function
async function submitFormAndShowResponse(formId, phpUrl) {
    const form = document.getElementById(formId);
    if (form.checkValidity()) {
        const formData = new FormData(form);
        executePhpAndShowResponse(phpUrl, {}, formData);
    } else {
        form.reportValidity();
    }
}

async function executePhpAndShowResponse(phpUrl, headers = {}, body = undefined) {
    try {
        const response = await fetch(phpUrl, { method: 'POST', headers: headers, body: body });
        if (response.ok) {
            showResponse(await response.text());
        } else {
            console.error('Request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function showResponse(response) {
    var responseBox = document.getElementById('responseBox');
    responseBox.innerHTML = `<p>${response}</p><div class="divider"></div>` + responseBox.innerHTML;
}

async function fetchStats() {
    try {
        const response = await fetch('/stat-test.xml');
        const data = await response.text();
        const parser = new DOMParser();
        const xmlData = parser.parseFromString(data, 'text/xml');
        return xml2json(xmlData);
    } catch (error) {
        console.error('Error fetching stats data:', error);
    }
}

async function writeStreamNames() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'save-stream-names.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            showResponse(xhr.responseText);
        }
    };

    var jsonData = JSON.stringify({ csvData: [streamNames] });
    xhr.send(jsonData);
}

async function fetchStreamNames() {
    try {
        const response = await fetch('fetch-stream-names.php');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const streamNames = data.csvData[0];
        return streamNames;
    } catch (error) {
        console.error('Error fetching stream names:', error);
    }
    return [];
}

function parseOutLine(text) {
    const matches = text.match(/^__stream(\d+)__out(\d+)__(.*)$/);
    const split = matches ? matches[3].trim().split(' ') : [];
    if (matches && split.length === 3) {
        return {
            stream: matches[1],
            out: matches[2],
            url: split[0],
            encoding: split[1],
            name: split[2],
        };
    } else {
        return {};
    }
}

function parseOutsConfig(text) {
    const lines = text.split('\n');

    const streamOutsConfig = [];
    for (let i = 1; i <= STREAM_NUM; i++) {
        streamOutsConfig[i] = [];
        for (let j = 1; j <= OUT_NUM; j++) {
            streamOutsConfig[i][j] = {};
        }
    }

    lines
        .filter((line) => line !== '')
        .forEach((line) => {
            out = parseOutLine(line);
            if (!isOutEmpty(out)) streamOutsConfig[out.stream][out.out] = out;
        });

    return streamOutsConfig;
}

function isOutEmpty(out) {
    return out?.name ? false : true;
}

async function fetchConfigFile() {
    const response = await fetch('/config.txt');
    return parseOutsConfig(await response.text());
}

function xml2json(xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) {
        // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj['@attributes'] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) {
        // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof obj[nodeName] == 'undefined') {
                obj[nodeName] = xml2json(item);
            } else {
                if (typeof obj[nodeName].push == 'undefined') {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xml2json(item));
            }
        }
    }
    return obj;
}
