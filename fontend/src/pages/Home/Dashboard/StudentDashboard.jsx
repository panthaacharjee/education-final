import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "../../../redux/actions/studentAction";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { teachers, loading } = useSelector((state) => state.getStudentTeacher);

  const allDept = new Set(teachers && teachers.map((val) => val.dept));
  const finalDept = [...allDept];
  console.log(finalDept);
  useEffect(() => {
    dispatch(getTeachers());
  }, []);
  return (
    <div className="px-12 pt-20 ">
      <div className="w-5/12 bg-emerald-100 text-emerald-600 rounded-s-lg m-auto flex items-center">
        <input
          type="text"
          placeholder="search your teacher"
          className="w-full bg-emerald-100 text-emerald-700 border-sky-600 rounded-s-lg p-2 "
        />
        <p className="p-2 text-xl text-emerald rounded-s-lg cursor-pointer">
        <IoSearchOutline />
        </p>
      </div>
      <div className="mt-6 flex items-start  ">
        <div className="w-2/12 bg-emerald-100 p-4 rounded-s-3xl mt-1">
          <h4 className="text-emerald-700 font-semibold text-xl">Department of</h4>
          <div className="ml-5 mt-1 ">
            {finalDept &&
              finalDept.map((val, ind) => {
                return (
                  <li key={ind} className="cursor-pointer font-semibold">
                    <button>{val}</button>
                  </li>
                );
              })}
          </div>
        </div>
        <div className="w-10/12 ml-1">
          {loading ? (
            <p>Please Wait.......</p>
          ) : (
            <div className="flex items-center flex-wrap gap-0">
              {teachers &&
                teachers.map((val, ind) => {
                  return (
                    <Link
                      key={ind}
                      to={`/get/teacher/${val._id}`}
                      className="  text-white mt-1 cursor-pointer rounded-md  w-3/12"
                    >
                      <div
                        className="bg-emerald-100 text-emerald-600 p-4 "
                        style={{ width: "99%" }}
                      >
                      {val.avatar?  <img
                          src={val.avatar.url}
                          className="h-40"
                        />:  <img
                        src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"
                        className="h-40"
                      />}
                        <div className="mt-2">
                          <p className="font-semibold">{val.name}</p>
                          <p>{val.dept ? val.dept : "Enter a Department"}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
