import React from 'react'


export const ProgramList = ({files}) => {

    console.log('files length:::', files.length)
    if (files.length === 0) return null

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h3>Program List</h3>
                <ol>{files}</ol>
                </div>
            </div>
        </div>
    )
}