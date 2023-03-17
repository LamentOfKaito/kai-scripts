/**
 * @file slogdogs-add-matchup-commands
 *
 * Add `!<champion>` commands that link to the matchups video (timestamped).
 * This script is shitty and slow, but it gets the job done.
 *
 * Usage:
 * `node slogdogs-add-matchup-commands.js`
 *
 * Notes:
 * - This script requires RobotJS https://github.com/octalmage/robotjs
 *      * Poor documentation.
 *      * Limited features.
 *      * Slow.
 * - Manually make sure these command names are not already used https://streamelements.com/slogdogs/commands
 * - Twitch commands guide https://support.streamelements.com/en/articles/29-chat-bot-overview-and-guide
 *
 * @author Kaito
 * created on 2023-03-16
 */

const robot = require('robotjs');

const videoUrl = 'https://www.youtube.com/watch?v=V5_IKZ4vF74';

const videoDescription =
`Aatrox 0:45 - 1:53
Akali 1:54 - 3:55 
Akshan 3:56 - 5:02
Camille 5:03 - 6:15
Cho'Gath 6:16 - 7:35
Darius 7:36 - 8:38
Dr Mundo 8:39 - 9:36
Fiora 9:37 - 11:02
Gangplank 11:03 - 11:56
Garen 11:57 - 12:25
Gnar 12:26 - 13:15
Gragas 13:16 - 13:53
Graves 13:54 - 14:46
Gwen 14:47 - 16:00
Heimerdinger 16:01 - 16:53
Illaoi 16:54 - 17:40
Irelia 17:41 - 19:08
Jax 19:09 - 20:06
Jayce 20:07 - 20:50
Kalista 20:51 - 21:32
Karma 21:33 - 22:02
Kayle 22:03 - 22:34
Kennen 22:35 - 23:22
Kled 23:23 - 24:14 
Malphite 24:15 - 25:03
Mordekaiser 25:04 - 26:20
Nasus 26:21 - 27:08
Ornn 27:09 - 27:49 
Pantheon 27:50 - 28:23
Poppy - 28:24 - 28:55
Quinn 28:56 - 29:27
Renekton 29:28 - 30:01
Rengar 30:02 - 30:30
Riven 30:31 - 31:05
Rumble 31:06 - 31:41
Sett 31:42 - 32:24
Shen 32:25 - 33:07
Singed 33:08 - 34:04
Sion 34:05 - 34:41
Swain 34:42 - 35:16
Sylas 35:17 - 36:10
Tahm Kench 36:11 - 36:44
Teemo 36:45 - 37:20 
Trundle 37:21 - 37:54
Tryndamere 37:55 - 38:57
Urgot 38:58 - 39:41
Vayne 39:42 - 40:02
Volibear 40:03 - 40:38 
Vladimir 40:39 - 41:11
Warwick 41:12 - 41:52
Wukong 41:53 - 42:34
Yasuo 42:35 - 43:39
Yone 43:40 - 45:14 
Shyvana 45:15 - 45:53
Sejuani 45:54 - 46:11`;

// Pattern: "ChampionName startM:startS - endM-endS"
const lineRegex = /^(?<name>.*?)\s+(?<startM>\d{1,2})\:(?<startS>\d{1,2})\s+\-/;

const lines = videoDescription.split('\n');
const infos = lines
                .map(line => line.match(lineRegex))
                .map(match => {
                    const {name, startM, startS} = match.groups;
                    return {name, startM, startS};
                })
                .map(parsed => {
                    const {name, startM, startS} = parsed;
                    const simpleName = name.toLowerCase().replace(/[^\w]/g, '');
                    const commandName = simpleName;
                    const timestampedUrl = `${videoUrl}&t=${startM}m${startS}s`;
                    const content = `Jump to ${name}'s timestamp: SEASON 12 TOP MATCHUPS ${timestampedUrl}`;
                    return {commandName, content};
                });

const addCommands = infos.map(info => `!command add !${info.commandName} ${info.content}`);
//const removeCommands = infos.map(info => `!command remove !${info.commandName}`);

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * Send messages one after another.
 *
 * @todo FIXME: Typing is still too slow.
 * Tried setting the delay to 0ms or 1ms, but it did not help much.
 *
 * @param {string[]} msgs
 */
function sendMessages(msgs) {
    // instead of the default 10
    robot.setKeyboardDelay(0);
    
    msgs.forEach(msg => {
        robot.typeString(msg);
        robot.keyTap('enter');
    });
}

async function main() {
    console.log('Focus the input box!');
    console.log('Starting in 5s...');
    await delay(5 * 1000);
    console.log('Started.');
    sendMessages(addCommands);
    console.log('Done.');    
}

main();
