import { useEffect, useState } from "react";
import recentView from "../../services/recentView";

const RecentComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken
        : null;

      const response = await recentView.getRecentComments(token, 3);
      console.log("API Response:", response.data);
      setComments(response.data);
    };
    fetchComments();
  }, []);

  return (
    <div className="card w-100">
      <div className="card-body p-4">
        <div className="mb-4">
          <h5 className="card-title fw-semibold">Recent Comments</h5>
        </div>
        <ul className="timeline-widget mb-0 position-relative mb-n5">
  {comments.map((comment, index) => (
  <li
    key={comment._id}
    className="timeline-item d-flex position-relative overflow-hidden"
  >
    <div className="timeline-time text-dark flex-shrink-0 text-end">
      {comment.createdAt
        ? new Date(comment.createdAt).toLocaleTimeString()
        : "Not Responded"}
    </div>

    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
      <span
        className={`timeline-badge border-2 border ${
          index % 5 === 0
            ? "border-primary"
            : index % 5 === 1
            ? "border-info"
            : index % 5 === 2
            ? "border-success"
            : index % 5 === 3
            ? "border-warning"
            : "border-danger"
        } flex-shrink-0 my-8`}
      />
      <span className="timeline-badge-border d-block flex-shrink-0" />
    </div>

    <div className="timeline-desc fs-3 text-dark mt-n1">
      <strong>
        {comment.condidate?.name || comment.company?.name || "Unknown"}
      </strong>
      : {comment.content}
      <br />
      <strong>Job Offer ID:</strong> {comment.jobOffer}
      <br />
      <strong>Status:</strong> {comment.status}
      {comment.companyResponse && (
        <>
          <br />
          <strong>Responder:</strong> {comment.companyResponse.responder}
          <br />
          <strong>Response:</strong> {comment.companyResponse.message}
        </>
      )}

      {/* ✅ Add this block below for condidate responses */}
      {comment.condidateResponse &&
        comment.condidateResponse.length > 0 && (
          <div className="candidate-replies mt-3">
            <strong>Candidate Replies:</strong>
            {comment.condidateResponse.map((reply, i) => (
              <div
                key={i}
                className="candidate-reply p-2 mt-2 border rounded bg-white shadow-sm"
              >
                <p>{reply.message}</p>
                <p>
                  <small>
                    <strong>Responder:</strong>{" "}
                    {reply.responder || "Unknown"}
                  </small>
                </p>
                <p>
                  <small className="text-muted">
                    Replied at:{" "}
                    {reply.createdAt
                      ? new Date(reply.createdAt).toLocaleString()
                      : "N/A"}
                  </small>
                </p>
              </div>
            ))}
          </div>
        )}
    </div>
  </li>
))}

</ul>


      </div>
    </div>
  );
};

export default RecentComments;
