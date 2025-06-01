import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jobOfferService from "../../services/jobOfferservice";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
  MDBCardFooter
} from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import commentservice from "../../services/commentservice";

const JobOfferTable = () => {
  const { id } = useParams();
  const [jobOffer, setJobOffer] = useState(null);
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobOffer = async () => {
      const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken : null;

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
        const commentResponse = await commentservice.getCommentsByJobOffer(token,id);
        console.log("API Response for Comments:", response.data); 
        if(commentResponse.data){
          setComments(commentResponse.data);
        }else{
          console.error("no comments found");
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!jobOffer) {
    return <p className="text-danger">No job offer found.</p>;
  }

  return (
    <MDBCardGroup>
      <MDBCard>
        <MDBCardImage
          src="https://mdbootstrap.com/img/new/standard/city/041.webp"
          alt={jobOffer.title}
          position="top"
        />
        <MDBCardBody>
          <MDBCardTitle><strong>ID:</strong> {jobOffer._id}</MDBCardTitle>
          <MDBCardText><strong>Title:</strong> {jobOffer.title}</MDBCardText>
          <MDBCardText><strong>Description:</strong> {jobOffer.description}</MDBCardText>
          <MDBCardText><strong>Requirements:</strong> {jobOffer.requirements}</MDBCardText>
          <MDBCardText><strong>Location:</strong> {jobOffer.location}</MDBCardText>
          <MDBCardText><strong>Salary:</strong> {jobOffer.salary || "N/A"}</MDBCardText>
          <MDBCardText><strong>Company ID:</strong> {jobOffer.company.name}</MDBCardText>
          <MDBCardText><strong>Job Application ID:</strong> {jobOffer.jobApplications.length > 0 ? (
            <ul>
                {jobOffer.jobApplications.map((jobApplicationsId, index) => (
                    <li key= {index} > {jobApplicationsId}</li>
                ))}
            </ul>
          ): ('not job application found' ) }</MDBCardText>
          <MDBCardText><strong>Test Job Application ID:</strong> {jobOffer.testJobApplication.length > 0 ?(
            <ul>
                {jobOffer.testJobApplication.map((testJobId, index) => (
                    <li key ={index} > {testJobId} </li>
                ))}
            </ul>
          ): (  "no test job application found ")  }</MDBCardText>
          <MDBCardText>
            <strong>Status:</strong>{" "}
            <span className={`badge ${jobOffer.status === "approved" ? "bg-success" : jobOffer.status === "rejected" ? "bg-danger" : "bg-warning"}`}>
              {jobOffer.status || "Pending"}
            </span>
          </MDBCardText>
          <MDBCardText>
            <strong>Created At:</strong>{" "}
            {jobOffer.createdAt ? new Date(jobOffer.createdAt).toLocaleString() : "N/A"}
          </MDBCardText>
        </MDBCardBody>
        <MDBCardFooter>
          <h5 className="mt-3">Comments</h5>
          {console.log("Rendered Comments:", comments)}
          {comments.length > 0 ? (
            <ul className="list-group">
              {comments.map((comment, index) => (
                <li key={index} className="list-group-item">
                <strong>Condidate:</strong> {comment.condidate._id} <br/>
                <strong>Author:</strong> {comment.condidate.name} <br />
                <strong>Content:</strong> {comment.content} <br />
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    comment.status === "approved"
                      ? "bg-success"
                      : comment.status === "rejected"
                      ? "bg-danger"
                      : "bg-warning"
                  }`}
                >
                  {comment.status}
                </span>
                <br />
                <strong>Created At:</strong>{" "}
                {new Date(comment.createdAt).toLocaleString()} <br/><br/>
                <strong>Company:</strong> {comment.company?.name} <br />
                {comment.companyResponse ? (
  <>
    <strong>Responder:</strong> {comment.companyResponse.responder} <br />
    <strong>Response:</strong> {comment.companyResponse.message} <br />
  </>
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
                  <p className="text-muted mt-2">No response from condidate yet.</p>
                )}
              </li>
              
                
              ))}
              
            </ul>
            
          ) : (
            <p className="text-muted">No comments available.</p>
          )}
         
        </MDBCardFooter>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default JobOfferTable;
