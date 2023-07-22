const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export default openai