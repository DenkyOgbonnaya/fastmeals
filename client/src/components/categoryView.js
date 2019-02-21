import useGetMeals from './utils/card';

const CategoryView = () => {
   const api = `api/${window.location.pathname}/category`
    const meals = useGetMeals(api);

    return meals
}
export default CategoryView;