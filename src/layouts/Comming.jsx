import React from "react";
import styled from "styled-components";
import Countdown from "react-countdown";

const CommingSoonContainer = styled.div`
  margin-top: 2rem;
  background-color: #f4f4f4;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
`;

const ContentContainer = styled.div`
  max-width: 600px;
  text-align: center;
  color: #333;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const Illustration = styled.img`
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
`;

const StyledCountdown = styled(Countdown)`
  display: flex;
  justify-content: center;
  color: gray;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Comming = ({ title, subtitle, date, illustration }) => {
  return (
    <CommingSoonContainer>
      <ContentContainer>
        <Illustration
          src="https://res.cloudinary.com/dif0oia5b/image/upload/v1683347006/coming_klltno.webp"
          alt="Illustration"
        />
        <Title>Please come back later.</Title>
        <Subtitle>Dương Trung Nguyên - Hà Trường Nguyên</Subtitle>
        <StyledCountdown date="2023-05-10T17:00:00.000Z" />
      </ContentContainer>
    </CommingSoonContainer>
  );
};

export default Comming;
