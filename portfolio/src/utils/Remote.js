import { Buffer } from 'buffer'
import { decompressSync, strFromU8 } from 'fflate'

export const requestUrl = ENV_API_URL

function gunzipString(src) {
    const decompressed = decompressSync(Buffer.from(src, 'base64'))
    const origText = strFromU8(decompressed)
    return origText
}

async function getRemoteData(entryid) {
    console.log('Requesting entry ' + entryid)

    const response = await fetch(`${requestUrl}/data?entryid=${entryid}`)
    const data = await response.json()

    if (data !== false) {
        data.data = gunzipString(data.data) //TODO: change data.data to data.markdown
        return data
    }

    return false
}

//returns the json with the entries data
async function getRemoteEntries(from) {
    console.log('Requesting entry array from ' + from)

    const response = await fetch(`${requestUrl}/entries`)
    const array = await response.json()

    if (array !== false)
        return array

    return []
}

export { getRemoteData, getRemoteEntries }