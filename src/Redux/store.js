import { configureStore } from "@reduxjs/toolkit";
import {recipesReducer} from './reducer'

let store = configureStore({reducer : {
    recipesPage : recipesReducer
  }
});
export default store;