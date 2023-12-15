// EnhancedFeynman.js
import React, { useState, useEffect } from 'react';
import '../StudySession.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export const Feynman = () => {
    const userId = Cookies.get('user_id');

  const { state } = useLocation();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState('');
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [conceptToTeach, setConceptToTeach] = useState('');


  const studyMethodDetails = {
    'Feynman Technique': {
      sessionTime: 1800, // 30 minutes
      description: "The Feynman Technique involves teaching a concept you are trying to learn to someone else."
    },
    // ... other study methods
  };

  useEffect(() => {
    const methodDetail = state?.method && studyMethodDetails[state.method];
    if (methodDetail) {
      setTimer(methodDetail.sessionTime);
    } else {
      // Handle the case where the method is not found
      setTimer(0); // Set default timer or handle appropriately
    }
  }, [state?.method]);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (!isTimerRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleEndSession = async () => {
    const currentDateTime = new Date();
    const startTime = new Date(currentDateTime.getTime() - timer * 1000);
    const sessionDetails = {
        feedback: feedback,
        taskList: taskList,
        conceptToTeach: conceptToTeach,
      };
    const sessionData = {
      method: state.method,
      userId: userId,
      methodId: 3, // Replace with the selected study method ID for Feynman Technique
      startTime: startTime.toISOString(),
      endTime: currentDateTime.toISOString(),
      duration: studyMethodDetails[state.method].sessionTime - timer,
      notes: notes,
      feedback: sessionDetails
    };

    try {
      const response = await fetch('/api/save-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      if (response.status === 201) {
        const result = await response.json();
        console.log('Saved Session ID:', result.session_id);
        navigate('/sessionhistory');
      } else {
        console.error('Failed to save study session:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving study session:', error);
    }
    navigate('/sessionhistory');
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const addTask = () => {
    setTaskList([...taskList, '']);
  };

  const updateTask = (index, value) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index] = value;
    setTaskList(updatedTaskList);
  };

  const removeTask = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <div className="study-session-container">
    <h2>Study Session: Feynman Technique</h2>
    <div className="timer">
      {formatTime(timer)}
      <button onClick={toggleTimer} style={{ marginLeft: '10px' }}>
        {isTimerRunning ? 'Pause' : 'Start'}
      </button>
    </div>
    <div className="layout-container">
      <div className="left-section">
        <h3>Concept to Teach:</h3>
        <input
          type="text"
          value={conceptToTeach}
          onChange={(e) => setConceptToTeach(e.target.value)}
          placeholder="Enter the concept to teach"
        />
      </div>
      <div className="center-section">
        <h3>Teaching Mode:</h3>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Jot down your teaching points here..."
        />
      </div>
      <div className="right-section">
        <h3>Feedback:</h3>
        <input
          type="text"
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          placeholder="How confident do you feel about teaching this concept?"
        />
      </div>
    </div>
    <div className="task-list-container">
      <h3>Task List:</h3>
      <ul>
        {taskList.map((task, index) => (
          <li key={index}>
            <input
              type="text"
              value={task}
              onChange={(e) => updateTask(index, e.target.value)}
              placeholder={`Task ${index + 1}`}
            />
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={addTask} style={{ marginRight: '10px' }}>Add Task</button>
    </div>
    <button onClick={handleEndSession} style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '60px', backgroundColor: '#ff5252', color: '#fff', padding: '10px' }}>End Session</button>
  </div>
  );
};

export default Feynman;
