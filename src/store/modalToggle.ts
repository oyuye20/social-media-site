import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface ModalStateType {
    modalPost: boolean,
    createModalPost: boolean,
    disableScroll: boolean
    postID?: number;
}

const initialState: ModalStateType = {
    modalPost: false,
    createModalPost: false,
    disableScroll: true,
}

const togglePostModal = createSlice({
    name: "togglePostModal",
    initialState,
    reducers: {
        isModalPostOpen: (state, action) => {
            state.modalPost = !state.modalPost
            state.disableScroll = !state.disableScroll
            state.postID = action.payload
        },

        isModalCreatePostOpen: (state) => {
            state.createModalPost = !state.createModalPost
            state.disableScroll = !state.disableScroll
        }
    }
})

export const {isModalPostOpen, isModalCreatePostOpen} = togglePostModal.actions;
export default togglePostModal.reducer;