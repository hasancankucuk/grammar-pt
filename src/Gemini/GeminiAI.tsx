const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

// TODO : API_KEY değiştirilecek.
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyBbmS7SJFVQeXcAuDOi7KmAB7B2evqfaXg";

async function runGaminiAI(message: string, languageCode: string) {
    if(message && message != "") {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];
    
        const parts = [
            {text: `I will share with you my text and which language code I'm writing. If my language is 'undefined' or 'null' you have to detect my language.\nYou have only one task. Find grammarly wrong words, and send me as "[{ \"mistake\": \"worng\", \"correction\": \"wrong\" }, { \"mistake\": \"worng\", \"correction\": \"wrong\" }, { \"mistake\": \"worng\", \"correction\": \"wrong\" }]"
             I'm writing in ${languageCode}. My text is: ${message}`},
        ];
    
        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });
    
        const response = result.response;
        return response.text()
    }
}

export default runGaminiAI;