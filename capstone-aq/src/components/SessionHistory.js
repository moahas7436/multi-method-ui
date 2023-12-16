import React from 'react';
import './SessionHistory.css';
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import NavigationBar from './NavigationBar';

export const SessionHistory = ({setActiveTab}) => {
    const userId = Cookies.get('user_id');
    const [selectedMethods, setSelectedMethods] = useState(['All']); // Default to showing all methods
    
    useEffect(() => {
      // Reset the activeTab to 'register' when the component renders
      setActiveTab('/sessionhistory');
  }, []);

    // Dummy data for the example. You will fetch this data from your backend/database.
    const [sessionHistoryData, setSessionHistoryData] = useState([]);
    const methods = [
        'All',
        'Pomodoro Technique',
        '321 Method',
        'Feynman Technique',
        'Priming',
        // Add more methods for each study method you have
      ];
    
    const getDate = (obj) => {
        const timestamp = obj;
        const dateObject = new Date(timestamp);

        // Get the date in YYYY-MM-DD format
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
        const day = String(dateObject.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate); // Output: "2023-12-14"
        return formattedDate
    }
    // const sessionHistoryData = [
    //     {
    //         date: new Date().toLocaleDateString(),
    //         method: 'Pomodoro',
    //         notes: 'Studied chapter 5 of history textbook',
    //     },
    //     // More sessions...
    // ];
    const handleMethodChange = (method) => {
        if (method === 'All') {
          setSelectedMethods(['All']);
        } else {
          const updatedMethods = selectedMethods.includes('All')
            ? [method]
            : selectedMethods.includes(method)
            ? selectedMethods.filter((selectedMethod) => selectedMethod !== method)
            : [...selectedMethods, method];
    
          setSelectedMethods(updatedMethods);
        }
      };
    useEffect(() => {
        // Fetch session history data for the specified user from your backend or API
        // You may need to replace '/api/get-session-history' with your actual endpoint
        fetch(`/api/get-session-history?userId=${userId}`)
            .then((response) => response.json())
            .then((data) => {
                // Set the fetched session history data in the state
                setSessionHistoryData(data);
                console.log(data)
                console.log(data[0].start_time)
            })
            .catch((error) => {
                console.error('Error fetching session history:', error);
            });
    }, [userId]);
    return (
      <>
        <div className="session-history-container">
          <h2>Study Session History</h2>
    <h3 style={{fontSize: "15pt"}}>Filter sessions by study method:</h3>
          {/* Study method filter checkboxes */}
          {methods.map((method) => (
            <label key={method} className="method-checkbox">
              <input
                type="checkbox"
                value={method}
                checked={selectedMethods.includes(method)}
                onChange={() => handleMethodChange(method)}
              />
              {method}
            </label>
          ))}
    
          <div className="scrollable-entries">
            {sessionHistoryData
              .filter((session) =>
                selectedMethods.some((method) => method === 'All' || method === session.method)
              )
              .map((session, index) => {
                const isSelectedMethod = selectedMethods.includes('All') || selectedMethods.includes(session.method);
    
                if (!isSelectedMethod) {
                  return null; // Skip rendering if the method doesn't match the filter
                }
    
                const details = session.method === 'Feynman Technique' && session.feedback
                  ? JSON.parse(session.feedback)
                  : null;
    
                return (
                  <div key={index} className="session-history-entry">
                    <h3>Study Method: {session.method}</h3>
                    <p>{session.notes}</p>
                    <time>Date: {getDate(session.start_time)}</time>
    
                    {/* Include the logic here to render session details if needed */}
                    {details && (
                      <div>
                        <h4>Feedback Details:</h4>
    
                        {/* Conditionally render Concept to Teach */}
                        {details.conceptToTeach && (
                          <p>Concept to Teach: {details.conceptToTeach}</p>
                        )}
    
                        {/* Conditionally render Feedback */}
                        {details.feedback && (
                          <p>Feedback: {details.feedback}</p>
                        )}
    
                        {/* Conditionally render Task List */}
                        {details.taskList && details.taskList.length > 0 && (
                          <div>
                            <h4>Task List:</h4>
                            <ul>
                              {details.taskList.map((task, taskIndex) => (
                                <li key={taskIndex}>{task}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        </>
      );
    // return (
    //     <div className="session-history-container">
    //       <h2>Study Session History</h2>
    //    {/* Study method filter dropdown */}
    //    <label htmlFor="studyMethodFilter">Filter by Study Method:</label>

    //    <select
    //     id="studyMethodFilter"
    //     onChange={(e) => setSelectedMethods(Array.from(e.target.selectedOptions, option => option.value))}
    //     value={selectedMethods}
    //     multiple
    //   >
    //        <option value="All">All Methods</option>
    //     <option value="Pomodoro Technique">Pomodoro</option>
    //     <option value="321 Method">321 Method</option>
    //     <option value="Feynman Technique">Feynman</option>
    //     <option value="Spaced Repetition">Spaced Repetition</option>

    //     <option value="Priming">Priming</option>
    //     {/* Add more options for each study method you have */}
    //   </select>

    //       {sessionHistoryData.map((session, index) => {
    //         let details = null;
    
    //         // Check if the method is Feynman
    //         if (session.method === 'Feynman Technique' && session.feedback) {
    //           // Parse the session_details string into a JSON object
    //           details = JSON.parse(session.feedback);
    //           console.log(details)
    //         }
    
    //         // return (
    //         //   <div key={index} className="session-history-entry">
    //         //     <h3>Study Method: {session.method}</h3>
    //         //     <p>{session.notes}</p>
    //         //     <time>Date: {getDate(session.start_time)}</time>
    
    //         //     {/* Check if the method is Feynman */}
    //         //     {details && (
    //         //       <div>
    //         //         <h4>Feedback Details:</h4>
    
    //         //         {/* Conditionally render Concept to Teach */}
    //         //         {details.conceptToTeach && (
    //         //           <p>Concept to Teach: {details.conceptToTeach}</p>
    //         //         )}
    
    //         //         {/* Conditionally render Feedback */}
    //         //         {details.feedback && (
    //         //           <p>Feedback: {details.feedback}</p>
    //         //         )}
    
    //         //         {/* Conditionally render Task List */}
    //         //         {details.taskList && details.taskList.length > 0 && (
    //         //           <div>
    //         //             <h4>Task List:</h4>
    //         //             <ul>
    //         //               {details.taskList.map((task, taskIndex) => (
    //         //                 <li key={taskIndex}>{task}</li>
    //         //               ))}
    //         //             </ul>
    //         //           </div>
    //         //         )}
    //         //       </div>
    //         //     )}
    //         //   </div>
    //         // );
    //       })}
    //     </div>
    //   );

};

export default SessionHistory;
