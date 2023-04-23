import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFile,
} from "mdb-react-ui-kit";

function Signup() {
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center mb-4">
        <MDBCol lg="9" className="">
          <MDBCard>
            <MDBCardBody className="px-4">
              <MDBRow className="align-items-center   pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">First name</h6>
                </MDBCol>

                <MDBCol md="4" className="pe-5">
                  <MDBInput
                    label="First name"
                    size="lg"
                    id="form1"
                    type="text"
                  />
                </MDBCol>
                <MDBCol md="2" className="">
                  <h6 className="mb-0">Last name</h6>
                </MDBCol>

                <MDBCol md="3" className="pe-5">
                  <MDBInput
                    label="Last name"
                    size="lg"
                    id="form1"
                    type="text"
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow className="align-items-center   pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Email address</h6>
                </MDBCol>

                <MDBCol md="9" className="pe-5">
                  <MDBInput
                    label="nguyen@gmail.com"
                    size="lg"
                    id="form2"
                    type="email"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="align-items-center   pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Username</h6>
                </MDBCol>
                <MDBCol md="9" className="pe-5">
                  <MDBInput label="Username" size="lg" id="form2" type="text" />
                </MDBCol>
              </MDBRow>
              <MDBRow className="align-items-center   pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Phone Number</h6>
                </MDBCol>
                <MDBCol md="9" className="pe-5">
                  <MDBInput
                    label="+84 0123 456 789"
                    size="lg"
                    id="form2"
                    type="tel"
                  ></MDBInput>
                </MDBCol>
              </MDBRow>
              <MDBRow className="align-items-center   pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Password</h6>
                </MDBCol>
                <MDBCol md="9" className="pe-5">
                  <MDBInput
                    label="Password"
                    size="lg"
                    id="form2"
                    type="password"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="align-items-center   pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Confirm Password</h6>
                </MDBCol>
                <MDBCol md="9" className="pe-5">
                  <MDBInput
                    label="Confirm Password"
                    size="lg"
                    id="form2"
                    type="password"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="align-items-center   pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Upload Avatar</h6>
                </MDBCol>

                <MDBCol md="9" className="pe-5">
                  <MDBFile size="lg" id="customFile" />
                  <div className="small text-muted mt-2">
                    Upload your Avatar
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBBtn style={{ marginLeft: "3rem" }} className="mb-4" size="lg">
                Register
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
