const searchFood = async () => {
    const searchFeild = document.getElementById('search-feild');
    const searchText = searchFeild.value;
    searchFeild.value = '';
    if (searchText == '') {
        alert('please write somethings to display');
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.meals)
    }
}

const displaySearchResult = meals => {
    const searchReasult = document.getElementById('search-result');
    searchReasult.textContent = ``;
    if (meals.length == 0) {
        const NoResultDiv = document.createElement('div');
        NoResultDiv.innerHTML = `
        <h2 class="fs-1 fw-bold my-5 text-center text-danger">No recipies are found </h2>`;
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

const loadMealDetails = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);

}

const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="card" >
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
              <a href="${meal.strYoutube}" class="btn btn-danger">Go Youtube</a>
            </div>
          </div>
    `;
    mealDetails.appendChild(div);
}