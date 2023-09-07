const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("input-word").
    value;
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
      <div class="word">
        <h3>${inpWord}</h3>
        <button onclick="playSound()">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>
      <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>/${data[0].phonetic}/</p>
      </div>
      <div class="contain">
      <p class="word-meaning">
       ${data[0].meanings[0].definitions.map(data => `<P class="word-meaning">${data.definition}</p>`)}
      </p>
      <p class="word-example">
       ${data[0].meanings[0].definitions[0].example || ""};
      </p>
      </div>`;
      sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error"> Word not found </h3>`
    })
});
function playSound() {
  sound.play();
}