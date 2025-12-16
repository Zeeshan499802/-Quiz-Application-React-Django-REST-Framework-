import React, { useEffect, useState } from "react";
import axios from "axios";

const RESULT_API = "http://127.0.0.1:8000/pollappdata/ResultAPIView/";

const Result = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(RESULT_API).then((res) => {
          setResult(res.data[0]);
        });
      } catch (error) {
        console.error("Result fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (!result) {
    return <div className="text-center text-xl">No result found</div>;
  }

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="border p-8 w-[30rem] rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center mb-6">Result</h1>

        <p className="text-xl mb-2">
          ✅ Correct Answers: <b>{result.correct_answers}</b>
        </p>

        <p className="text-xl mb-2">
          ❌ Incorrect Answers: <b>{result.incorrect_answers}</b>
        </p>

        <p className="text-xl mb-4">
          📊 Total Questions: <b>{result.total_questions}</b>
        </p>

        <div
          className={`text-2xl font-bold text-center ${
            result.passed ? "text-green-600" : "text-red-600"
          }`}
        >
          {result.passed ? "🎉 PASS" : "❌ FAIL"}
        </div>

        <p className="text-center mt-2 text-gray-600">(Pass mar)</p>
      </div>
    </div>
  );
};

export default Result;
