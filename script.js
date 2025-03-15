document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const originCity = document.getElementById("originCity").value;
    const destinationCity = document.getElementById("destinationCity").value;

    const apiUrl = `http://localhost:8080/api/v1/packages/search1/${destinationCity}?originCity=${originCity}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => displayResults(data))
      .catch((error) => console.error("Error fetching data:", error));
  });

function displayResults(data) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (data && data.offers && data.offers.offersPackage !== null) {
    const offersPackage = data.offers.offersPackage;
    const card = document.createElement("div");
    card.className = "col-md-6";
    card.innerHTML = `
      <div class="card">
        <img src="${
          offersPackage.imageUrl || "default-image.jpg"
        }" class="card-img-top" alt="Package Image">
        <div class="card-body">
          <h5 class="card-title">${offersPackage.hotelName}</h5>
          <p class="card-text">${offersPackage.description}</p>
          <p class="card-text"><strong>Price:</strong> $${
            offersPackage.price
          }</p>
          <a href="${
            offersPackage.url
          }" target="_blank" class="btn btn-primary">View Deal</a>
        </div>
      </div>
    `;
    resultsDiv.appendChild(card);
  } else {
    resultsDiv.innerHTML =
      "<p class='text-danger'>No package offers found.</p>";
  }
}
