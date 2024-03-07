import runGeminiAI from "../Gemini/GeminiAI";
import { MessageModel } from "../Models/MessageModel";

const goGeminiGo = async (message, language) => {
  chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
    var geminiResponse = await runGeminiAI(message, language);
    chrome.tabs.sendMessage(tabs[0].id, { type: '4', message: geminiResponse });
});

}

const handleContentMessage = (message, sender, sendResponse) => {
  switch (message?.type) {
    case MessageModel.Undefined:
      return;
    case MessageModel.Text:
      chrome.storage.local.get(["Language"]).then((result) => {
        goGeminiGo(message.value, result.Language);
      });
      return;
    case MessageModel.Language:
      chrome.storage.local.set({ 'Language': message.value }).then(() => {
      });
      return;
    default:
      return;
  }
}


chrome.runtime.onMessage.addListener(handleContentMessage)
