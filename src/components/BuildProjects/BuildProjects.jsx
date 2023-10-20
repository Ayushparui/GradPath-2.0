"use client"
import datab from "@/database/db"
import { useState } from "react"

const BuildProjects = () => {

    const [projectData, setProjectData] = useState({
        name: "",
        description: ""
    })

    const submit = async (e) => {
        e.preventDefault()

        try {
            const project = await datab.createDocument(projectData.name, projectData.description)
            if(project){
                console.log("Project Created")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <form onSubmit={submit}>
            <label htmlFor="name">Name</label>
            <input 
                type="text"
                id="name"
                placeholder="Enter Project Name"
                value={projectData.name}
                onChange={(e) => setProjectData((prev) => ({...prev, name: e.target.value}))}
                required
            />
            <label htmlFor="name">Description</label>
            <input 
                type="text"
                id="description"
                placeholder="Enter Project description"
                value={projectData.description}
                onChange={(e) => setProjectData((prev) => ({...prev, description: e.target.value}))}
                required
            />
            
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default BuildProjects
// "use client"
// import React, { useState } from 'react';

// const CircleFillExample = () => {
//   const [clickCount, setClickCount] = useState(0);

//   const handleButtonClick = () => {
//     setClickCount(clickCount + 1);
//   };

//   const handleDeleteClick = () => {
//     setClickCount(Math.max(clickCount - 0.1 * clickCount, 0));
//   };

//   const maxClicks = 10;
//   const progressPercentage = (clickCount / maxClicks) * 100;
//   const circleRadius = 50;

//   const circleStyle = {
//     width: `${circleRadius * 2}px`,
//     height: `${circleRadius * 2}px`,
//     borderRadius: '50%',
//     backgroundColor: 'blue',
//     clipPath: `polygon(0 0, ${progressPercentage}% 0, ${progressPercentage}% 100%, 0 100%)`,
//   };

//   return (
//     <div>
//       <button onClick={handleButtonClick}>Click me</button>
//       <button onClick={handleDeleteClick}>Delete</button>
//       <div style={{ position: 'relative', width: `${circleRadius * 2}px`, height: `${circleRadius * 2}px` }}>
//         <div style={circleStyle}></div>
//       </div>
//     </div>
//   );
// };

// export default CircleFillExample;


