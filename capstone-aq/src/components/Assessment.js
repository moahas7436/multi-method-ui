import React, { useState } from 'react';
import './Assessment.css';
import { useNavigate } from 'react-router-dom';

export const Assessment = () => {
    const [answers, setAnswers] = useState({});

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

    const handleAnswerChange = (questionIndex, answer) => {
        setAnswers({ ...answers, [questionIndex]: answer });
    };

    const navigate = useNavigate();

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

export default Assessment;

function calculateStudyMethod(answers) {
    const scores = {
        "Pomodoro": 0,
        "321": 0,
        "Feynman": 0,
        "Spaced Repetition": 0,
        "Priming": 0
    };

    scores["Pomodoro"] += answers[0] === 'yes' ? 1 : 0;
    scores["321"] += answers[1] === 'yes' ? 1 : 0;
    scores["Spaced Repetition"] += answers[2] === 'yes' ? 1 : 0;
    scores["Feynman"] += answers[3] === 'yes' ? 1 : 0;
    scores["Priming"] += answers[4] === 'yes' ? 1 : 0;

    let maxScore = 0;
    let recommendedMethod = "";

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
