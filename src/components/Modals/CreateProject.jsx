"use client"
import styles from "./styles.module.css"
import { useEffect, useState } from "react"
import datab from "@/database/db"
import store from "@/storage/storage"



const CreateProjectModal = () => {

    // Project Index
    const [projectIndex, setProjectIndex] = useState()


    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }




    const [umlModal, setUmlModal] = useState(false);
    const toggleUmlModal = (index) => {
        setProjectIndex(index)
        setUmlModal(!umlModal)
    }


    const [codeLinkModal, setCodeLinkModal] = useState(false);
    const toggleCodeLink = (index) => {
        setProjectIndex(index)
        setCodeLinkModal(!codeLinkModal)
    }


    const [imgLinkModal, setImgLinkModal] = useState(false);
    const toggleImgLink = (index) => {
        setProjectIndex(index)
        setImgLinkModal(!imgLinkModal)
    }

    const [deployLinkModal, setDeployLinkModal] = useState(false);
    const toggleDeployLink = (index) => {
        setProjectIndex(index)
        setDeployLinkModal(!deployLinkModal)
    }

    // For Project Creation

    const [projectData, setProjectData] = useState({
        name: "",
        description: ""
    })
    const submit = async (e) => {
        e.preventDefault()
        try {
            const project = await datab.createDocument(projectData.name, projectData.description)
            if (project) {
                console.log("Project Created")

                //This will close the modal after the project is created
                setModal(!modal)
                fetchData()
            }
        } catch (error) {
            console.log(error)
        }
    }

 
    // For Adding UML 🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈
    const [file, setFile] = useState(null);

    // Function to handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async () => {
        // e.preventDefault();
        if(file){
            try {
                const upload = await store.create(file, projectIndex)
                if (upload) {
                    setFile(null);
                    setUmlModal(!umlModal)
                    console.log("UML Uploaded")
                    fetchData()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    // For Adding Github/Code Link
    const [codeLink, setCodeLink] = useState("")
    const submitLink = async (index) => {
        try {
            const linkUpload = await datab.storeCode(codeLink, index)
            if (linkUpload) {
                setCodeLink("")
                setCodeLinkModal(!codeLinkModal)
                fetchData()
            }
        } catch (error) {
            console.log(error)
        }
    }


    // For Adding Project Images or videos
    const [imgFile, setImgFile] = useState(null);

    // Function to handle file selection
    const handleImgFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setImgFile(selectedFile);
        }
    }

    const handleImgSubmit = async () => {
        if(imgFile){
            try {
                const imgUpload = await store.createImg(imgFile, projectIndex)
                if (imgUpload) {
                    setImgFile(null);
                    setImgLinkModal(!imgLinkModal)
                    console.log("Image Uploaded")
                    fetchData()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }


    // For Deploy Link
    const [deployLink, setDeployLink] = useState("")
    const submitDeployLink = async (index) => {
        try {
            const linkUpload = await datab.storeDeployLink(deployLink, index)
            if (linkUpload) {
                setDeployLink("")
                setDeployLinkModal(!deployLinkModal)
                fetchData()
            }
        } catch (error) {
            console.log(error)
        }
    }


   


       // For Showcasing Data

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
                       const result = await store.getFilePreview(fileId)
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
       }, [umlFileIds])


    return (
        <>

            <button onClick={toggleModal} className={styles.btnModal}>
                +Create
            </button>

            {/* Project Creation Modal */}
            {modal && (<div className={styles.modal}>
                <div className={styles.overlay} onClick={toggleModal}></div>
                <div className={styles.modalContent}>
                    <form onSubmit={submit}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Project Name"
                            value={projectData.name}
                            onChange={(e) => setProjectData((prev) => ({ ...prev, name: e.target.value }))}
                            required
                        />
                        <label htmlFor="name">Description</label>
                        <input
                            type="text"
                            id="description"
                            placeholder="Enter Project description"
                            value={projectData.description}
                            onChange={(e) => setProjectData((prev) => ({ ...prev, description: e.target.value }))}
                            required
                        />

                        <button type="submit">Submit</button>
                    </form>
                    <button className={styles.closeModal} onClick={toggleModal}>Close</button>
                </div>
            </div>)}



            {/* UML Modal */}

            {umlModal && (
                <div className={styles.modal}>
                    <div className={styles.overlay} onClick={toggleUmlModal}></div>
                    <div className={styles.modalContent}>
                        <form className={styles.form}>
                            <input
                                type="file"
                                name="file"
                                accept="image/*,.pdf"
                                onChange={handleFileChange} // Call the handleFileChange function on file selection
                            />
                            <button type="button" onClick={() => handleSubmit(projectIndex)}>Upload</button>
                            {/* <button type="delete" onClick={handleDelete}>Delete</button> */}
                        </form>
                        {/* <button onClick={showDoc}>List doc</button> */}
                    </div>
                </div>
            )}


            {/* Code Link Modal */}
            {codeLinkModal && (
                <div className={styles.modal}>
                    <div className={styles.overlay} onClick={toggleCodeLink}></div>
                    <div className={styles.modalContent}>
                        <form className={styles.form}>
                            <input
                                type="text"
                                id="codeLink"
                                placeholder="Enter Github/Code Link"
                                value={codeLink}
                                onChange={(e) => setCodeLink(e.target.value)}
                            />
                            <button type="button" onClick={() => submitLink(projectIndex)}>Submit</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Image Link Modal */}
            {imgLinkModal && (
                <div className={styles.modal}>
                    <div className={styles.overlay} onClick={toggleImgLink}></div>
                    <div className={styles.modalContent}>
                        <form className={styles.form}>
                            <input
                                type="file"
                                name="file"
                                accept="image/*,video/*"
                                onChange={handleImgFileChange} // Call the handleFileChange function on file selection
                            />
                            <button type="button" onClick={() => handleImgSubmit(projectIndex)}>Upload</button>
                        </form>
                    </div>
                </div>
            
            )}

            {/* Deployment Link Modal */}
            {deployLinkModal && (
                <div className={styles.modal}>
                    <div className={styles.overlay} onClick={toggleDeployLink}></div>
                    <div className={styles.modalContent}>
                        <form className={styles.form}>
                            <input
                                type="text"
                                id="deployLink"
                                placeholder="Enter Deployment Link"
                                value={deployLink}
                                onChange={(e) => setDeployLink(e.target.value)}
                            />
                            <button type="button" onClick={() => submitDeployLink(projectIndex)}>Deploy Links</button>
                        </form>
                    </div>
                </div>
            )}



            {/* Data Add  */}
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
                            <p>Code Link: {project.Github_Link}</p>
                            <button onClick={() => toggleUmlModal(index)}>Add Uml</button>
                            <button onClick={() => toggleCodeLink(index)}>Github/Code Link</button>
                            <button onClick={() => toggleImgLink(index)}>Images/Videos</button>
                            <button onClick={() => toggleDeployLink(index)}>Deployment Link</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading data...</p>
            )}

        </>
    )
}

export default CreateProjectModal