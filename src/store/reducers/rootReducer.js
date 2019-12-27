import productReducer from './ProductReducer';
import authReducer from './authReducer';
import {firebaseReducer} from 'react-redux-firebase';
import {combineReducers} from 'redux'; 
import {firestoreReducer} from 'redux-firestore';
import commentReducer from './commentReducer';
import chatReducer from './chatReducer';
import "firebase/storage";  
const rootReducer=combineReducers({
    comment:commentReducer,
    chat:chatReducer,
     auth:authReducer,
    products:productReducer,
    firestore:firestoreReducer,
    firebase:firebaseReducer
  
});
export default rootReducer;
