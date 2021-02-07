const searchButton = document.querySelector("#search-button").addEventListener("click", () => {
    const foodName = document.querySelector("#search").value;
    if (foodName === "") {
        return null;
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s= ${foodName}`)
            .then((res) => res.json())
            .then((data) => displayFood(data));

        const displayFood = (foods) => {
            if (foods.meals === null) {
                alert("The recipie is not found");
            } else {
                foods.meals.forEach((food) => {
                    const foodsContainer = document.querySelector("#foods-container");

                    const foodContainer = document.createElement("div");
                    foodContainer.className = "food";
                    foodsContainer.appendChild(foodContainer);

                    const foodCover = `
                <div onclick="detailedInfo('${food.idMeal}')">
                    <img src="${food.strMealThumb}">
                    <h3> ${food.strMeal} </h3>
                </div>
            `;
                    foodContainer.innerHTML = foodCover;
                });

                document.querySelector("#search").value = "";
            }
        };
    }
});

const detailedInfo = (foodId) => {
    const fullDetails = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    fetch(fullDetails)
        .then((res) => res.json())
        .then((data) => details(data.meals[0]));
};

const details = (foodInfo) => {
    const info = `
        <div id="info-container">
            <img src="${foodInfo.strMealThumb}">
            <div id="dish-info">
            <h2>${foodInfo.strMeal}</h2>
                <div id="ingredient">
                    <div>
                        <ul>
                            <li>${foodInfo.strMeasure1} ${foodInfo.strIngredient1} </li>
                            <li>${foodInfo.strMeasure2} ${foodInfo.strIngredient2} </li>
                            <li>${foodInfo.strMeasure3} ${foodInfo.strIngredient3} </li>
                            <li>${foodInfo.strMeasure4} ${foodInfo.strIngredient4} </li>
                            <li>${foodInfo.strMeasure5} ${foodInfo.strIngredient5} </li>
                            <li>${foodInfo.strMeasure6} ${foodInfo.strIngredient6} </li>
                            <li>${foodInfo.strMeasure7} ${foodInfo.strIngredient7} </li>
                            <li>${foodInfo.strMeasure8} ${foodInfo.strIngredient8} </li>
                            <li>${foodInfo.strMeasure9} ${foodInfo.strIngredient9} </li>
                            <li>${foodInfo.strMeasure10} ${foodInfo.strIngredient10} </li>
                        </ul>
                    </div>
            </div>
        </div>
    `;
    const detailsSection = document.getElementById("details-section");
    detailsSection.innerHTML = info;
};

document.querySelector("#search").value = "";