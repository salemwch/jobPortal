import React, { useEffect, useState } from "react";
import commentService from "../../services/commentservice";

const CompanyCommentsDashboard = () => {
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken
    : null;

  useEffect(() => {
    const fetchAllComments = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await commentService.getAllComments(token);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchAllComments();
  }, [token]);

  const handleModeration = async (commentId, status) => {
    try {
      await commentService.moderateComment(token, commentId, status);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? { ...comment, status } : comment
        )
      );
    } catch (error) {
      console.error("Error updating comment status:", error);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await commentService.deleteComment(token, commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <h2>All Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
          >
            <p><strong>Comment:</strong> {comment.content}</p>
            <p><strong>Author:</strong> {comment.condidate?.name || 'unknown'}</p>
            <p><strong>Candidate ID:</strong> {comment.condidate?._id}</p>
            <p><strong>Status:</strong> {comment.status}</p>
            <p><strong>CompanyId:</strong> {comment.company}</p>
            <p><strong>Responder:</strong> {comment.companyResponse?.responder}</p>
            <p><strong>Response:</strong> {comment.companyResponse?.message}</p>

            {/* 👉 Condidate Responses block */}
            {Array.isArray(comment.condidateResponse) && comment.condidateResponse.length > 0 ? (
              <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f8f9fa", border: "1px solid #ccc" }}>
                <strong>Condidate Responses:</strong>
                {comment.condidateResponse.map((response, i) => (
                  <div key={i} style={{ border: "1px solid #ddd", borderRadius: "5px", padding: "10px", marginTop: "5px", backgroundColor: "#fff" }}>
                    <p><strong>Message:</strong> {response.message}</p>
                    <p><strong>Responder:</strong> {response.responder}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "gray", marginTop: "10px" }}>No response from condidate yet.</p>
            )}

            {/* 👉 Action buttons */}
            {/* Button to delete candidate-originated comment */}
            {comment.content && comment.condidate?.name && comment.status && (
              <button
                onClick={() => handleDelete(comment._id)}
                style={{ marginRight: "5px", backgroundColor: "#007bff", color: "white", padding: "5px" }}
              >
                Delete Condidate Comment
              </button>
            )}

            {/* Button to delete company response */}
            {comment.company && comment.companyResponse?.responder && comment.companyResponse?.message && (
              <button
                onClick={() => handleDelete(comment._id)}
                style={{ marginRight: "5px", backgroundColor: "#ffc107", color: "black", padding: "5px" }}
              >
                Delete Company Response
              </button>
            )}

            {/* Other buttons */}
            {comment.status !== "approved" && (
              <button
                onClick={() => handleModeration(comment._id, "approved")}
                style={{ marginRight: "5px", backgroundColor: "green", color: "white", padding: "5px" }}
              >
                Approve
              </button>
            )}
            {comment.status !== "rejected" && (
              <button
                onClick={() => handleModeration(comment._id, "rejected")}
                style={{ marginRight: "5px", backgroundColor: "red", color: "white", padding: "5px" }}
              >
                Reject
              </button>
            )}
            <button
              onClick={() => handleDelete(comment._id)}
              style={{ backgroundColor: "gray", color: "white", padding: "5px" }}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default CompanyCommentsDashboard;
