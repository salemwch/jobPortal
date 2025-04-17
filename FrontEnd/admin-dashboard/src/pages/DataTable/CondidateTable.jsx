import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import condidateService from "../../services/condidateservice";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TableStyles.css";

const CondidateCard = () => {
  const { id } = useParams();
  const [condidate, setCondidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCondidate = async () => {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken
        : null;

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      try {
        const response = await condidateService.getCondidateById(token, id);
        if (response.data && response.data.getCondidateById) {
          setCondidate(response.data.getCondidateById);
        } else {
          console.error("Invalid Condidate data received", response.data);
          setCondidate(null);
        }
      } catch (error) {
        console.error("Error fetching Condidate:", error);
        setCondidate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCondidate();
  }, [id]);
  useEffect(() => {
    if (condidate) {
      console.log("Candidate Data:", condidate);
      console.log("Test Job Applications:", condidate.testJobApplication);
    }
  }, [condidate]);
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!condidate) {
    return <p className="text-danger">No Condidate found.</p>;
  }

  return (
    <MDBCardGroup>
      <MDBCard>
        <MDBCardImage
          src={
            condidate.image
              ? `http://localhost:3000/file/${condidate.image}`
              : "https://mdbootstrap.com/img/new/standard/city/041.webp"
              
          }
          alt={condidate.name}
          position="top"
          style={{ width: "100ù", height: "600px", objectFit: "cover", margin: "auto" }}

        />
        <MDBCardBody>
          <MDBCardTitle>
            <strong>ID:</strong> {condidate._id}
          </MDBCardTitle>
          <MDBCardText>
            <strong>Name:</strong> {condidate.name}
          </MDBCardText>
          <MDBCardText>
            <strong>Email:</strong> {condidate.email}
          </MDBCardText>
          <MDBCardText>
            <strong>Phone:</strong> {condidate.phone}
          </MDBCardText>
          <MDBCardText>
            <strong>Education:</strong> {condidate.education || "N/A"}
          </MDBCardText>
          <MDBCardText>
            <strong>Work Experience:</strong> {condidate.workExperience || "N/A"}
          </MDBCardText>
          <MDBCardText>
            <strong>Skills:</strong> {condidate.skills || "N/A"}
          </MDBCardText>
          <MDBCardText>
            <strong>Location:</strong> {condidate.location || "N/A"}
          </MDBCardText>
          <MDBCardText>
            <strong>Status:</strong>
            <span
              className={`badge ${
                condidate.status === "approved"
                  ? "bg-success"
                  : condidate.status === "rejected"
                  ? "bg-danger"
                  : "bg-warning"
              }`}
            >
              {condidate.status || "Pending"}
            </span>
          </MDBCardText>
          <MDBCardText>
            <strong>Job Applications ID:</strong> { condidate.jobApplications.length > 0 ? (
              <ul>
                {condidate.jobApplications.map((jobApplicationsId, index) =>(
                  <li key = {index} > {jobApplicationsId._id}</li>
                ))}
              </ul>
            ): ( 'no job applications found') }
          </MDBCardText>
          <MDBCardText>
  <strong>Test Job Application ID(s):</strong>{" "}
  {condidate.testJobApplication && condidate.testJobApplication.length > 0 ? (
    <ul>
      {condidate.testJobApplication.map((testJobId, index) => (
        <li key={index}>{testJobId}</li>
      ))}
    </ul>
  ) : (
    "No test job applications found"
  )}
</MDBCardText>



          <MDBCardText>
            <strong>View Count:</strong> {condidate.viewCount }
          </MDBCardText>
          <MDBCardText>
  <strong>Created At:</strong>{" "}
  {condidate.createdAt
    ? new Date(condidate.createdAt).toLocaleString()
    : "N/A"}
</MDBCardText>

        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CondidateCard;
