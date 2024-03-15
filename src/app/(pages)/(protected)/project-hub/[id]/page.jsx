import Test from "@/components/Test/Test"
 export default function UserProjects({params}){

    const {id} = params
    return (
       <Test id={id}/>
    )
}

