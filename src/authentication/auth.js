import { Client, Account, ID } from "appwrite";
import config from "../conf/config";
const client = new Client();
const account = new Account(client);

client.setEndpoint(config.appwriteURL).setProject(config.appwriteProjectID);


export class authService{

    async signup(name, email, password){
        // console.log(email)
        try {
            const createData = await account.create(ID.unique(), email, password, name);
            if(createData){
                console.log(createData.email)
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async login(email, password){
        try {
            await account.createEmailSession(email, password);
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getUser(){
        try {
            const user = (await account.get()).$id
            console.log(user)
            return user
        } catch (error) {
            console.log(error)        
        }
    }

    google(){
        let promise = account.createOAuth2Session('google', 'http://localhost:3000/project-hub', 'http://localhost:3000/signup')
        promise.then((response) => {
            console.log(response)
        }, (error) => {
            console.log(error)
        })
    }
    github(){
        let promise = account.createOAuth2Session('github', 'http://localhost:3000/project-hub', 'http://localhost:3000/signup')
        promise.then((response) => {
            console.log(response)
        }, (error) => {
            console.log(error)
        })
    }

    async getCurrentUser(){
        try {
            return account.get()
        } catch (error) {
            console.log('Get current User: ' +error)
        }
        return null
    }

    async isLoggedIn(){
        try {
            const loggedIn = await this.getCurrentUser()
            return Boolean(loggedIn)
        } catch (error) {
            console.log("Loged IN error")
        }
        return false
    }


    async logout(){
        try{
            await account.deleteSession('current');
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    async forgotPassword(email){
        try {
            const forgotPassword = await account.createRecovery(email, 'http://localhost:3000/update-password')
            return forgotPassword
        } catch (error) {
            console.log(error)
        }
    }

    async upPassword(userId, secretKey, password, cpassword){
        try {
            const updatePassword = await account.updateRecovery(userId, secretKey, password, cpassword)
            if(updatePassword){
                console.log("password updated")
            }
            return updatePassword
        } catch (error) {
            console.log(error)
        }
    }
   
}

const authServices = new authService();
export default authServices;