"use client"
import styles from "./styles.module.css"
import { useEffect, useState } from "react"
import datab from "@/database/db"
import store from "@/storage/storage"

const MyProject = () => {

    const [useData, setData] = useState();
    const [imgSrc, setImgSrc] = useState({});

    const fetchData = async () => {
        const data = await datab.listDocument();
        setData(data);
    };

    useEffect(() => {
        fetchData(); // Initial data fetch
    }, []);


    const DeleteDoc = async (documentId) => {
        const del = await datab.deleteDocument(documentId)
        if(del){
            console.log("Doc delted from Frontend")
            fetchData()
            
        }else{
            console.log("error")
        }

    }

    const PreviewImg = async (UML_file_ID, index) => {
        try {
            const prev = await store.filePreview(UML_file_ID);
            setImgSrc({ ...imgSrc, [index]: prev });
            console.log("Successfully previewed");
        } catch (error) {
            console.error("Error while previewing:", error);
        }
    };
    
   

    return(
        <>
            <h1>My project </h1>
            
            {Array.isArray(useData) && useData.length > 0 ? (
                useData.map((project, index) => (
                        <div key={index}>
                        <div className={styles.content}>
                            <h2>Name: {project.name}</h2>
                            <p>Description: {project.description}</p>
                            <p>Document Id: {project.$id}</p>
                            <img
                                src={imgSrc[index]}
                                alt="image"
                                onLoad={() => PreviewImg(project.UML_file_ID, index)}
                            />
                            <button>Edit</button>
                            <button onClick={() => DeleteDoc(project.$id)} >Delete</button>
                            
                        </div>
                    </div>
                    ))
                ) : (
                    <p>Loading data...</p>
                )}           
        </>
    )
}

export default MyProject