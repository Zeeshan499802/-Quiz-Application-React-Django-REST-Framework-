import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/pollappdata/QuestionAPIView/";

const Polls = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

  // ---------------- FETCH QUESTIONS ----------------
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(API_URL);
      setQuestions(res.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="w-full p-4">
      <div className="text-center font-semibold text-3xl mb-6">
        Django and React Polls Application
      </div>

      {/* -------- QUESTIONS LIST -------- */}
      <div className="flex flex-col items-center">
        {questions.map((poll) => (
          <div key={poll.id} className="border w-[40rem] p-4 mt-4 rounded-md">
            <div
              onClick={() => navigate(`/vote/${poll.id}`, { state: poll })}
              className="text-xl font-semibold cursor-pointer"
            >
              {poll.question_text}
            </div>
          </div>
        ))}
      </div>

      {/* See Question Result  */}

      {/* <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/result")}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          See Result
        </button>
      </div> */}
    </div>
  );
};

export default Polls;
