import {createSlice,PayloadAction} from '@reduxjs/toolkit'


//Define el tipo de datos que va a tener el estado del usuario:
interface UserState{
    user: any | null;
    isEmailVerified:boolean;
    isLoginDialogOpen: boolean;
    isLoggedIn: boolean;
}


//Es el estado inicial del usuario cuando la app arranca:
const initialState: UserState={
    user: null,
    isEmailVerified:false,
    isLoginDialogOpen:false,
    isLoggedIn:false,

}


const UserSlice = createSlice({
    name:'user',
    initialState,
    //Cada “reducer” es una acción que modifica el estado global del usuario.
    reducers:{
        setUser:(state,action:PayloadAction<any>) =>{
            state.user = action.payload;
        },
        setEmailVerified:(state,action:PayloadAction<any>) =>{
            state.isEmailVerified= action.payload;
        },
        logout:(state) =>{
            state.user = null;
            state.isLoggedIn = false;
            state.isEmailVerified = false;
        },
        toggleLoginDialog:(state) => {
            state.isLoginDialogOpen = !state.isLoginDialogOpen;
        },
        authStatus:(state) =>{
            state.isLoggedIn=true;
        }
    }
});


//Estas acciones son las que despachás (dispatch) desde tus componentes para cambiar el estado.
export const {setUser,setEmailVerified,logout,toggleLoginDialog,authStatus} = UserSlice.actions;

//Esto se usa en tu store.ts principal para combinar todos los slices de tu app:
export default UserSlice.reducer;