const axios = require("axios");

const banglaJokes = [
  "শিক্ষক: রাসেল, তুমি কেন ক্লাসে ঘুমাও?\nরাসেল: স্যার, আপনি কি জানেন না রাতে পড়লে দিনে ঘুম পায়? 😂",
  "ডাক্তার: আপনার সমস্যা কী?\nরোগী: আমি যা বলি সবাই শুনতে পায় না।\nডাক্তার: আবার বলুন?\nরোগী: আমি যা বলি সবাই শুনতে পায় না! 😅",
  "বাবা: পরীক্ষায় ০ পেয়েছ কেন?\nছেলে: বাবা, আমার কলম শেষ হয়ে গিয়েছিল।\nবাবা: তাহলে কীভাবে ০ লিখলে?\nছেলে: সেটা টিচার লিখেছেন! 🤣",
  "একজন লোক ডাক্তারের কাছে গেল: ডাক্তার সাহেব, আমি যখনই কফি খাই চোখে ব্যথা করে।\nডাক্তার: চামচটা কাপ থেকে বের করে খান। 😂",
  "মা: বাবা, তুমি রোজ স্কুলে যাও কেন?\nছেলে: কারণ স্কুল আমার কাছে আসে না! 😅",
  "একজন মানুষ দোকানে গেল: ভাই, এই জুতা কি টেকসই?\nদোকানদার: এত টেকসই যে আমার বাবার সময়ের জুতা এখনও আছে।\nলোক: তাহলে দেখান।\nদোকানদার: সেটা আমার পায়ে আছে! 🤣",
  "রিকশাওয়ালা: ভাড়া ২০ টাকা।\nযাত্রী: আগে ১০ টাকা ছিল তো?\nরিকশাওয়ালা: হ্যাঁ, কিন্তু পেট্রোল দাম বেড়েছে।\nযাত্রী: রিকশায় কি পেট্রোল লাগে?\nরিকশাওয়ালা: না, কিন্তু আমার খাওয়ার খরচ বেড়েছে! 😂",
  "ছাত্র: স্যার, আমি পরীক্ষায় ১০০ তে ১০০ পেয়েছি!\nশিক্ষক: এবার ১০০ তে ৫০ পাও!\nছাত্র: কেন স্যার?\nশিক্ষক: যাতে বাড়িতে বলতে পারো ৫০% উন্নতি হয়েছে! 😅"
];

module.exports = {
  name: "joke",
  aliases: ["jokes", "funny", "হাসি", "hasi"],
  description: "বাংলা/English মজার jokes পাও",
  usage: "!joke বা !joke en (English joke)",
  adminOnly: false,

  async run({ api, event, args, config }) {
    const { threadID, messageID } = event;

    const wantEnglish = args.length && (args[0].toLowerCase() === "en" || args[0].toLowerCase() === "english");

    try {
      if (wantEnglish) {
        const res = await axios.get(
          "https://v2.jokeapi.dev/joke/Programming,Misc,Pun?safe-mode&type=twopart",
          { timeout: 10000 }
        );
        const joke = res.data;
        if (joke.type === "twopart") {
          api.sendMessage(`😂 Joke!\n\n❓ ${joke.setup}\n\n😄 ${joke.delivery}\n\n🤖 Ghost Net Fun`, threadID, messageID);
        } else {
          api.sendMessage(`😂 ${joke.joke}\n\n🤖 Ghost Net Fun`, threadID, messageID);
        }
      } else {
        const randomJoke = banglaJokes[Math.floor(Math.random() * banglaJokes.length)];
        api.sendMessage(`😂 মজার Joke!\n\n${randomJoke}\n\n🤖 Ghost Net Fun by Rakibul Hasan`, threadID, messageID);
      }
    } catch (err) {
      const randomJoke = banglaJokes[Math.floor(Math.random() * banglaJokes.length)];
      api.sendMessage(`😂 মজার Joke!\n\n${randomJoke}\n\n🤖 Ghost Net Fun`, threadID, messageID);
    }
  }
};
