import { configureStore } from '@reduxjs/toolkit'
import factsSlicer from './features/factsSlice'
import communitiesSlice from './features/communitiesSlice'
import userSlice from './features/userSlice'
import myCommunitiesSlice from './features/myCommunitiesSlice'
import postSlice from './features/postSlice'

export default configureStore({
  reducer: {
    facts : factsSlicer,
    community : communitiesSlice,
    user : userSlice,
    myCommunity : myCommunitiesSlice,
    post : postSlice
  }
})