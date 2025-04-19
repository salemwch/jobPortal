import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jobOfferService from "../services/jobOffer";
import commentService from "../services/comment";
import "bootstrap/dist/css/bootstrap.min.css";
import "./jobOfferDetails.css";
import CondidateReplyForm from "../condidate/CondidateReplyForm";
import Header from "../componenets/header";
import Footer from "../componenets/Footer";
import { Modal, Button } from "react-bootstrap";

const JobOfferDetails = () => {
  const { id } = useParams();
  const [jobOffer, setJobOffer] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobOffer = async () => {
      const token = localStorage.getItem("user");

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      try {
        const response = await jobOfferService.getDataById(token, id);
        if (response.data && response.data.getDataId) {
          setJobOffer(response.data.getDataId);
        } else {
          console.error("Invalid job offer data received", response.data);
          setJobOffer(null);
        }

        const commentResponse = await commentService.getCommentsByJobOffer(token, id);
        if (commentResponse.data) {
          setComments(commentResponse.data);
        } else {
          console.error("No comments found");
        }
      } catch (error) {
        console.error("Error fetching job offer:", error);
        setJobOffer(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobOffer();
  }, [id]);

  const refreshComments = async () => {
    const token = localStorage.getItem("user");

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await commentService.getCommentsByJobOffer(token, id);
      if (response.data) {
        setComments(response.data);
      } else {
        console.error("No comments found");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!jobOffer) {
    return <p className="text-danger">No job offer found.</p>;
  }

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="job-details-card">
          <div className="row">
            <div className="col-md-4">
              <img
                src={
                  jobOffer?.company?.image
                    ? `http://localhost:3000/uploads/${jobOffer.company?.image}`
                    : "/default-profile.png"
                }
                alt={jobOffer?.company?.name || "Company Logo"}
                className="job-offer-img"
              />
            </div>
            <div className="col-md-8">
              <div className="job-details">
                <h3>{jobOffer.title}</h3>
                <p><strong>testJobApplication:</strong> {jobOffer.testJobApplication}</p>
                <p><strong>jobOffer ID:</strong> {jobOffer._id}</p>
                <p><strong>Description:</strong> {jobOffer.description}</p>
                <p><strong>Location:</strong> {jobOffer.location}</p>
                <p><strong>Salary:</strong> {jobOffer.salary || "N/A"}</p>
                <p><strong>Company ID:</strong> {jobOffer.company?._id}</p>
                <p><strong>Posted on:</strong> {new Date(jobOffer.createdAt).toLocaleDateString()}</p>
                <p><strong>Status:</strong>
                  <span
                    className={`badge ${jobOffer.status === "approved" ? "badge-success" : jobOffer.status === "rejected" ? "badge-danger" : "badge-warning"}`}
                  >
                    {jobOffer.status || "Pending"}
                  </span>
                </p>
              </div>
            </div>
            <button
              className="btn btn-primary mt-3"
              onClick={() => {
                if (jobOffer.testJobApplication) {
                  navigate(`/apply/${jobOffer._id}`);
                } else {
                  setShowModal(true);
                }
              }}
            >
              Apply Now
            </button>
          </div>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Notice</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center">
                <i className="bi bi-check-circle" style={{ fontSize: "2rem", color: "green" }}></i>
                <h4 className="mt-3">No Test Required</h4>
                <p>This job offer has no test or anything else. You can proceed with your application directly.</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowModal(false);
                  navigate(`/apply/${jobOffer._id}`);
                }}
              >
                Proceed
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="comments-section mt-4">
            <h5>Comments</h5>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment-card">
                  <p><strong>Condidate:</strong> {comment.condidate ? comment.condidate._id : "Unknown"}</p>
                  <p><strong>Condidate:</strong> {comment.condidate ? comment.condidate.name : "unknown"}</p>
                  <p><strong>Content:</strong> {comment.content}</p>
                  <p><strong>Status:</strong>
                    <span className={`badge ${comment.status === "approved" ? "badge-success" : comment.status === "rejected" ? "badge-danger" : "badge-warning"}`}>
                      {comment.status}
                    </span>
                  </p>
                  <p><strong>Created At:</strong> {new Date(comment.createdAt).toLocaleString()}</p>

                  {comment.companyResponse && typeof comment.companyResponse === "object" ? (
                    <div className="mt-2 p-2 bg-light border">
                      <p><strong>Company Response:</strong> {comment.companyResponse.message || "No message available"}</p>
                      <p><strong>Responder:</strong> {comment.companyResponse.responder || "No responder available"}</p>
                    </div>
                  ) : (
                    <p className="text-muted">No response from company yet.</p>
                  )}

                  {Array.isArray(comment.condidateResponse) && comment.condidateResponse.length > 0 ? (
                    <div className="mt-2 p-2 bg-light border">
                      <strong>Condidate Responses:</strong>
                      {comment.condidateResponse.map((response, i) => (
                        <div key={i} className="border rounded p-2 mt-1 bg-white">
                          <p><strong>Message:</strong> {response.message}</p>
                          <p><strong>Responder:</strong> {response.responder}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No response from condidate yet.</p>
                  )}

                  {comment.companyResponse && (
                    <CondidateReplyForm commentId={comment._id} onResponseSent={refreshComments} />
                  )}
                </div>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </div>

          <div className="add-comment-form mt-4">
            <h5>Add a Comment</h5>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={async () => {
                if (!newComment.trim()) return;

                const userData = localStorage.getItem("user");
                if (!userData) {
                  alert("You must be logged in to comment.");
                  return;
                }

                let token = null;
                let condidateId = null;
                try {
                  const parsed = JSON.parse(userData);
                  token = parsed.tokens?.refreshToken;
                  condidateId = parsed.user?._id;
                } catch (err) {
                  console.error("Invalid user data in localStorage.");
                  return;
                }

                setPosting(true);
                try {
                  const res = await commentService.createComment(token, {
                    jobOffer: id,
                    condidate: condidateId,
                    content: newComment,
                  });

                  if (res.data) {
                    setComments([...comments, res.data]);
                    setNewComment("");
                    refreshComments();
                  }
                } catch (err) {
                  console.error("Failed to post comment", err);
                } finally {
                  setPosting(false);
                }
              }}
              disabled={posting}
            >
              {posting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobOfferDetails;