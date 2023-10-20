import { Client, Databases, Account, ID } from "appwrite";
import config from "../conf/config";
import authServices from "@/authentication/auth";

const client = new Client();

const databases = new Databases(client);

const account = new Account(client);

client
    .setEndpoint(config.appwriteURL) // Your API Endpoint
    .setProject(config.appwriteProjectID) // Your project ID
;

export class database{
    async createDocument(name, description){
        try {
            const userId = (await account.get()).$id
            const create = await databases.createDocument(config.appwriteDatabaseID, config.appwriteCollectionID, ID.unique(), {name, description, userId})
            console.log("Name and Description Created")
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async listDocument(){
        try{
            const listDoc = await databases.listDocuments(config.appwriteDatabaseID, config.appwriteCollectionID)
            const userId = (await account.get()).$id
            const userDocuments = listDoc.documents.filter(document => document.userId === userId);
            console.log(listDoc.documents.filter(document => document.userId == userId));
            return userDocuments;
        }catch(error){
            console.log(error)
        }
    }

    async deleteDocument(documentId){
        try {
            const deleteDoc = await databases.deleteDocument(config.appwriteDatabaseID, config.appwriteCollectionID, documentId)
            if(deleteDoc){
                console.log("Doc deleted from Database")
            }
            return true
        } catch (error) {
            console.log(error)
        }
    }


}

const datab = new database()
export default datab