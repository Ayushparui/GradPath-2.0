"use client"
import { useEffect, useState } from "react"
import datab from "@/database/db"
import styles from "./styles.module.css"
import config from "@/conf/config"

const ProjectHubs = () => {




    const [data, setData] = useState([])
    const [images, setImages] = useState([])
    
        const fetchData = async () => {
            try {
                const {listAllData, images} = await datab.listAllDocument();
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
    
        return (
            <>
                 <div className={styles.main}>
                {data.map((item) => (
                    <div key={item.$id} className={styles.card}>
                        <div className={styles.cardContent}>
                            <div className={styles.proImg}>
                                <img src={`https://cloud.appwrite.io/v1/storage/buckets/${config.appwriteBucketId}/files/${item.UML_file_ID}/view?project=${config.appwriteProjectID}&mode=admin`} alt="Image" className={styles.proImage}/>
                            </div>
                            <div className={styles.proName}>{item.name}</div>
                            <div className={styles.proDesc}>{item.description}</div>
                        </div>
                    </div>
                ))
                }
               
              
            </div>
            </>
        )
    }
    export default ProjectHubs