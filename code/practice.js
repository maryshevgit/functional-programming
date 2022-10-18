import {writeFile, log, readFile} from "./helpers";

const path = 'iqdev.digital'

log('green', 'Read file', path)

let fileData;

try {
    fileData = readFile(path)
}   catch (e) {
    log('red', 'Error', e.message)
}

const urls = fileData.match(/[^\r\n]+/g) || [];

const urlsInfo = []

for (let i = 0; i < urls.length; i++) {
    let parsedUrl;

    try {
        parsedUrl = new URL(urls[i])
    }   catch(e) {
        log('red', 'Error', e.message)
    }

    if(
        parsedUrl &&
        (parsedUrl.protocol === 'https:' || parsedUrl.protocol === 'http:') &&
        parsedUrl.hostname === 'iqdev.digital'
    ) {
        const { hostname, pathname, protocol, search} = parsedUrl;

        urlsInfo.push({
            protocol,
            hostname,
            pathname,
            query: search
        })
    }
}

const formatedUrlsInfo = JSON.stringify(urlsInfo, null, 2)

log('green', 'Write to file', formatedUrlsInfo);

try {
    writeFile('urlsInfo.json', '../', formatedUrlsInfo)
}   catch (e) {
    log('red', 'Error', e.message)
}