"use client"
import { useState } from "react";
import styles from "./styles.module.css"
import store from "@/storage/storage";
import datab from "@/database/db";

const UMLuploader = () => {
    const [file, setFile] = useState(null);

    // Function to handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            if (file) {
                console.log(file);
                setFile(null);
            }
            const upload = await store.create(file)
            if(upload){
                setFile(null);

            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleDelete = (event) => {
        event.preventDefault();
        if (file) {
            

            const inputElement = document.querySelector('input[type="file"]');
            if (inputElement) {
                inputElement.value = "";
            }
            setFile(null);
        }
    }

    const showDoc = async () => {
        const show = await datab.listDocument();
        console.log(show)
    }

    return (
        <>
            <h1>UML uploader</h1>
            <main>
                <form className={styles.form}>
                    <input
                        type="file"
                        name="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange} // Call the handleFileChange function on file selection
                    />
                    <button type="submit" onClick={handleSubmit}>Upload</button>
                    <button type="delete" onClick={handleDelete}>Delete</button>
                </form>
                <button type="show" onClick={showDoc}>List doc</button>
            </main>
        </>
    );
}

export default UMLuploader;
