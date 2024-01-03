import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../redux/actions/studentAction";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa6";
// import { Link } from "react-router-dom";

const Question = () => {
  const dispatch = useDispatch();
  const { questions, loading } = useSelector(
    (state) => state.getStudentTeacher
  );
  const allDept = new Set(questions && questions.map((val) => val.semester));
  const finalDept = [...allDept];
  console.log(questions);

  const [qry, setQry] = useState(" ");
  const [category, setCategory] = useState();
  const handleSubmit = () => {
    dispatch(getQuestions(qry));
  };
  useEffect(() => {
    dispatch(getQuestions(qry, category));
  }, [category]);
  return (
    <div className="px-12 pt-20">
      <div className="w-5/12  m-auto flex items-center">
        <input
          type="text"
          placeholder="search by course title"
          className="w-full bg-emerald-100 p-2 text-emerald-700"
          onChange={(e) => setQry(e.target.value)}
        />
        <p
          className="bg-emerald-100 p-3 text-emerald-700 cursor-pointer"
          onClick={handleSubmit}
        >
          <FaSearch />
        </p>
      </div>
      <div className="mt-6 flex items-start  ">
        <div className="w-2/12 bg-emerald-100 p-4 mt-2 rounded-md">
          <h4 className="text-emerald-700 font-semibold text-xl">Semester</h4>
          <div className="ml-5 mt-1 ">
            {finalDept &&
              finalDept.map((val, ind) => {
                return (
                  <li key={ind} className="cursor-pointer font-semibold">
                    <button onClick={() => setCategory(val)}>{val}</button>
                  </li>
                );
              })}
          </div>
        </div>
        <div className="w-10/12 ml-1">
          {!loading &&
            questions &&
            questions.length < 1 &&
            "No Question Found! 404"}
          {loading ? (
            <p>Please Wait.......</p>
          ) : (
            <div className="flex items-center flex-wrap">
              {questions &&
                questions.map((val, ind) => {
                  return (
                    <div
                      key={ind}
                      className="  text-emerald-700  cursor-pointer rounded-md  w-3/12 min-h-64 mt-2"
                    >
                      <div
                        className="bg-emerald-100  h-full p-4"
                        style={{ width: "99%" }}
                      >
                        <img
                          src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"
                          className="h-40 w-full"
                        />
                        <div className="mt-2">
                          <p className="font-semibold text-sm">{val.title}</p>
                          <p className="text-xs">
                            {val.dept ? val.dept : "Enter a Department"}
                          </p>
                        </div>
                        <Link to={val.image && val.image.url } download={`${val.title}_question_image`} className=" w-fit bg-emerald-300 text-emerald-700 gap-2 flex items-center mt-2 px-2 py-1 rounded-md text-xs">
                        <FaDownload />Download Question
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
