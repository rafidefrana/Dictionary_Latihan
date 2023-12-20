const url= "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById('search-btn');



btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
    // saat debugging json jangan dulu kasih ()
    // kalau sudah baru
    .then((response) => response.json())
    //debugging lagi langkah 2
    //* .then((data) => console.log(data))
    .then((data) => {
        console.log(data)
        result.innerHTML = `
         <div class="word">
          <h3>${inpWord}</h3>
          <button onclick="playAudio()">
            <i class="fa-solid fa-volume-high" "></i>
          </button>
        </div>
        <div class="details">
            <!-- // dapat dari cek di console browser console -->
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>/${data[0].phonetic}</p>
        </div>
        <p class="word-meaning">
          ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
          ${data[0].meanings[0].definitions[0].example || ''}
        </p>
        `;
      sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
    //   buat debugging apakah udah ketakep apa belom
    //   console.log(sound);
    })

    .catch(() => {
        console.error("Error fetching data:", error);
        result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`
    });
    // selalu awali dengan debuging
    // langkah 1
    // kalo udah lanjut eksekusi selanjutnya
    // console.log(inpWord);
    
});

function playAudio(){
    sound.addEventListener("click", () => {
      sound.play();
    });
}




