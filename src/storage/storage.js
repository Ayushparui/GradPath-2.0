import { Client, Databases, Account, ID, Storage, Query } from "appwrite";
import config from "@/conf/config";

const client = new Client();
client.setEndpoint(config.appwriteURL).setProject(config.appwriteProjectID);

const storage = new Storage(client);
const account = new Account(client);
const database = new Databases(client);
 
export class storageService{

    async create(file, projectIndex){

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
        // console.log(uniqueString);

        try {
            let id = uniqueString

            const listDoc = await database.listDocuments(config.appwriteDatabaseID, config.appwriteCollectionID)
            const userId = (await account.get()).$id
            const currDocument = listDoc.documents.filter(document => document.userId == userId);
            const recentProjectDocId = currDocument[projectIndex]

            console.log(userId)
            console.log(currDocument[projectIndex])
           console.log(projectIndex)
           console.log(id)


            // adding UML to the database 
            await database.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                recentProjectDocId.$id,
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
            }else{
                console.log("storage not working")
            }
            return store
        } catch (error) {
            console.log(error)
        }
    }


    async getFilePreview(fileId){
        try {
            const get = storage.getFilePreview(config.appwriteBucketId, fileId)
            // console.log(get)
            return get
        } catch (error) {
            console.log(error)            
        }
    }
}
const store = new storageService;
export default store
