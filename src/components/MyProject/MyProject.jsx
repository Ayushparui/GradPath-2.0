"use client"
import styles from "./styles.module.css"
import { useEffect, useState } from "react"
import datab from "@/database/db"
import store from "@/storage/storage"

const MyProject = () => {

    const [useData, setData] = useState([]);
    const [imgSrc, setImgSrc] = useState([]);
    const [umlFileIds, setUmlFileIds] = useState([]);

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


    useEffect(() => {
        const umlFileIds = useData.map((element) => element.UML_file_ID);
        setUmlFileIds(umlFileIds);
    }, [useData]);
   
   

        const getFilePreviews = async () => {
            if (umlFileIds.length === 0) {
                return;
            }
        
            try {
                const previews = await Promise.all(
                    umlFileIds.map(async (fileId) => {
                        const result =  await store.getFilePreview(fileId)
                        return result;
                    })
                );
        
                setImgSrc(previews);
            } catch (error) {
                console.error("Error fetching file previews:", error);
            }
        };
    
        useEffect(() => {
            getFilePreviews()
        },[umlFileIds])

        console.log(imgSrc)

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
                            <p>Uml: {project.UML_file_ID}</p>
                            
                            {imgSrc[index] ? (
                            <img src={imgSrc[index].href} alt={`Image ${index}`} />
                        ) : (
                            <p>No Image Available</p>
                        )}
                        
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