import React from "react";
import Arrow from "../assets/testures/arrow.png";
function Section() {
  return (
    <div className="section">
      <div className="info-container">
        <h1 className="title">ag CTS</h1>
        <div className="sub-title">For Cyber Security Solutiuon & Services</div>
        <div className="btn-group">
          <div className="btn">Learn More</div>
          <div className="btn-sec">Subscribe Us</div>
        </div>
      </div>
      <div className="arrow-container">
        <img src={Arrow} alt={"look down"} className="arrow" />
      </div>
    </div>
  );
}

export default Section;
