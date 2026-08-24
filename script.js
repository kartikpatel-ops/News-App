const API_KEY =
    "pub_dce5061fec154cc6be035850b227a5b0";

const API_URL =
    "https://newsdata.io/api/1/latest";


async function getNews() {

    try {

        const url =
            `${API_URL}?apikey=${API_KEY}` +
            `&q=US%20tariffs` +
            `&prioritydomain=top`;

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        displayNews(data.results);

    }
    catch (error) {

        console.log("Error:", error);

    }
}


function displayNews(articles) {

    const container =
        document.getElementById("newsContainer");

    container.innerHTML = "";

    articles.forEach(article => {

        const card =
            document.createElement("div");

        card.className = "news-card";

        card.innerHTML = `

            <img
                src="${article.image_url || 'https://via.placeholder.com/400'}"
                alt="News Image"
            >

            <div class="news-content">

                <h2>
                    ${article.title}
                </h2>

                <p>
                    ${article.description || "No description available."}
                </p>

                <a
                    href="${article.link}"
                    target="_blank"
                >
                    Read More
                </a>

            </div>

        `;

        container.appendChild(card);

    });
}


getNews();
document
    .getElementById("searchButton")
    .addEventListener("click", function () {

        const query =
            document.getElementById("searchInput").value;

        if (query.trim() !== "") {

            searchNews(query);

        }

    });


async function searchNews(query) {

    try {

        const url =
            `${API_URL}?apikey=${API_KEY}` +
            `&q=${encodeURIComponent(query)}` +
            `&prioritydomain=top`;

        const response =
            await fetch(url);

        const data =
            await response.json();

        displayNews(data.results);

    }
    catch (error) {

        console.log(error);

    }

}