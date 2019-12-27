export const setmarket=(location)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
       
        firestore.collection('setMarket').add({
            ...location,
            
        }).then(()=>{
            dispatch({type:'SETMARKET',location});
        }).catch((err)=>{
            dispatch({type:'SETMARKET_ERROR',err});
        })
       
    }
};
