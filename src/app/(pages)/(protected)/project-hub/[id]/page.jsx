import Test from "@/components/Test/Test"
const UserProjects = ({params}) =>{

    const {id} = params
    return (
       <Test id={id}/>
    )
}

export default UserProjects

