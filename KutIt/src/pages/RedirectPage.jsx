import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL_FOR_BACKEND;

export default function RedirectPage() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
  async function fetchAndRedirect() {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/${shortCode}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        if (data.response.originalLink) {
          window.location.href = data.response.originalLink;
        }
      } else {
        navigate("/error")
      }
    } catch (err) {
       navigate("/error");
    }
  }

  fetchAndRedirect();
}, [shortCode]);


   

  return <p>Redirecting...</p>;
}
