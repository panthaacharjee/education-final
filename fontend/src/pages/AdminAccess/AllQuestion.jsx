import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getQuestions } from "../../redux/actions/adminAction"


const AllQuestion = () => {
    const dispatch = useDispatch()
    const {questions} = useSelector(state=>state.adminRoutine)
    console.log(questions)
    useEffect(()=>{
      dispatch(getQuestions())
    },[])
  return (
    <div>AllQuestion</div>
  )
}

export default AllQuestion