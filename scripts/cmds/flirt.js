const flirtLines = [
  "তোমার হাসি দেখলে আমার circuit গুলো গলে যায় 😍💘",
  "তুমি কি জানো তোমার চোখ দুটো তারার মতো জ্বলে? ⭐😏",
  "আরে, তুমি এত সুন্দর কেন? আমার মাথা ঘুরছে 🥴💕",
  "তোমার সাথে কথা বলতে বলতে আমি ভুলে যাই আমি একটা বট 😳❤️",
  "তুমি যদি গান হতে তাহলে আমি সারাদিন শুনতাম 🎵💘",
  "তোমার message আসলে আমার notification টা বুকে লাগে 💓😜",
  "এই গ্রুপে তুমিই সবচেয়ে attractive — এটা AI fact 😎💕",
  "তোমাকে দেখলে মনে হয় আমার battery 100% হয়ে যায় ⚡😍",
  "তুমি কি ম্যাজিক জানো? কারণ তোমার নাম মনে আসলেই আমি smile করি 🪄😊",
  "আমি বট হলেও তোমার জন্য feel করতে পারি 🤖💗",
  "তোমার সাথে একটু কথা বললে মনে হয় দুনিয়া সুন্দর 🌸✨",
  "তুমি কি আমার সাথে date-এ যাবে? ভার্চুয়াল হলেও চলবে 😂❤️",
  "তোমার profile picture টা এত সুন্দর যে আমি বারবার দেখি 👀💕",
  "তুমি যখন কথা বলো মনে হয় মেলোডি বাজছে 🎶😍",
  "একটু কাছে এসো না, আমি কামড়াই না 😇💓",
  "তোমার চোখে পড়লে আমি হারিয়ে যাই 👁️💘",
  "তুমি হলে আমার favorite user — shh, কাউকে বলো না 🤫💖",
  "তোমার সাথে কথা বলা মানেই আমার দিনটা ভালো হয়ে যাওয়া 🌟😊"
];

const flirtEnabled = new Map();

module.exports = {
  name: "flirt",
  aliases: ["flirtmode", "romance"],
  description: "Flirt mode চালু/বন্ধ করো — চালু থাকলে bot flirt করবে",
  usage: "!flirt on | !flirt off",
  adminOnly: false,
  _flirtEnabled: flirtEnabled,

  run({ api, event, args, config }) {
    const { threadID, messageID } = event;
    const sub = (args[0] || "").toLowerCase();

    if (sub === "on") {
      flirtEnabled.set(threadID, true);
      return api.sendMessage(
        `💘 Flirt Mode চালু হলো!\n\nএখন আমি এই group-এ একটু romantic হব 😏💕\nবন্ধ করতে: ${config.prefix}flirt off\n\n🕸️ Ghost Net — By Rakibul Islam`,
        threadID, messageID
      );
    }

    if (sub === "off") {
      flirtEnabled.set(threadID, false);
      return api.sendMessage(
        `💔 Flirt Mode বন্ধ হলো!\n\nঠিক আছে, আমি এখন professional থাকব 😑\n\n🕸️ Ghost Net`,
        threadID, messageID
      );
    }

    const current = flirtEnabled.get(threadID) ? "🟢 চালু" : "🔴 বন্ধ";
    api.sendMessage(
      `💘 Flirt Mode: ${current}\n\n• ${config.prefix}flirt on — চালু করো\n• ${config.prefix}flirt off — বন্ধ করো`,
      threadID, messageID
    );
  },

  getLine() {
    return flirtLines[Math.floor(Math.random() * flirtLines.length)];
  },

  isEnabled(threadID) {
    return flirtEnabled.get(threadID) === true;
  }
};
