// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const QUESTION_API = "http://127.0.0.1:8000/pollappdata/QuestionAPIView/";
// const CHOICE_API = "http://127.0.0.1:8000/pollappdata/ChoiceAPIView/";

// const Vote = () => {
//   const { id } = useParams(); // question id
//   const [question, setQuestion] = useState(null);
//   const [choices, setChoices] = useState([]);
//   const [selectedChoice, setSelectedChoice] = useState(null);
//   const [message, setMessage] = useState("");

//   // ---------- FETCH QUESTION ----------
//   const fetchQuestion = async () => {
//     const res = await axios.get(`${QUESTION_API}${id}/`);
//     setQuestion(res.data);
//   };

//   // ---------- FETCH CHOICES ----------
//   const fetchChoices = async () => {
//     const res = await axios.get(CHOICE_API);
//     const filtered = res.data.filter((c) => c.question === parseInt(id));
//     setChoices(filtered);
//   };

//   useEffect(() => {
//     fetchQuestion();
//     fetchChoices();
//   }, [id]);

//   // ---------- SUBMIT VOTE --------- -
//   const submitVote = async (e) => {
//     e.preventDefault();

//     if (!selectedChoice) {
//       alert("Please select an option");
//       return;
//     }

//     const choice = choices.find((c) => c.id === selectedChoice);

//     await axios.put(`${CHOICE_API}${choice.id}/`, {
//       question: choice.question,
//       choice_text: choice.choice_text,
//       votes: choice.votes + 1,
//     });

//     setMessage("Your Option is Correct!");
//     setSelectedChoice(null);
//     fetchChoices();
//   };

//   if (!question) return <div>Loading...</div>;

//   return (
//     <div className="w-full p-6">
//       <h1 className="text-3xl font-bold mb-6">{question.question_text}</h1>

//       <form onSubmit={submitVote}>
//         {choices.map((choice) => (
//           <label
//             key={choice.id}
//             className="border p-4 mt-3 rounded-md flex items-center gap-3 cursor-pointer"
//           >
//             <input
//               name="track"
//               id="track"
//               type="radio"
//               value={choice.id}
//               checked={selectedChoice === choice.id}
//               onChange={() => setSelectedChoice(choice.id)}
//             />
//             <span>{choice.choice_text}</span>
//           </label>
//         ))}

//         <button
//           type="submit"
//           className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Vote;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QUESTION_API = "http://127.0.0.1:8000/pollappdata/QuestionAPIView/";
const CHOICE_API = "http://127.0.0.1:8000/pollappdata/ChoiceAPIView/";

const Vote = () => {
  const { id } = useParams(); // question id
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [choices, setChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [feedback, setFeedback] = useState(null); // Feedback message

  // ---------- FETCH QUESTION ----------
  const fetchQuestion = async () => {
    const res = await axios.get(`${QUESTION_API}${id}/`);
    setQuestion(res.data);
  };

  // ---------- FETCH CHOICES ----------
  const fetchChoices = async () => {
    const res = await axios.get(CHOICE_API);
    const filtered = res.data.filter((c) => c.question === parseInt(id));
    setChoices(filtered);
  };

  useEffect(() => {
    fetchQuestion();
    fetchChoices();
  }, [id]);

  // ---------- SUBMIT VOTE ----------
  const submitVote = async (e) => {
    e.preventDefault();

    if (!selectedChoice) {
      alert("Please select an option");
      return;
    }

    const choice = choices.find((c) => c.id === selectedChoice);

    // Increment vote count
    // await axios.put(`${CHOICE_API}${choice.id}/`, {
    //   question: choice.question,
    //   choice_text: choice.choice_text,
    //   votes: choice.votes + 1,
    //   is_correct: choice.is_correct,
    // });

    // Show feedback based on correctness
    if (choice.is_correct) {
      setFeedback({ text: "✅ Your option is correct!", color: "green" });
    } else {
      setFeedback({ text: "❌ Not correct, please try again.", color: "red" });
    }

    // Reset selection
    setSelectedChoice(null);
    fetchChoices();

    // Redirect back to questions list after 3 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">{question.question_text}</h1>

      <form onSubmit={submitVote}>
        {choices.map((choice) => (
          <label
            key={choice.id}
            className="border p-4 mt-3 rounded-md flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition"
          >
            <input
              type="radio"
              name="vote"
              value={choice.id}
              checked={selectedChoice === choice.id}
              onChange={() => setSelectedChoice(choice.id)}
            />
            <span>{choice.choice_text}</span>
          </label>
        ))}

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {feedback && (
        <div
          className="mt-4 text-xl font-semibold"
          style={{ color: feedback.color }}
        >
          {feedback.text}
        </div>
      )}
    </div>
  );
};

export default Vote;
