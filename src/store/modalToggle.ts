import { createSlice } from "@reduxjs/toolkit"


interface ModalStateType {
    modalPost: boolean,
    createModalPost: boolean,
    disableScroll: boolean
}

const initialState: ModalStateType = {
    modalPost: false,
    createModalPost: false,
    disableScroll: true
}

const togglePostModal = createSlice({
    name: "togglePostModal",
    initialState,
    reducers: {
        isModalPostOpen: (state) => {
            state.modalPost = !state.modalPost
            state.disableScroll = !state.disableScroll
        },

        isModalCreatePostOpen: (state) => {
            state.createModalPost = !state.createModalPost
            state.disableScroll = !state.disableScroll
        }
    }
})

export const {isModalPostOpen, isModalCreatePostOpen} = togglePostModal.actions;
export default togglePostModal.reducer;