const config = {
    appwriteURL: process.env.NEXT_PUBLIC_APPWRITE_URL,
    appwriteProjectID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    appwriteDatabaseID: process.env.NEXT_PUBLIC_APPWRITE_WEBAPP_DATABASE_ID,
    appwriteCollectionID: process.env.NEXT_PUBLIC_APPWRITE_WEBAPPDATA_COLLECTION_ID,
    appwriteUMLCollectionID: process.env.NEXT_PUBLIC_APPWRITE_UML_ID,
    appwriteBucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
    appwriteImgBucketId: process.env.NEXT_PUBLIC_APPWRITE_IMAGE_BUCKET_ID
}

export default config