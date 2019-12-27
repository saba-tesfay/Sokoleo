export const sellerupload=(uploads)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        const sellerId=getState().firebase.auth.uid;   
        console.log("reduxpart",uploads)
        firestore.collection('sellerUpload').add({
            ...uploads,
            authId:sellerId,
            createdAt:new Date()
        }).then(()=>{
            dispatch({type:'SELLERUPLOAD',uploads});
        }).catch((err)=>{
            dispatch({type:'SELLERUPLOAD_ERROR',err});
        })
       
    }
};

