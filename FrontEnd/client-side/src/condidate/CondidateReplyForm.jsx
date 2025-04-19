import { useState } from "react";
import comment from "../services/comment";

const CondidateReplyForm = ({ commentId, onResponseSent }) => {
  const [reply, setReply] = useState("");
  const [posting, setPosting] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = async () => {
    const storedUser = localStorage.getItem("user");
  
    if (!storedUser) {
      alert("You must be logged in.");
      return;
    }
  
    const parsedUser = JSON.parse(storedUser);
    const token = parsedUser?.refreshToken;
    const user = parsedUser?.user;
  
    if (!token || !user?._id) {
      alert("Token or user ID missing.");
      return;
    }
  
    const responder = user?.name || "Condidate";
  
    try {
      setPosting(true);
      await comment.respondToComment(
        token,
        commentId,
        user._id,
        reply,
        responder,
        user.role
      );
      alert("Reply sent!");
      setReply("");
      setShowReplyForm(false);
      if (onResponseSent) {
        onResponseSent();
      }
    } catch (err) {
      console.error("Failed to send reply", err);
      alert(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setPosting(false);
    }
  };
  

  return (
    <div className="mt-3">
      {showReplyForm ? (
        <>
          <textarea
            className="form-control"
            rows="2"
            value={reply}
            placeholder="Write your response to the company..."
            onChange={(e) => setReply(e.target.value)}
          />
          <button
            className="btn btn-sm btn-success mt-2"
            onClick={handleReply}
            disabled={posting}
          >
            {posting ? "Posting..." : "Send Response"}
          </button>
        </>
      ) : (
        <button
          className="btn btn-sm btn-outline-primary mt-2"
          onClick={() => setShowReplyForm(true)}
        >
          Respond to Company
        </button>
      )}
    </div>
  );
};

export default CondidateReplyForm;
