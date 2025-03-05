import React from "react";
import FeedbackCard from "../feedbackCard/FeedBackCard";
import "./FeedBack.css";
import TitleCard from "../title/TitleCard";

function FeedBack() {
  // Sample feedbacks for a university restaurant
  const feedbacks = [
    {
      name: "Kasun Perera",
      title: "Engineering Faculty - 3rd Year",
      feedback: "Great food and quick service! Love the meal options.",
      rating: 5
    },
    {
      name: "Samantha Wijesinghe",
      title: "Medical Faculty - 2nd Year",
      feedback: "Affordable and delicious meals, perfect for students!",
      rating: 4
    },
    {
      name: "Tharindu Silva",
      title: "Management Faculty - 4th Year",
      feedback: "The atmosphere is amazing and food is always fresh.",
      rating: 5
    },
    {
      name: "Dinithi Fernando",
      title: "Science Faculty - 1st Year",
      feedback: "Healthy options are available and very budget-friendly.",
      rating: 4
    },
    {
      name: "Chathuranga Jayasooriya",
      title: "IT Faculty - 2nd Year",
      feedback: "Spacious seating and friendly staff. Highly recommend!",
      rating: 5
    },
    {
      name: "Ishani Gunawardena",
      title: "Arts Faculty - 3rd Year",
      feedback: "Love the variety of juices and desserts!",
      rating: 4
    }
  ];

  return (
    <>
        <TitleCard title = {"Feedbacks"}/>
    <div className="feedback-grid">
    
      {feedbacks.map((fb, index) => (
        <FeedbackCard 
          key={index} 
          name={fb.name} 
          title={fb.title} 
          feedback={fb.feedback} 
          rating={fb.rating} 
        />
      ))}
    </div>
    </>

  );
}

export default FeedBack;
