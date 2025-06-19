import dotenv from 'dotenv'
dotenv.config()


import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const activities = [
    "your mom",
    "Deltarune Chapter 5",
    "Deltarune Chapter 7",
    "Glaring angrily at elon musk",
    "Enjoying yuri",
    "Listening to Kasane Teto",
    "Listening to Vocaloid",
];

client.on("ready", () => {
    // run every 25 seconds
    setInterval(() => {
      // generate random number between 0 and length of array.
      const randomIndex = Math.floor(Math.random() * activities.length);
      const newActivity = activities[randomIndex];

      client.user.setActivity(newActivity);
    }, 25_000);
});


const alternateSites = [
    "fixupx.com",
    "girlcockx.com",
    "stupidpenisx.com",
    "vxtwitter.com",
    "fxtwitter.com",
    "fixvx.com",
]

function containsAlternate(link) {
    for (const site of alternateSites) {
        if (link.indexOf(site) !== -1) {
            return true
        }
    }

    return false
}

client.login(process.env.DISCORD_TOKEN);

console.log("Bot is running!");

client.on("messageCreate", async (message) => {

    if (!message?.author.bot) {
        if (message.channel.nsfw) {
            console.log("Nsfw!");
        }
        // If replying to us.
            /*try {
                if (message.reference.messageId != undefined) {
                    var repliedMsg = await message.channel.messages.fetch(message.reference.messageId)
    

                    repliedMsg.mentions.users.first();
                    if (user !== undefined) {
                        
                    }
        
                    try {
                        message.channel.send({content: "test"})
                    }
                    catch(err) {
                        console.log(err)
                    }
                }
            }
            catch (err) {
                console.log(err)
            }*/
        

        //const channel = await client.channels.cache.find(channel => channel.id === message.channelId)
        if ((message.content.indexOf("x.com") !== -1 && message.content.indexOf("twitter.com")) && !containsAlternate(message.content)) {
            var replacementLink = "fixupx.com"

            console.log("Oh shit this is a shitty twitter link! Replacing it with a cool gay one :3")
            const channel = await message.channel.fetch()
            console.log(`${message.author.displayName} sent a message in #${channel.name}:`)
            console.log(message.content);
            try {
                message.delete();
            }
            catch(err) {
                console.log(err)
            }

            if (channel.name === "go-for-it") {
                replacementLink = "girlcockx.com"
            }

            if (channel.name === "politics") {
                replacementLink = "stupidpenisx.com"
            }

            const botMessage = `**${message.author}** posted:\n${message.content.replace("x.com", replacementLink)}`;
            console.log(`Message sent:\n${botMessage}`);

            try {
                message.channel.send({content: botMessage, allowedMentions: { parse: [] }});
            }
            catch(err) {
                console.log(err)
            }
        }
    }
});