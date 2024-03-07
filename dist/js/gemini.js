/*! For license information please see gemini.js.LICENSE.txt */
(()=>{"use strict";var e,t={445:(e,t)=>{var n,s,o,i,r,a;t.HarmCategory=void 0,(n=t.HarmCategory||(t.HarmCategory={})).HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",n.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",n.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",n.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",n.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",t.HarmBlockThreshold=void 0,(s=t.HarmBlockThreshold||(t.HarmBlockThreshold={})).HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",s.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",s.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",s.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",s.BLOCK_NONE="BLOCK_NONE",t.HarmProbability=void 0,(o=t.HarmProbability||(t.HarmProbability={})).HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",o.NEGLIGIBLE="NEGLIGIBLE",o.LOW="LOW",o.MEDIUM="MEDIUM",o.HIGH="HIGH",t.BlockReason=void 0,(i=t.BlockReason||(t.BlockReason={})).BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",i.SAFETY="SAFETY",i.OTHER="OTHER",t.FinishReason=void 0,(r=t.FinishReason||(t.FinishReason={})).FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",r.STOP="STOP",r.MAX_TOKENS="MAX_TOKENS",r.SAFETY="SAFETY",r.RECITATION="RECITATION",r.OTHER="OTHER",t.TaskType=void 0,(a=t.TaskType||(t.TaskType={})).TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",a.RETRIEVAL_QUERY="RETRIEVAL_QUERY",a.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",a.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",a.CLASSIFICATION="CLASSIFICATION",a.CLUSTERING="CLUSTERING";class c extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class d extends c{constructor(e,t){super(e),this.response=t}}const h="0.2.1",l="genai-js";var u;!function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"}(u||(u={}));class E{constructor(e,t,n,s){this.model=e,this.task=t,this.apiKey=n,this.stream=s}toString(){let e=`https://generativelanguage.googleapis.com/v1/${this.model}:${this.task}`;return this.stream&&(e+="?alt=sse"),e}}async function f(e,t,n){let s;try{if(s=await fetch(e.toString(),Object.assign(Object.assign({},function(e){const t={};if((null==e?void 0:e.timeout)>=0){const n=new AbortController,s=n.signal;setTimeout((()=>n.abort()),e.timeout),t.signal=s}return t}(n)),{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-client":`${l}/${h}`,"x-goog-api-key":e.apiKey},body:t})),!s.ok){let e="";try{const t=await s.json();e=t.error.message,t.error.details&&(e+=` ${JSON.stringify(t.error.details)}`)}catch(e){}throw new Error(`[${s.status} ${s.statusText}] ${e}`)}}catch(t){const n=new c(`Error fetching from ${e.toString()}: ${t.message}`);throw n.stack=t.stack,n}return s}function g(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),T(e.candidates[0]))throw new d(`${_(e)}`,e);return function(e){var t,n,s,o;return(null===(o=null===(s=null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)||void 0===s?void 0:s[0])||void 0===o?void 0:o.text)?e.candidates[0].content.parts[0].text:""}(e)}if(e.promptFeedback)throw new d(`Text not available. ${_(e)}`,e);return""},e}const p=[t.FinishReason.RECITATION,t.FinishReason.SAFETY];function T(e){return!!e.finishReason&&p.includes(e.finishReason)}function _(e){var t,n,s;let o="";if(e.candidates&&0!==e.candidates.length||!e.promptFeedback){if(null===(s=e.candidates)||void 0===s?void 0:s[0]){const t=e.candidates[0];T(t)&&(o+=`Candidate was blocked due to ${t.finishReason}`,t.finishMessage&&(o+=`: ${t.finishMessage}`))}}else o+="Response was blocked",(null===(t=e.promptFeedback)||void 0===t?void 0:t.blockReason)&&(o+=` due to ${e.promptFeedback.blockReason}`),(null===(n=e.promptFeedback)||void 0===n?void 0:n.blockReasonMessage)&&(o+=`: ${e.promptFeedback.blockReasonMessage}`);return o}function O(e){return this instanceof O?(this.v=e,this):new O(e)}"function"==typeof SuppressedError&&SuppressedError;const y=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function m(e){const t=[],n=e.getReader();for(;;){const{done:e,value:s}=await n.read();if(e)return g(S(t));t.push(s)}}function C(e){return function(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s,o=n.apply(e,t||[]),i=[];return s={},r("next"),r("throw"),r("return"),s[Symbol.asyncIterator]=function(){return this},s;function r(e){o[e]&&(s[e]=function(t){return new Promise((function(n,s){i.push([e,t,n,s])>1||a(e,t)}))})}function a(e,t){try{(n=o[e](t)).value instanceof O?Promise.resolve(n.value.v).then(c,d):h(i[0][2],n)}catch(e){h(i[0][3],e)}var n}function c(e){a("next",e)}function d(e){a("throw",e)}function h(e,t){e(t),i.shift(),i.length&&a(i[0][0],i[0][1])}}(this,arguments,(function*(){const t=e.getReader();for(;;){const{value:e,done:n}=yield O(t.read());if(n)break;yield yield O(g(e))}}))}function S(e){const t=e[e.length-1],n={promptFeedback:null==t?void 0:t.promptFeedback};for(const t of e)if(t.candidates)for(const e of t.candidates){const t=e.index;if(n.candidates||(n.candidates=[]),n.candidates[t]||(n.candidates[t]={index:e.index}),n.candidates[t].citationMetadata=e.citationMetadata,n.candidates[t].finishReason=e.finishReason,n.candidates[t].finishMessage=e.finishMessage,n.candidates[t].safetyRatings=e.safetyRatings,e.content&&e.content.parts){n.candidates[t].content||(n.candidates[t].content={role:e.content.role||"user",parts:[{text:""}]});for(const s of e.content.parts)s.text&&(n.candidates[t].content.parts[0].text+=s.text)}}return n}async function R(e,t,n,s){const o=new E(t,u.STREAM_GENERATE_CONTENT,e,!0);return function(e){const t=function(e){const t=e.getReader();return new ReadableStream({start(e){let n="";return function s(){return t.read().then((({value:t,done:o})=>{if(o)return n.trim()?void e.error(new c("Failed to parse stream")):void e.close();n+=t;let i,r=n.match(y);for(;r;){try{i=JSON.parse(r[1])}catch(t){return void e.error(new c(`Error parsing JSON response: "${r[1]}"`))}e.enqueue(i),n=n.substring(r[0].length),r=n.match(y)}return s()}))}()}})}(e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0}))),[n,s]=t.tee();return{stream:C(n),response:m(s)}}(await f(o,JSON.stringify(n),s))}async function A(e,t,n,s){const o=new E(t,u.GENERATE_CONTENT,e,!1),i=await f(o,JSON.stringify(n),s);return{response:g(await i.json())}}function N(e,t){let n=[];if("string"==typeof e)n=[{text:e}];else for(const t of e)"string"==typeof t?n.push({text:t}):n.push(t);return{role:t,parts:n}}function I(e){return e.contents?e:{contents:[N(e,"user")]}}const v="SILENT_ERROR";class M{constructor(e,t,n,s){this.model=t,this.params=n,this.requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,(null==n?void 0:n.history)&&(this._history=n.history.map((e=>{if(!e.role)throw new Error("Missing role for history item: "+JSON.stringify(e));return N(e.parts,e.role)})))}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e){var t,n;await this._sendPromise;const s=N(e,"user"),o={safetySettings:null===(t=this.params)||void 0===t?void 0:t.safetySettings,generationConfig:null===(n=this.params)||void 0===n?void 0:n.generationConfig,contents:[...this._history,s]};let i;return this._sendPromise=this._sendPromise.then((()=>A(this._apiKey,this.model,o,this.requestOptions))).then((e=>{var t;if(e.response.candidates&&e.response.candidates.length>0){this._history.push(s);const n=Object.assign({parts:[],role:"model"},null===(t=e.response.candidates)||void 0===t?void 0:t[0].content);this._history.push(n)}else{const t=_(e.response);t&&console.warn(`sendMessage() was unsuccessful. ${t}. Inspect response object for details.`)}i=e})),await this._sendPromise,i}async sendMessageStream(e){var t,n;await this._sendPromise;const s=N(e,"user"),o={safetySettings:null===(t=this.params)||void 0===t?void 0:t.safetySettings,generationConfig:null===(n=this.params)||void 0===n?void 0:n.generationConfig,contents:[...this._history,s]},i=R(this._apiKey,this.model,o,this.requestOptions);return this._sendPromise=this._sendPromise.then((()=>i)).catch((e=>{throw new Error(v)})).then((e=>e.response)).then((e=>{if(e.candidates&&e.candidates.length>0){this._history.push(s);const t=Object.assign({},e.candidates[0].content);t.role||(t.role="model"),this._history.push(t)}else{const t=_(e);t&&console.warn(`sendMessageStream() was unsuccessful. ${t}. Inspect response object for details.`)}})).catch((e=>{e.message!==v&&console.error(e)})),i}}class w{constructor(e,t,n){this.apiKey=e,t.model.includes("/")?this.model=t.model:this.model=`models/${t.model}`,this.generationConfig=t.generationConfig||{},this.safetySettings=t.safetySettings||[],this.requestOptions=n||{}}async generateContent(e){const t=I(e);return A(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings},t),this.requestOptions)}async generateContentStream(e){const t=I(e);return R(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings},t),this.requestOptions)}startChat(e){return new M(this.apiKey,this.model,e,this.requestOptions)}async countTokens(e){const t=I(e);return async function(e,t,n,s){const o=new E(t,u.COUNT_TOKENS,e,!1);return(await f(o,JSON.stringify(Object.assign(Object.assign({},n),{model:t})),void 0)).json()}(this.apiKey,this.model,t)}async embedContent(e){const t="string"==typeof(n=e)||Array.isArray(n)?{content:N(n,"user")}:n;var n;return async function(e,t,n,s){const o=new E(t,u.EMBED_CONTENT,e,!1);return(await f(o,JSON.stringify(n),void 0)).json()}(this.apiKey,this.model,t)}async batchEmbedContents(e){return async function(e,t,n,s){const o=new E(t,u.BATCH_EMBED_CONTENTS,e,!1),i=n.requests.map((e=>Object.assign(Object.assign({},e),{model:t})));return(await f(o,JSON.stringify({requests:i}),s)).json()}(this.apiKey,this.model,e,this.requestOptions)}}t.ChatSession=M,t.GenerativeModel=w,t.GoogleGenerativeAI=class{constructor(e){this.apiKey=e}getGenerativeModel(e,t){if(!e.model)throw new c("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new w(this.apiKey,e,t)}}}},n={};(e=function e(s){var o=n[s];if(void 0!==o)return o.exports;var i=n[s]={exports:{}};return t[s](i,i.exports,e),i.exports}(445)).GoogleGenerativeAI,e.HarmCategory,e.HarmBlockThreshold})();