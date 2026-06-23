let params = new URLSearchParams();

let dictionary = {};

fetch("./res/words.json")
    .then(response => response.json())
    .then(data => {
        dictionary = data.words;
    });


function search() {
    const query = document.getElementById("search").value.trim().toLowerCase();

    const results = [];

    for (const [word, data] of Object.entries(dictionary)) {

        // Match Eleued word
        if (word.toLowerCase().includes(query)) {
            results.push({ word, data });
            continue;
        }

        // Match English meanings
        if (
            data.meanings.some(
                meaning => meaning.toLowerCase().includes(query)
            )
        ) {
            results.push({ word, data });
            continue;
        }  
    }
    
    displayResults(results)
}

function displayResults(results) {
    const resultDiv = document.getElementById("result");

    if (results.length === 0) {
        resultDiv.innerHTML = "<p>No matches found.</p>";
        return;
    }

    resultDiv.innerHTML = results.map(({ word, data }) => `
        <div class="entry">
            <h2>${word}</h2>
            <p>Meaning: ${data.meanings.join(", ")}</p>
            <p>Related words: ${data.related.join(", ")}</p>
        </div>
    `).join("");
}