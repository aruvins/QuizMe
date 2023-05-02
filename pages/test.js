import { Button, Stack } from "@mui/material";
import { useState } from "react";

export default function test() {
  const [data, setData] = useState(null);
  const [quizzes, setQuizzes] = useState(null);

  const handleClick = async () => {
    let response = await fetch("/api/add-quiz", {
      method: "POST",
      body: JSON.stringify({userEmail: "zach.furman1@gmail.com", quiz: {name: "test quiz", content: [{question: "1234", answer:"5678"}]}})
    });
    let jsonData = await response.json();
    console.log(jsonData);
    setData(jsonData);
  };

  const handleShowQuizzes = async () => {
    let response = await fetch("/api/retrieve-quiz", {
      method: "POST",
      body: JSON.stringify({userEmail: "zach.furman1@gmail.com"})
    });
    let jsonData = await response.json();
    console.log(jsonData);
    setQuizzes(jsonData);
  };

  return (
    <Stack>
      <Button onClick={handleClick}>CLICK ME</Button>

      <Button onClick={handleShowQuizzes}>Show Quizes</Button>
      {data && JSON.stringify(data)}
      {quizzes && JSON.stringify(quizzes)}
    </Stack>
  );
}
