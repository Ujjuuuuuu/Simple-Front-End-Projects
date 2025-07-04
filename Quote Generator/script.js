const quote = document.querySelector("blockquote");
const author = document.querySelector("span");
const btn = document.querySelector(".btn");

const URL = "https://api.api-ninjas.com/v1/quotes";
const apiKey = "MxndGTzI79UKnb49H3nvig==czRRe2Wxul9SX5Jf";

const getQuote = async () => {
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  });
  const data = await response.json();
  quote.innerText = data[0]["quote"];
  author.innerText = data[0]["author"];9
};
btn.addEventListener("click", () => {
  getQuote();
});
window.addEventListener("load", () => {
  getQuote();
});