import React from 'react'

export const DisplayBoard = ({getProgramList}) => {
    
    return(        
        <div className="btn">
            <button type="button" onClick={(e) => getProgramList()} className="btn btn-warning">Show Programs</button>
        </div>
    )
}