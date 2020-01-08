const SlackBot = require("slackbots");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  name: "cronus"
});

// Start Handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":robot_face:"
  };

  bot.postMessageToChannel("test", "tread lightly @cronus is here", params);
});

// Error Handler
bot.on("error", err => {
  console.log(err);
});

// Message Handler
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  handleMessage(data.text);
});

// Response Handler
function handleMessage(message) {
  if (message.includes(" inspire")) {
    inspireMe();
  } else if (message.includes(" joke")) {
    randomJoke();
  } else if (message.includes(" help")) {
    runHelp();
  } else if (message.includes(" advice")) {
    giveAdvice();
  } else if (message.includes(" trump")) {
    trumpMe();
  }
}

// inspire Me
function inspireMe() {
  axios
    .get(
      "https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json"
    )
    .then(res => {
      const quotes = res.data;
      const random = Math.floor(Math.random() * quotes.length);
      const quote = quotes[random].quote;
      const author = quotes[random].author;

      const params = {
        icon_emoji: ":male-technologist:"
      };

      bot.postMessageToChannel("test", `:zap: ${quote} - *${author}*`, params);
    });
}

// Random Joke
function randomJoke() {
  axios.get("https://api.chucknorris.io/jokes/random").then(res => {
    const joke = res.data.value;

    const params = {
      icon_emoji: ":smile:"
    };

    bot.postMessageToChannel("test", `:zap: ${joke}`, params);
  });
}

function giveAdvice() {
  axios.get("https://api.adviceslip.com/advice").then(res => {
    const advice = res.data.slip.advice;

    const params = {
      icon_emoji: ":smile:"
    };

    bot.postMessageToChannel("test", `:zap: ${advice}`, params);
  });
}

function trumpMe() {
axios.get('https://matchilling-tronald-dump-v1.p.rapidapi.com/random/quote', {
  headers: {
      "x-rapidapi-host": "matchilling-tronald-dump-v1.p.rapidapi.com",
      "x-rapidapi-key": "38fcf7fcfamshc75632e3ce098bdp1db136jsn816d2fbc625e",
      "accept": "application/hal+json"
  }
})
.then(res => {
  const quote = res.data.value;
  const date = res.data.appeared_at;
  const about = res.data.tags[0];
  

  const params = {
    icon_emoji: ":orange:"
  };

  bot.postMessageToChannel("test", `:zap: ${quote}${date}${about}`, params);

})
.catch(err => {
  console.log(err);

})
}

// Show Help
function runHelp() {
  const params = {
    icon_emoji: ":question:"
  };

  bot.postMessageToChannel(
    "test",
    `Type *@cronus* with *inspire* to get an inspiring techie quote, *joke* to get a Chuck Norris random joke and *help* to get this instruction again`,
    params
  );
}


