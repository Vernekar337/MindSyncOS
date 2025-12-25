import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import passReducer from "./passSlice"
import connectionReducer from "./connectionSlice"

const appStore = configureStore({
  reducer:{
    user: userReducer,
    feed: feedReducer,
    pass: passReducer,
    connections : connectionReducer
  }
})

export default appStore