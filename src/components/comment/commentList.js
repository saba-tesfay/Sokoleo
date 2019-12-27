import React from 'react';
import Comment from "./Comment";
 const commentList=({comments,imageId,total})=>{ 
  
    return (
        <div className="commentList">
          { comments && comments.map((comment)=>(
              <Comment comment={comment} key={comment.id} imageId={imageId} total={total}/>
            ))}    
        </div>
      );
}
export default commentList;
