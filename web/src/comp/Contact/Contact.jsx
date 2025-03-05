import React, { useState } from "react";
import "./Contact.css";
import TitleCard from "../title/TitleCard";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5369/email/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("Email sent successfully!");
        toast.success("Email sent successfully!");
        setFormData({ fullName: "", email: "", message: "" }); // Clear form
      } else {
        setStatus("Failed to send email. Try again later.");
      }
    } catch (error) {
      setStatus("Error occurred. Please try again.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
      <TitleCard title={"Contact Us"} />
      <div className="contact-container">
        <div className="contact-info">
          <h2 className="contact-title">Any special requests <br /> from us?</h2>
          <p className="contact-subtext">
            For urgent matters, please call us at{" "}
            <a href="tel:+6106871575" className="contact-phone">610-687-1575</a>
          </p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="contact-input"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            className="contact-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            className="contact-textarea"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <p className="contact-note">
            You may receive marketing and promotional materials. Contact the merchant for their privacy practices.
          </p>
          <button type="submit" className="contact-button">{!loading ? "Submit" : "sending..."}</button>
        </form>
      </div>
    </>
  );
};

export default Contact;
