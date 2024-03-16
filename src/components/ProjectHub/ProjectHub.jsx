"use client"
import { useEffect, useState } from "react"
import datab from "@/database/db"
import styles from "./styles.module.css"
import config from "@/conf/config"

import Link from "next/link"

const ProjectHubs = () => {





    const [data, setData] = useState([])
    const [images, setImages] = useState([])
    const [comment, setComment] = useState("");

    const [selectedProject, setSelectedProject] = useState(null);

    const fetchData = async () => {
        try {
            const { listAllData, images } = await datab.listAllDocument();
            console.log(listAllData, images);
            setData(listAllData);
            setImages(images);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };

    // const imagevalue = 'https://cloud.appwrite.io/v1/storage/buckets/6530a7718922fc6db2bd/files/htpADC03ob/view?project=64e343b9a0abb92ce533&mode=admin'

    useEffect(() => {
        fetchData(); // Initial data fetch
 
    }, []);

    const openProjectModal = (project) => {
        setSelectedProject(project);
    };

    const closeProjectModal = () => {
        setSelectedProject(null);
    };

    const submitComment = () => {
        // Add logic to submit comment
        console.log("Submitted comment:", comment);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    return (
        <>
            <div className={styles.main}>
                {data.map((item) => (
                    <div key={item.$id} className={styles.card}>
                        <div className={styles.cardContent}>
                            <div className={styles.proImg}>
                                <img src={`https://cloud.appwrite.io/v1/storage/buckets/${config.appwriteBucketId}/files/${item.UML_file_ID}/view?project=${config.appwriteProjectID}&mode=any`} alt="Image" className={styles.proImage} />
                            </div>
                            <div className={styles.proDetails}>
                                <div className={styles.proName}>{item.name}</div>
                                <div className={styles.proDesc}>{item.description}</div>
                            </div>
                            <button onClick={() => openProjectModal(item)}>View Project</button>
                        </div>
                    </div>
                ))
                }


            </div>
            {selectedProject && (
                <div className={styles.modal}>
                        <span className={styles.closeButton} onClick={closeProjectModal}>X</span>
                    <div className={styles.modalContent}>
                        <h2>{selectedProject.name}</h2>
                        <p>{selectedProject.description}</p>
                        <img src={`https://cloud.appwrite.io/v1/storage/buckets/${config.appwriteBucketId}/files/${selectedProject.UML_file_ID}/view?project=${config.appwriteProjectID}&mode=any`} alt="Project" className={styles.modalImage} />
                        {/* Additional project details can be displayed here */}
                    </div>
                    <div className={styles.comment}>
                        <input type="text" placeholder="Add your comment..." value={comment} onChange={handleCommentChange}></input>
                        <button onClick={submitComment}>Submit</button>
                    </div>
                </div>
            )}
        </>
    )
}
export default ProjectHubs