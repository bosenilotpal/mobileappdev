export const emptyFilters = () => ({
  cuisine: "",
  minRating: "",
  maxPrice: "",
  delivery: "",
});

export const filterRestaurants = (restaurants, filters) => {
  return restaurants.filter((restaurant) => {
    if (filters.cuisine && restaurant.cuisine !== filters.cuisine) return false;
    if (filters.minRating && Number(restaurant.rating) < Number(filters.minRating)) return false;
    if (filters.maxPrice && Number(restaurant.price) > Number(filters.maxPrice)) return false;
    if (filters.delivery && restaurant.delivery !== filters.delivery) return false;
    return true;
  });
};

export const pickRandomRestaurant = (restaurants, excludedKeys = []) => {
  const pool = restaurants.filter((restaurant) => !excludedKeys.includes(restaurant.key));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
};

export const getRemainingVetoers = (selectedPeople, vetoedByPersonKeys) => {
  return selectedPeople.filter((person) => !vetoedByPersonKeys.includes(person.key));
};

export const allHaveVetoed = (selectedPeople, vetoedByPersonKeys) => {
  return selectedPeople.length > 0 && selectedPeople.every((person) => vetoedByPersonKeys.includes(person.key));
};

export const formatPersonName = (person) => `${person.firstname} ${person.lastname}`;
