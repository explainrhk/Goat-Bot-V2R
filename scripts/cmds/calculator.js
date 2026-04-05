const { evaluate } = require("mathjs");

module.exports = {
  name: "calculator",
  aliases: ["calc", "math", "হিসাব", "="],
  description: "যেকোনো math calculation করো",
  usage: "!calc <expression>   Example: !calc 25 * 4 + 10",
  adminOnly: false,

  run({ api, event, args, config }) {
    const { threadID, messageID } = event;

    if (!args.length) {
      return api.sendMessage(
        `🔢 Usage: ${config.prefix}calc <expression>\n\nExample:\n${config.prefix}calc 25 * 4 + 10\n${config.prefix}calc sqrt(144)\n${config.prefix}calc 2^10\n${config.prefix}calc sin(45 deg)\n${config.prefix}calc (100 + 50) / 5\n${config.prefix}calc 15%\n\n✅ Supported: +, -, *, /, ^, sqrt(), sin(), cos(), tan(), log(), pi, e`,
        threadID, messageID
      );
    }

    const expression = args.join(" ");

    try {
      const result = evaluate(expression);

      let resultStr;
      if (typeof result === "number") {
        if (Number.isInteger(result)) {
          resultStr = result.toLocaleString("en-IN");
        } else {
          resultStr = parseFloat(result.toFixed(10)).toString();
        }
      } else {
        resultStr = result.toString();
      }

      api.sendMessage(
        `🔢 Calculator\n━━━━━━━━━━━━━━━\n📝 Input: ${expression}\n✅ Result: ${resultStr}\n━━━━━━━━━━━━━━━\n🤖 Ghost Net Math`,
        threadID, messageID
      );
    } catch (err) {
      api.sendMessage(
        `❌ Invalid expression: ${expression}\n\nError: ${err.message}\n\nExample: ${config.prefix}calc 25 * 4 + 10`,
        threadID, messageID
      );
    }
  }
};
