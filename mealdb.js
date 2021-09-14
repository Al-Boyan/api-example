const searchBtn = document.getElementById("button-addon2");
const searchFeild2 = document.getElementById("search-feild");

searchFeild2.addEventListener("keypress", function (event) {
    // event.preventDefault();
    if (event.key == "Enter") {
        searchBtn.click();
    }
});



const searchFood = () => {
    const searchFeild = document.getElementById('search-feild');
    const searchText = searchFeild.value;
    searchFeild.value = '';
    if (searchText == '') {
        alert('please write somethings to display');
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => console.log(error));
    }
}

const displaySearchResult = meals => {
    const searchReasult = document.getElementById('search-result');
    searchReasult.textContent = ``;
    if (meals == undefined) {
        const NoResultDiv = document.createElement('div');
        NoResultDiv.innerHTML = `
        <h2 class="fs-1 fw-bold text-danger text-center">No recipies are found </h2>`;
        searchReasult.appendChild(NoResultDiv);
    }
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadMealDetails(${meal.idMeal})" class="card">
                <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
                </div>
            </div>
        
        `;

        searchReasult.appendChild(div);
    })
}

const loadMealDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    console.log(meal);
    document.getElementById('meal-details').textContent = '';
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="card" >
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
              <a href="${meal.strYoutube}" class="btn btn-primary">Go Youtube</a>
            </div>
          </div>
    `;
    mealDetails.appendChild(div);
}