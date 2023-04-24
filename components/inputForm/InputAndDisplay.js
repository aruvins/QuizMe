import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import QuestionAndAnswer from "./QuestionAndAnswer";

export default function InputAndDisplay({
  isLoading,
  isValidating,
  data,
  error,
  handleTextAreaChange,
  sendDocument,
  currentQuiz,
  showSave,
  userID,
  setMutateIt,
}) {
  const [name, setName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const saveQuiz = () => {
    fetch("/api/add-quiz", {
      method: "POST",
      body: JSON.stringify({
        userID: userID,
        quiz: { name: name, content: currentQuiz.content },
      }),
    }).then((r) => r.json());
  };

  const handleTextFieldChange = (event) => {
    setName(event.target.value);
  };

  const handleFinalSave = () => {
    setAnchorEl(null);
    saveQuiz();
    setMutateIt(Math.random());
  };

  const handleSaveQuiz = (e) => {
    setAnchorEl(e.currentTarget);
  };

  function display() {
    if (isLoading) {
      return <CircularProgress />;
    }

    if (isValidating) {
      return <CircularProgress />;
    }

    if (
      data === undefined ||
      currentQuiz === undefined ||
      currentQuiz === null
    ) {
      return <Box></Box>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <Stack
        direction={"column"}
        sx={{
          backgroundColor: "white",
          marginTop: '1em'
        }}
      >
        {currentQuiz.content.map((quizSegment) => (
          <QuestionAndAnswer

            id={quizSegment}
            question={quizSegment.question}
            answer={quizSegment.answer}
          />
        ))}
        {showSave && (
          <div>
            <Button onClick={handleSaveQuiz}>
              <Typography>Save Quiz!</Typography>
            </Button>
            <Popover open={open} anchorEl={anchorEl}>
              <TextField onChange={handleTextFieldChange} />{" "}
              <Button onClick={handleFinalSave}>Save Quiz</Button>{" "}
            </Popover>
          </div>
        )}
      </Stack>
    );
  }

  return (
    <Box
    sx={{width: '70%'}}
    >
      <Stack direction="column"
      sx={{width: '100%'}}
      >
        <TextField
          size="large"
          multiline
          maxRows={20}
          sx={{ width: "100%", marginBottom: "1em" }}
          onChange={handleTextAreaChange}
          placeholder="Paste your document here"
        />
        <Button
          variant="outlined"
          sx={{ width: "20px" }}
          onClick={sendDocument}
        >
          Submit
        </Button>
      </Stack>
      <div>{display()}</div>
    </Box>
  );
}
