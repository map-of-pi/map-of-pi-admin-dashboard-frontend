import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import { usersReducer } from "./slices/users";
import sellers from "./slices/sellers";
import reviews from "./slices/reviews";
import bannedCountries from "./slices/banned-countries";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: auth,
      users: usersReducer,
      sellers: sellers,
      reviews: reviews,
      bannedCountries: bannedCountries,
    },
  });
}
const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
