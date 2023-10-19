import { Client, Databases, Account, ID, Storage } from "appwrite";
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

            const uml = await database.createDocument(
                config.appwriteDatabaseID,
                config.appwriteUMLCollectionID,
                ID.unique(),
                {
                    id: uniqueString
                }
                
            
            )
            console.log(id)
            
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
}
const store = new storageService;
export default store
