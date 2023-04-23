import { Button, Stack } from "@mui/material";
import { useState } from "react";

export default function test() {
  const [data, setData] = useState(null);
  const [quizzes, setQuizzes] = useState(null);

  const handleClick = async () => {
    let response = await fetch("/api/add-quiz", {
      method: "POST",
      body: JSON.stringify({userID: 0, quiz: {name: "post this shit yeah", content: [{question: "1234", answer:"fuck bitches make money"}]}})
    });
    let jsonData = await response.json();
    console.log(jsonData);
    setData(jsonData);
  };

  const handleShowQuizzes = async () => {
    let response = await fetch("/api/retrieve-quiz", {
      method: "POST",
      body: JSON.stringify({userID: 0})
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
