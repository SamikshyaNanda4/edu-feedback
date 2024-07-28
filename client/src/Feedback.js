
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';

const Feedback = () => {
  const [content, setContent] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const res = await axios.get('http://localhost:5000/feedback');
      setFeedbacks(res.data);
    };
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFeedback = { content };
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/feedback/create', newFeedback, {
        headers: { 'x-auth-token': token },
      });
      setContent('');

      // Refresh feedback list
      const res = await axios.get('http://localhost:5000/feedback');
      setFeedbacks(res.data);
    } catch (error) {
      console.error("There was an error submitting the feedback!", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your feedback here"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <div className="feedback-list">
        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="feedback-item">
            <h4>{feedback.userId.username}</h4>
            <p>{feedback.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
