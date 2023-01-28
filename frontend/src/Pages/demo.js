import React from "react";

async function Demo() {
  var url = await fetch(
    "https://api.unsplash.com/photos/random?count=1&orientation=landscape&query=mountains,beach",
    {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Client-ID --HOlpWmqUEUDSOYVaUX6X7hotGnZPjRM-X637aX3ok",
      },
    }
  );
  // if (url) url = JSON.stringify(url);

  console.log(url);
  return (
    <>
      <h1>LOLA</h1>
    </>
  );
}

export default Demo;
