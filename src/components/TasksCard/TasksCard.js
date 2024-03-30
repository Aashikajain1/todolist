import React from 'react'
import dlt from './delete.png'
function TasksCard({ title, category, delFunction,index}) {
    return (
        
        <div className="container text-center border border-primary rounded-3 bg-info text-dark mt-4  d-flex" style={{height:35}} >
            <h2 style={{marginRight:150}}>{title}</h2>
            <span><h3>{category}</h3></span>
            <img src={dlt}  className='img-fluid bg-light p-1 text-dark bg-opacity-75 border rounded-circle mt-1' 
            style={{position:'fixed' ,right:500}}
            onClick={()=>{delFunction(index)}}/>
        </div>
    )
}

export default TasksCard