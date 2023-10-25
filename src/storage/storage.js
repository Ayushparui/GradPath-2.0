import { Client, Databases, Account, ID, Storage, Query } from "appwrite";
import config from "@/conf/config";

const client = new Client();
client.setEndpoint(config.appwriteURL).setProject(config.appwriteProjectID);

const storage = new Storage(client);
const account = new Account(client);
const database = new Databases(client);
 
export class storageService{

    async create(file){

            // Generate Unique character to store
        function generateUniqueString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
        
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }
            return result;
        }
        
        // Usage
        const uniqueString = generateUniqueString(10); // Change 10 to the desired length
        console.log(uniqueString);

        try {
            let id = uniqueString

            const listDoc = await database.listDocuments(config.appwriteDatabaseID, config.appwriteCollectionID)
            const userId = (await account.get()).$id
            const currDocument = listDoc.documents.filter(document => document.userId == userId);
            const docId = currDocument.map(document => document.$id);
            const latest = currDocument.sort((a,b) => new Date(b.$createdAt) - new Date(a.$createdAt));
            const mostRecentProject = latest[0]
            const recentProjectDocId = mostRecentProject.$id


            console.log(mostRecentProject.name)
            console.log(mostRecentProject.$id)
            console.log(currDocument)
            console.log(docId)


            // adding UML to the database 
            await database.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                recentProjectDocId,
                {
                    UML_file_ID: uniqueString
                }

            )


            const store = await storage.createFile(
                config.appwriteBucketId,
                uniqueString,
                file
            );
            if(store){
                console.log("storage workign successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }




    // async filePreview(){
        
    //     try {
    //         const prev = storage.listFiles(config.appwriteBucketId);
    //         if(prev){
    //             console.log("Successfull Preview")
    //         }
    //         console.log(prev)
    //         return prev
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    async getFilePreview(fileId){
        try {
            const get = storage.getFilePreview(config.appwriteBucketId, fileId)
            console.log(get)
            return get
        } catch (error) {
            console.log(error)            
        }
    }
}
const store = new storageService;
export default store
