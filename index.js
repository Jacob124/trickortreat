const fs = require('fs');
const Eris = require('eris');
const bot = new Eris(
  'Njk1MDc4MzQ3MDI1MTU0MDg5.XtfQXQ.U9fi_qbF_vyPvkgH8RX353DGhmE'
);

const channelId = '736892514065317959';
const botId = '755580145078632508';

const phrases = JSON.parse(fs.readFileSync('phrases.json')).data;

const sayRandom = () => {
  const r_time = 120_000 + Math.random() * 60_000;
  console.log(`Next message in ${~~(r_time / 1000)} sec`);
  setTimeout(() => {
    const r_phrase = Math.floor(Math.random() * phrases.length);
    const { phrase, meaning } = phrases[r_phrase];
    bot.createMessage(channelId, `**${phrase}:** ${meaning}`);
    sayRandom();
  }, r_time);
};

bot.on('messageCreate', (msg) => {
  // When a message is created
  if (msg.channel.id === channelId && msg.author.id === botId) {
    const content = msg.embeds[0].description;
    if (content.includes('h!trick'))
      bot.createMessage(msg.channel.id, 'h!trick');
    else if (content.includes('h!treat'))
      bot.createMessage(msg.channel.id, 'h!treat');
  }
});

bot.connect(); // Get the bot to connect to Discord

sayRandom();
