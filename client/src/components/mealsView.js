import useGetMeals from './utils/card';
    
const Meals = () => {
    const api = 'api/meals'
    const meals = useGetMeals(api)

    return meals
}
export default Meals;