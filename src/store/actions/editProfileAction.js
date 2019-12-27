export const editProfile=(newUser)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase()
        const firestore=getFirestore()
        const user=getState().firebase.auth; 
        var user1=firebase.auth().currentUser
        console.log(user.uid)
        if(newUser.password.length>=6)
        {
            user1.updatePassword(newUser.password).then(()=>{
            console.log('the new password',newUser.password)
            
        }).catch((err)=>{
            dispatch({type:'ERROR',err})
        }) } 
        firestore.collection('users').doc(user.uid).update({
            name:newUser.name,
            PhoneNum:newUser.PhoneNum,
            AlternateNum:newUser.AlternateNum
            
            
            }).then(()=>{
                dispatch({type:'Edited_SUCCESS'})
                     
    }).catch((err)=>{
        dispatch({type:'ERROR',err})
    })
    
           
      }
}