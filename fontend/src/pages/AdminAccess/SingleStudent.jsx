import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAdminStudent } from "../../redux/actions/adminAction"
import { useParams } from "react-router-dom"


const SingleStudent = () => {
    const dispatch = useDispatch()
    const {student} = useSelector(state=>state.student)
    const {id} = useParams()
    console.log(student)
    useEffect(()=>{
        dispatch(getAdminStudent(id))
    },[id])
  return (
    <div>SingleStudent</div>
  )
}

export default SingleStudent