"use client"
import styles from "./styles.module.css"
import { useEffect, useState } from "react"
import datab from "@/database/db"
import store from "@/storage/storage"

const MyProject = () => {

    const [showModal, setShowModal] = useState(false);
    const [projectIndex, setProjectIndex] = useState(null);

    const EditingModal = (index) => {
        setShowModal(!showModal);
        setProjectIndex(index);
    }

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


        // const [testImgFile, setTestImgFile] = useState(null);
        // const handletestImgFileChange = (event) => {
        //     setTestImgFile(event.target.files[0]);
        // };
        // const handleTestImgSubmit = async () => {
        //     const result = await store.uploadImgFile(testImgFile);
        //     if(result){
        //         console.log(result)
        //     }
        // }
        

    return(
        <>
            {/* <form>
                            <input  
                                type="file"
                                name="file"
                                accept="image/*,video/*"
                                onChange={handletestImgFileChange} // Call the handleFileChange function on file selection
                            />
                            <button type="button" onClick={handleTestImgSubmit}>Upload</button>
                </form> */}




            {showModal && (
                <div className={styles.modal}>
                <div className={styles.overlay} onClick={EditingModal}></div>
                    <div className={styles.modalContent}>
                        <button onClick={EditingModal} className={styles.modalCloseBtn}>Close</button>
                        <h2>Editing Project</h2>
                        <p>Name: {useData[projectIndex].name}</p>
                        <p>Description: {useData[projectIndex].description}</p>
                        <img src={imgSrc[projectIndex].href} alt="Image" className={styles.modalImage}/>
                        <p>Document Id: {useData[projectIndex].$id}</p>
                        <p>Uml: {useData[projectIndex].UML_file_ID}</p>

                        
                    </div>
                </div>
            )}



            <h1 className={styles.myPr}>My project </h1>
            {Array.isArray(useData) && useData.length > 0 ? (
                useData.map((project, index) => (
                        <div key={index}>
                        <div className={styles.content}>
                            <h2>Name: {project.name}</h2>
                            <p>Description: {project.description}</p>
                       
                            
                            {imgSrc[index] ? (
                            <img src={imgSrc[index].href} alt={`Image ${index}`} className={styles.image} />
                        ) : (
                            <p>No Image Available</p>
                        )}
                        
                            <div className={styles.allBtn}>

                            <button className={styles.ed} onClick={() => EditingModal(index)}>Edit</button>
                            <button className={styles.de} onClick={() => DeleteDoc(project.$id)} >Delete</button>
                            </div>
                           
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