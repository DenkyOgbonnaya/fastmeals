const filterHof = (searchedMeal) =>
meal => !searchedMeal || meal.name.toLowerCase().includes(searchedMeal.toLowerCase()) 

export default filterHof;