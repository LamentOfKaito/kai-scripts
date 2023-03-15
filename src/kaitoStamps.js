/**
 * Emote name to URL mapping.
 *
 * @example
 * KaitoStamps['Hello']
 *
 * @see https://projectsekai.fandom.com/wiki/Stamps
 */
export const kaitoStamps = {
    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0005.png
    Err: 'https://static.wikia.nocookie.net/projectsekai/images/8/83/Stamp0005.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0044.png
    HavingFunQ: 'https://static.wikia.nocookie.net/projectsekai/images/b/b4/Stamp0044.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0526.png
    LetsRaiseTheRoof: 'https://static.wikia.nocookie.net/projectsekai/images/e/ed/Stamp0526.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0581.png
    Jp0: 'https://static.wikia.nocookie.net/projectsekai/images/d/db/Stamp0581.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0275.png
    Hello: 'https://static.wikia.nocookie.net/projectsekai/images/9/93/Stamp0275.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0276.png
    GoodLuck: 'https://static.wikia.nocookie.net/projectsekai/images/c/ce/Stamp0276.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0277.png
    Ahh: 'https://static.wikia.nocookie.net/projectsekai/images/d/d5/Stamp0277.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0278.png
    Haha: 'https://static.wikia.nocookie.net/projectsekai/images/8/8d/Stamp0278.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0279.png
    Nice: 'https://static.wikia.nocookie.net/projectsekai/images/d/dd/Stamp0279.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0280.png
    Thanks: 'https://static.wikia.nocookie.net/projectsekai/images/f/fc/Stamp0280.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0281.png
    Sorry: 'https://static.wikia.nocookie.net/projectsekai/images/0/03/Stamp0281.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0282.png
    SeeYou: 'https://static.wikia.nocookie.net/projectsekai/images/4/46/Stamp0282.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0283.png
    OhNo: 'https://static.wikia.nocookie.net/projectsekai/images/4/42/Stamp0283.png',

    ThatWasFun: // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0284.png
    'https://static.wikia.nocookie.net/projectsekai/images/f/f7/Stamp0284.png',

    ItsAllGood: // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0285.png
    'https://static.wikia.nocookie.net/projectsekai/images/2/28/Stamp0285.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0602.png
    Dots: 'https://static.wikia.nocookie.net/projectsekai/images/0/06/Stamp0602.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0603.png
    // TODO: Rename!
    Jp1: 'https://static.wikia.nocookie.net/projectsekai/images/b/b9/Stamp0603.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0604.png
    // TODO: Rename!
    Jp2: 'https://static.wikia.nocookie.net/projectsekai/images/b/b0/Stamp0604.png',

    // https://projectsekai.fandom.com/wiki/Stamps?file=Stamp0605.png
    // TODO: Rename!
    Jp3: 'https://static.wikia.nocookie.net/projectsekai/images/7/7d/Stamp0605.png',
}

/**
 * @example
 * emoteToLink(':kaitoHello:');
 * emoteToLink(':kaitoSorry:\r\n');
 *
 * @todo Validate the input pattern and throw `InvalidArgumentException` or `IllegalArgumentException` (a la Java).
 * @todo If the requested emote is not found, throw `NoSuchElementException` or `NotFoundException` (a la Java).
 *
 * @param {string} str
 * @returns {string?} URL or null
 */
export function emoteToLink(str) {
    // Again, a la Java: `private static final String TAG = MyClass.class.getSimpleName();`
    const TAG = emoteToLink.name;
    
    const emoteNameRegex = /\:kaito(?<emoteName>\w+)\:/;
    const groups = str.match(emoteNameRegex).groups;
    const emoteName = groups.emoteName;
    const link = kaitoStamps[emoteName];
    
    console.log(TAG, {emoteName, link, str});
    
    if (!link) {
        // or throw an exception
        return null;
    } else {
        return link;
    }
}

function test() {
    const actual = emoteToLink(':kaitoSorry:\r\n');
    const expected = kaitoStamps['Sorry'];
    console.assert(expected === actual, 'Unexpected output', {expected, actual});
}
