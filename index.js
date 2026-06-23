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
    const declineDiv = document.getElementById("decline");

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

    const { word, data } = results[0];

    // Declension & Conjugation
    switch(data.type) {
        case "noun-frn": // Noun front with no vowel
            declineDiv.innerHTML = results.map(({word, data}) => `
                <h2>Declension</h2>
                <table>
                    <tr>
                        <th>Case</th>
                        <th>Singular</th>
                        <th>Plural</th>
                    </tr>
                    <tr>
                        <td>Nominative</td>
                        <td>${word}</td>
                        <td>${word + "en"}</td>
                    </tr>
                    <tr>
                        <td>Accusative</td>
                        <td>${accusative(word)}</td>
                        <td>${accusative(word) + "en"}</td>
                    </tr>
                    <tr>
                        <td>Genitive</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Dative</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Allative</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Ablative</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            `).join("");
            break;
        case "noun-frv":
            break;
        default: 
            break;
    }
}

function accusative(word) {
    const vowels = "aeiouyöüë";

    if (word.endsWith("dh") || word.endsWith("th")) {
        return word + "h";
    }

    const lastLetter = word[word.length - 1];

    if (vowels.includes(lastLetter)) {
        return word + "h";
    }

    return word;
}