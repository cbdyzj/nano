const QUERY_API = "https://zh.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=1&explaintext=true&exintro=true&redirects=true&titles="
const URL_PREFIX = 'https://zh.m.wikipedia.org/wiki/'

const MAX_LENGTH = 320

function ellipsis(longString = '') {
    if (longString.length <= MAX_LENGTH) {
        return longString
    }
    const stringItems = longString.split('\n')
    let result = ''
    if (stringItems[0].length <= MAX_LENGTH) {
        result = stringItems[0]
        for (let i = 1; i < stringItems.length; i++) {
            if (result.length + stringItems[i].length > MAX_LENGTH) {
                break
            }
            result += '\n' + stringItems[i]
        }
        return result
    }

    const ellipsisString = longString.slice(0, MAX_LENGTH)
    if (!/[。!]$/.test(ellipsisString)) {
        return ellipsisString + '...'
    }
    return ellipsisString
}

export const wikiExtracts = async function (title) {
    try {
        const encodedTitle = encodeURIComponent(title)
        const response = await fetch(QUERY_API + encodedTitle)
        const data = await response.json()
        const pages = data.query.pages

        const wiki = Object.values(pages)[0]
        if (pages['-1'] || !wiki) {
            return 'nano没有找到：' + title
        }
        if (!wiki.extract) {
            return URL_PREFIX + encodedTitle
        }
        return ellipsis(wiki.extract) + '\n' + URL_PREFIX + encodedTitle
    } catch (error) {
        console.error(error)
        return 'nano请求wiki时遇到了异常'
    }
} 
