import produce from 'immer'
import creatReducer from './ReducerUtil'

const initialState={
    user:{
        _id:"",
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        books:[]
    }
}

const user={
    saveUser(state,action){
        state.user=action.payload
    }
}

export default produce((state,action)=>creatReducer(state,action,user),initialState);