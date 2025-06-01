import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import companyService from "../../services/companyservice";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup
} from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TableStyles.css";

const CompanyTable = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCompany = async () => {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken
        : null;
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      try {
        const response = await companyService.getCompanyByID(token, id);
        if (response.data && response.data.getCompanybyID) {
          setCompany(response.data.getCompanybyID);
          
        } else {
          console.error("Invalid company data received", response.data);
          setCompany(null);
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!company) {
    return <p className="text-danger">No company found.</p>;
  }

  return (
    <MDBCardGroup>
      <MDBCard>
        <MDBCardImage
          src={company.image ? `http://localhost:3000/file/${company.image}` : 'https://mdbootstrap.com/img/new/standard/city/041.webp'}
          alt={company.name}
          position="top"
        />
        <MDBCardBody>
          <MDBCardTitle><strong>ID:</strong> {company._id}</MDBCardTitle>
          <MDBCardText><strong>Name:</strong> {company.name}</MDBCardText>
          <MDBCardText><strong>Email:</strong> {company.email}</MDBCardText>
<MDBCardText>
  <strong>Speciality:</strong>{" "}
  {Array.isArray(company.speciality) && company.speciality.length > 0
    ? company.speciality.join(", ")
    : "N/A"}
</MDBCardText>
          <MDBCardText><strong>Phone:</strong> {company.phone}</MDBCardText>
          <MDBCardText><strong>Website:</strong> {company.website ? <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a> : "N/A"}</MDBCardText>
          <MDBCardText><strong>Location:</strong> {company.location}</MDBCardText>
          <MDBCardText><strong>Status:</strong> <span className={`badge ${company.status === "approved" ? "bg-success" : company.status === "rejected" ? "bg-danger" : "bg-warning"}`}>{company.status || "Pending"}</span></MDBCardText>
          <MDBCardText>
  <strong>Job Offers:</strong>
  {company.jobOffers.length > 0 ? (
    <ul>
      {company.jobOffers.map((offerId, index) => (
        <li key={index}>{offerId._id}</li>
      ))}
    </ul>
  ) : (
    " No job offers"
  )}
</MDBCardText>
          <MDBCardText>
  <strong>Created At:</strong>
  {company.createdAt
    ? new Date(company.createdAt).toLocaleString()
    : "N/A"}
</MDBCardText>

        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CompanyTable;
