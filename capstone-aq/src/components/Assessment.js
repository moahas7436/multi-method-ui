import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Assessment.css';
import Cookies from 'js-cookie';

const Assessment = () => {
    

    const navigate = useNavigate();
    useEffect(() => {
        const existingUserId = Cookies.get('user_id');

        if (!existingUserId) {
            // Redirect to the login page if userId cookie is not present
            navigate('/');
        }
    }, [navigate]); // Include navigate in the dependency array
    const questions = [
        "Do you prefer short, focused study sessions?",
        "Are you comfortable with intensive learning in a short time?",
        "Do you like revisiting topics over time to improve memory?",
        "Do you prefer to understand topics deeply, even if it takes more time?",
        "Do you like to actively engage with the material, such as teaching it to someone else?",
        "Do you find frequent breaks helpful in maintaining focus?",
        "Do you prefer a structured approach to studying?",
        "Are you able to concentrate for long periods without distraction?"
    ];

    const [answers, setAnswers] = useState(questions.reduce((acc, _, index) => ({ ...acc, [index]: null }), {}));

    const handleAnswerChange = (questionIndex, answer) => {
        setAnswers({ ...answers, [questionIndex]: answer });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const preferredMethod = calculateStudyMethod(answers);
        navigate('/results', { state: { recommendedMethod: preferredMethod } });
    };

    return (
        <div className="assessment-container">
            <h2>Learning Style Assessment</h2>
            <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <div key={index} className="question">
                        <p>{question}</p>
                        <input
                            type="radio"
                            name={`question${index}`}
                            value="yes"
                            onChange={() => handleAnswerChange(index, 'yes')}
                        /> Yes
                        <input
                            type="radio"
                            name={`question${index}`}
                            value="no"
                            onChange={() => handleAnswerChange(index, 'no')}
                        /> No
                    </div>
                ))}
                <button type="submit" className="submit-btn">Confirm</button>
            </form>
        </div>
    );
};

function calculateStudyMethod(answers) {
    const scores = {
        "Pomodoro Technique": answers[0] === 'yes' ? 1 : 0,
        "321 Method": answers[1] === 'yes' ? 1 : 0,
        "Feynman Technique": answers[2] === 'yes' ? 1 : 0,
        "Spaced Repetition": answers[3] === 'yes' ? 1 : 0,
        "Priming": answers[4] === 'yes' ? 1 : 0,
        // ... additional logic for other methods
    };

    let maxScore = 0;
    let recommendedMethod = "Unsure";

    for (const method in scores) {
        if (scores[method] > maxScore) {
            maxScore = scores[method];
            recommendedMethod = method;
        }
    }

    const allNo = Object.values(answers).every(answer => answer === 'no');
    if (allNo) {
        return "Suggested Starting Point";
    }

    return recommendedMethod;
}

export default Assessment;