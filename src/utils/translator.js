import { api } from "../libs/api";

async function translator({ text }) {
  const options = {
    method: "POST",
    url: "https://microsoft-translator-text.p.rapidapi.com/translate",
    params: {
      "to[0]": "id",
      "api-version": "3.0",
      from: "en",
      profanityAction: "NoAction",
      textType: "plain",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "743aaeefafmshd0bdb29251123e8p1e1b65jsnc2b66366a965",
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    },
    data: [
      {
        Text: `${text}`,
      },
    ],
  };

  try {
    const res = await api.request(options);
    return res.data[0].translations[0].text;
  } catch (error) {
    console.error(`Error translating synopsis:`, error);
    return "Translator error...";
  }
}

export { translator };
