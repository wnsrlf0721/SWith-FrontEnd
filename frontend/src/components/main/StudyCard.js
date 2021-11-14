import React from "react";
import './StudyCard.css'

function StudyCard({title,imgUrl,body}) {
    return(
        <>
            <button className="card-container">
                <div className="image-container">
                    <img src ={imgUrl} alt='기본스터디이미지'/>

                </div>
                <div className="card-content">
                    <div className="card-title">
                        <h3>{title}</h3>
                    </div>
                    <div className="card-body">
                        <p>{body}</p>
                    </div>

                </div>

            </button>
        
        
        </>
    );
}
export default StudyCard;