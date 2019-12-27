const initState = {
    authError: null
  }
  
  const editProfileReducer = (state = initState, action) => {
    switch(action.type){
      case 'Edited_SUCCESS':
          console.log('Successfully edited ')
          return{
            ...state,
            authError:null
          }
      case 'ERROR':
         console.log('Not edited')
         return{
           ...state,
           authError:action.err.message
         }
         
      default:
        return state
    }
  };
  
  export default editProfileReducer;