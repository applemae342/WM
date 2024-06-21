import React from "react";

const Card = ({ title, content }) => {
  return (
    <div className="card w-[400px] h-[300px] p-10 m-10 rounded">
      <div className="card-content">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-4">{content}</p>
      </div>
    </div>
  );
};

export default Card;
