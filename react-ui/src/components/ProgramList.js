import React from 'react'
import Button from '@material-ui/core/Button';


export const ProgramList = ({files, sendProgram}) => {

    console.log('files length:::', files.length)
    if (files.length === 0) return null

    const ProgramRow = (file,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{index + 1}</td>
                  <td>{file}</td>
                  <td><Button variant="contained" type="button" onClick={(e) => sendProgram({file})}>Send</Button></td>
              </tr>
          )
    }

    const programTable = files.map((file,index) => ProgramRow(file,index))

    return(
        <div className="container">
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Index</th>
                    <th>File Name</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {programTable}
                </tbody>
            </table>
        </div>
    )

    // return(
    //     <div className="container">
    //         <div className="row">
    //             <div className="col-md-7 mrgnbtm">
    //             <h3>Program List</h3>
    //             <ol>{files}</ol>
    //             </div>
    //         </div>
    //     </div>
    // )
}