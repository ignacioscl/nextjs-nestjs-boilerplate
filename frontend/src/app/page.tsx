'use client'
import { useState } from "react";
import { Button } from "../components/button/button";

export default function Home() {
  const [apiResponse, setApiResponse] = useState("")

  const makeRequestWithToken = async () => {
    try {
      const response = await fetch("/api/getHello")
      const data = await response.json()
      setApiResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setApiResponse("Failed to fetch data: " + error)
    }
  }
  const handleGetUser = async () => {
    try {
      const response = await fetch("/api/getUser")
      const data = await response.json()
      setApiResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setApiResponse("Failed to fetch data: " + error)
    }
  }
  return (
   <>
    <Button variant="default" size="default" onClick={makeRequestWithToken}>
        Default Size
      </Button>
      <Button variant="default" size="default" onClick={handleGetUser}>
        Get User
      </Button>
      <pre>{apiResponse}</pre>
   </>
  );
}

