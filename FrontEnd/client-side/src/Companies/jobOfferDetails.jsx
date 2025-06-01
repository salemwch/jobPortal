import React, { useEffect, useState } from "react";
import "../Companies/jobOfferDetails.css";
import commentService from "../services/commentService";
import io from 'socket.io-client';

const JobOfferDetails = ({ jobOffer, onBack, token }) => {
  const [comments, setComments] = useState([]);
  const [replyInputs, setReplyInputs] = useState({});
  const socket = React.useRef(null);
  const user = JSON.parse(sessionStorage.getItem("user")); 

   

   useEffect(() => {
    if (!jobOffer?._id) return;

    commentService.getCommentsByJobOffer(token, jobOffer._id)
      .then(res => setComments(res.data))
      .catch(err => console.error("Failed to fetch comments:", err));

    if (!socket.current) {
      socket.current = io('http://localhost:3000'); 
    }

    socket.current.on('commentAdded', (data) => {
      if (data.jobOfferId === jobOffer._id) {
        setComments(prev => [...prev, data.comment]);
      }
    });

    socket.current.on('commentReplied', (data) => {
      if (data.jobOfferId === jobOffer._id) {
        setComments(prev =>
          prev.map(c => c._id === data.comment._id ? data.comment : c)
        );
      }
    });
    return () => {
      socket.current.off('commentAdded');
      socket.current.off('commentReplied');
    };

  }, [jobOffer, token]);

  const handleReplyChange = (commentId, value) => {
    setReplyInputs({ ...replyInputs, [commentId]: value });
  };

  const handleReplySubmit = async (commentId) => {
    const reply = replyInputs[commentId];
    if (!reply) return;

    try {
      await commentService.respondToComment(
        token,
        commentId,
        user?.user?._id,
        reply,
        user?.user?.name || "Company",
        "company"
      );

      
      const updated = await commentService.getCommentsByJobOffer(token, jobOffer._id);
      setComments(updated.data);
      setReplyInputs({ ...replyInputs, [commentId]: "" });
    } catch (err) {
      console.error("Error replying:", err);
    }
  };

  if (!jobOffer) return <div>Loading...</div>;

  return (
    <div className="details-container">
      <div className="details-card">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1 className="job-title">{jobOffer.title}</h1>
        <p className="company-info">Company Name: <strong>{jobOffer.company.name}</strong></p>

        <div className="details-section">
          <h3>Description</h3>
          <p>{jobOffer.description}</p>
        </div>

        <div className="details-section">
          <h3>Requirements</h3>
          <p>{jobOffer.requirements}</p>
        </div>

        <div className="details-grid">
          <div className="info-box">
            <h4>📍 Location</h4>
            <p>{jobOffer.location}</p>
          </div>
          <div className="info-box">
            <h4>💰 Salary</h4>
            <p>{jobOffer.salary}</p>
          </div>
          <div className="info-box">
            <h4>👀 Views</h4>
            <p>{jobOffer.viewCount}</p>
          </div>
          <div className="info-box">
            <h4>📌 Status</h4>
            <p>{jobOffer.status}</p>
          </div>
        </div>

        <div className="details-section">
          <h3>Applications</h3>
          <p>{jobOffer.jobApplications.length} Condidates applied</p>
        </div>

        <div className="details-section">
          <h3>Test Linked</h3>
          <p>{jobOffer.testJobApplication.length} test(s) available</p>
        </div>

        <p className="created-at">Posted on: {new Date(jobOffer.createdAt).toLocaleDateString()}</p>

        {/* 💬 Comments Section */}
        <div className="details-section">
  <h3>Comments</h3>
  {comments.map((comment) => (
  <div key={comment._id} className="comment-box mb-3 p-3 border rounded">
    <p>
      <strong>Condidate:</strong> {comment.condidate?.name || "Anonymous"}
    </p>
    <p>Comment: {comment.content}</p>
    <p><strong>Created At:</strong> {new Date(comment.createdAt).toLocaleString()}</p>

    {comment.companyResponse?.message && (
      <div className="company-reply p-2 mb-2 bg-light border rounded">
        <strong>Company reply:</strong> {comment.companyResponse.message}
      </div>
    )}

    {!comment.companyResponse?.message && (
      <div className="reply-form mb-3">
        <textarea
          placeholder="Write a reply..."
          value={replyInputs[comment._id] || ""}
          onChange={(e) => handleReplyChange(comment._id, e.target.value)}
          className="form-control"
          rows={3}
        />
        <button className="btn btn-primary mt-2" onClick={() => handleReplySubmit(comment._id)}>
          Reply
        </button>
      </div>
    )}

    {comment.condidateResponse && comment.condidateResponse.length > 0 && (
      <div className="candidate-replies mt-3">
        <strong>Candidate Replies:</strong>
        {comment.condidateResponse.map((reply, i) => (
          <div key={i} className="candidate-reply p-2 mt-2 border rounded bg-white shadow-sm">
            <p>{reply.message}</p>
            <p><small><strong>Responder:</strong> {reply.responder || "Unknown"}</small></p>
            <p><small className="text-muted">Replied at: {new Date(reply.createdAt).toLocaleString()}</small></p>
          </div>
        ))}
      </div>
    )}
  </div>
))}

</div>

      </div>
    </div>
  );
};

export default JobOfferDetails;
