import { kaitoStamps } from './kaitoStamps.js';

/**
 * How it should work:
 * If using Discord, on Enter, check if the content matches `kaitoEmote`.
 * If an emote is found (`emoteToLink(content)`), replace the content with the link then submit.
 *
 * - RobotJS (`npm:robotjs`) can not listen for keyboard events, it can only send events (keyboard, mouse, etc.).
 * - For now, just use Espanso. See {@link generateDiscordEspanso}.
 */
function handleMyDiscordEmotes() {
    throw new Error('UnimplementedException');
}

/**
 * @param {object} kaitoStamps
 * @returns {string} YML file content
 * 
 * @see https://espanso.org/docs/configuration/app-specific-configurations/
 */
function generateDiscordEspanso(kaitoStamps) {

    const matches = Object
        .entries(kaitoStamps)
        .map(([emoteName, link]) => {
            return `  - trigger: ":kaito${emoteName}:"\n` +
                   `    replace: "${link}"\n`
        })
        .join('\n');

    const result = 
        `filter_exec: "Discord"\n\n` +
        `matches:\n` +
        `${matches}`;
        
    return result;
}

/**
 * Usage:
 * `node handleDiscordEmotes > discord.yml`
 */
function printYml() {
    console.log(generateDiscordEspanso(kaitoStamps));
}
printYml();
