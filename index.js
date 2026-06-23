let params = new URLSearchParams();

let dictionary = {};

fetch("./res/words.json")
    .then(response => response.json())
    .then(data => {
        dictionary = data.words;
    });


function search() {
    const query = document.getElementById("search").value.trim().toLowerCase();

    const word = dictionary[query];

    const resultDiv = document.getElementById("result");

    if (!word) {
        resultDiv.innerHTML = "<p>Word not found.</p>";
        return;
    }

    resultDiv.innerHTML = `
        <h2>${query}</h2>
        <p><strong>Meaning:</strong> ${word.meaning}</p>
        <p><strong>Related:</strong> ${word.related.join(", ")}</p>
    `;
}