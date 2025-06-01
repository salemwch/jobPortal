import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jobOfferService from "../services/jobOffer";
import commentService from "../services/commentService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./jobOfferDetails.css";
import CompanyReplyForm from "../Companies/CreateJobOffer/CompanyReplayForm";
import Header from "../componenets/header";
import Footer from "../componenets/Footer";
import { Modal, Button } from "react-bootstrap";
import CondidateReplyForm from "../condidate/CondidateReplyForm";

const JobOfferDetails = () => {
  //Hey React! Listen to the URL — grab whatever comes after /something/:id and give it to me as id. I’ll use that to know which job offer I’m dealing with
  const { id } = useParams();
  //React, remember this: I’m holding the job offer data here. Start with nothing. When I get real data from the backend, I’ll call setJobOffer(data) to fill it in — and you, React, will re-render everything that depends on it
  const [jobOffer, setJobOffer] = useState(null);
  //Hey React, I want to keep track of two things: a list of comments and whatever the user is typing into a new comment input. Start both as empty."
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  //React, this is a signal for when a post request is happening. If I ever say true, it means something’s being sent to the server. Use it to disable the button and show a spinner 
  const [posting, setPosting] = useState(false);
  //React, this one is my ‘loading spinner switch.’ It starts true — as in, I’m loading data. Once I’m done fetching, I’ll flip it off with setLoading(false). Then you’ll show the actual content and hide the spinner
  const [loading, setLoading] = useState(true);
  //React, keep track of whether I’m showing a popup modal or not. It’s closed for now. If something happens (like clicking a button), I’ll tell you to show it with setShowModal(true) 
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    //I’m defining a helper function. This will talk to the backend and get me what I need: the job offer and its comments.
    const fetchJobOffer = async () => {
      //Hey browser, open your session storage and give me the saved ‘user’ object. I need it because it contains the token to prove who the user is
      const token = sessionStorage.getItem("user");
      console.log("Current user:", user);

      //If there’s no token, stop everything! This user is not logged in or the session is broken. Log an error and don’t try to fetch protected data
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      try {
        //Hey server! Here’s my token and job ID — send me the job offer that matches.
        const response = await jobOfferService.getDataById(token, id);
        //“If the server replies with proper data, React, store that job offer inside my jobOffer state. That will automatically update anything on the page that depends on it. If not, log an error and set jobOffer to null”
        if (response.data && response.data.getDataId) {
          setJobOffer(response.data.getDataId);
        } else {
          console.error("Invalid job offer data received", response.data);
          setJobOffer(null);
        }
        //Hey server again! Now give me all the comments tied to this job offer. Use the same token and ID.”
        const commentResponse = await commentService.getCommentsByJobOffer(token, id);

        //“If the server replies with comments, React — store them. That will update the comment section automatically. If not, log a warning
        if (commentResponse.data) {
          setComments(commentResponse.data);
        } else {
          console.error("No comments found");
        }
      }
      catch (error) {
        console.error("Error fetching job offer:", error);
        setJobOffer(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobOffer();
  }, [id]);

    //Go grab the current user's data from session storage — we’ll need their token to ask the backend for comments.
  const refreshComments = async () => {
    const token = sessionStorage.getItem("user");
    //"If there’s no token, stop here. We can’t ask for comments if we don’t know who the user is."
    if (!token) {
      console.error("No authentication token found");
      return;
    }
    //Hey commentService, go get me all the comments for this job offer — here’s the token so you know I’m allowed to ask.
    try {
      const response = await commentService.getCommentsByJobOffer(token, id);
            console.log("Fetched comments with replies: ", response.data);
      //"If the response has a data property, set comments to that property. If not, log an error and set comments to an empty array."
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
      <div className="containerr mt-5">
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
                <p><strong>jobOffer Title:</strong> {jobOffer.title}</p>
                <p><strong>Description:</strong> {jobOffer.description}</p>
                <p><strong>Location:</strong> {jobOffer.location}</p>
                <p><strong>Salary:</strong> {jobOffer.salary || "N/A"}</p>
                <p><strong>Company name:</strong> {jobOffer.company?.name}</p>
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
                //React! Here’s a blue button that says ‘Apply Now’. When clicked, If a test is required → instantly navigate to the /apply/:id page , If no test is needed → show the modal popup to notify the user.   
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
    <div key={index} className="comment-card mb-4 p-3 border rounded">
      <p><strong>Condidate:</strong> {comment.condidate ? comment.condidate.name : "unknown"}</p>
      <p><strong>Content:</strong> {comment.content}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          className={`badge ${
            comment.status === "approved"
              ? "badge-success"
              : comment.status === "rejected"
              ? "badge-danger"
              : "badge-warning"
          }`}
        >
          {comment.status}
        </span>
      </p>
      <p><strong>Created At:</strong> {new Date(comment.createdAt).toLocaleString()}</p>

      {/* Company response */}
      {comment.companyResponse && typeof comment.companyResponse === "object" ? (
        <div className="mt-3 p-3 bg-light border rounded">
          <p><strong>Company Response:</strong> {comment.companyResponse.message || "No message available"}</p>
          <p><strong>Responder:</strong> {comment.companyResponse.responder || "No responder available"}</p>
          <p><small className="text-muted">Responded at: {comment.companyResponse.createdAt ? new Date(comment.companyResponse.createdAt).toLocaleString() : "unknown"}</small></p>
        </div>
      ) : (
        <>
          <p className="text-muted mt-3">No response from company yet.</p>
          {user?.user?.role === "company" && (
            <CompanyReplyForm commentId={comment._id} onReplySubmitted={refreshComments} />
          )}
        </>
      )}

      {comment.condidateResponse && Array.isArray(comment.condidateResponse) && comment.condidateResponse.length > 0 ? (
        <div className="mt-4">
          <h6>Candidate Replies:</h6>
          {comment.condidateResponse.map((reply, i) => (
            <div key={i} className="p-2 mb-2 bg-white border rounded shadow-sm">
              <p>{reply.message || "No message available"}</p>
              <p><small><strong>Responder:</strong> {reply.responder || "Unknown"}</small></p>
              <p><small className="text-muted">Replied at: {reply.createdAt ? new Date(reply.createdAt).toLocaleString() : "unknown"}</small></p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted mt-3">No reply from candidate yet.</p>
      )}

      {/* Show reply form for candidate */}
      {user?.user?.role === "condidate" && (
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
            {/* Hey browser, if the user writes in this box, store it in newComment*/}
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="btn btn-primary mt-2" 
              //When the button is clicked, run this async function
              onClick={async () => { 
                //If the user didn’t write anything useful (just spaces), stop right away
                if (!newComment.trim()) return;
                //First, get the user from session storage. If we don’t find anything, show an alert and stop.
                const userData = sessionStorage.getItem("user");
                if (!userData) {
                  alert("You must be logged in to comment.");
                  return;
                }
                //Try to parse the user data and grab the refresh token and condidate ID. If it’s broken, show an error and stop."
                let token = null;
                let condidateId = null;
                try {
                  const parsed = JSON.parse(userData);
                  token = parsed.tokens?.refreshToken;
                  condidateId = parsed.user?._id;
                } catch (err) {
                  console.error("Invalid user data in sessionStorage.");
                  return;
                }
                //Set posting to true so we can show a loading state. Then send the comment using the service, passing token and required data.
                setPosting(true);
                try {
                  const res = await commentService.createComment(token, {
                    jobOffer: id,
                    condidate: condidateId,
                    content: newComment,
                  });
                  //If the backend sends back the new comment Add it to the comment list , Clear the text box and refresh the comments list 
                  if (res.data) {
                    setComments([...comments, res.data]);
                    setNewComment(""); 
                    refreshComments();
                  }
                }
                //If something goes wrong, log it. Then always (whether it worked or failed), mark posting as false to reset the button state
                catch (err) {
                  console.error("Failed to post comment", err);
                } finally {
                  setPosting(false);
                }
              }}
              //Disable the button while posting to prevent double submissions. Show a spinner message.
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