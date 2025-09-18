import React from "react";
import "./SummaryCard.css";

export default function SummaryCard({ title, value, icon, color }) {
  return (
    <div className="summary-card">
      <div className="card-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="card-info">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
}
