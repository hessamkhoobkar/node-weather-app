console.log("Runing JS");

const weatherReq = (location, callback) => {
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        callback(data.error, undefined);
      } else {
        callback(undefined, data);
      }
    });
  });
};

const form = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  weatherReq(location, (error, data) => {
    if (error) {
      messageOne.textContent = error;
    } else {
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    }
  });
});
