import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Popover,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";

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
  setMutateIt
}) {
  const [name, setName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)

  const saveQuiz = () => {
    console.log(name)
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
        }}
      >
        {currentQuiz.content.map((object) => (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="outlined" color="black">
              {object.question}
            </Typography>
            <Box sx={{ width: "10%" }}></Box>
            <Typography variant="outlined" color="black">
              {object.answer}
            </Typography>
          </Box>
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
    <Container sx={{ width: "100%" }}>
      <Stack>
        <Grid container spacing={2}>
          <Grid item sm={8} md={8}>
            <Stack direction="column">
              <TextField
                size="large"
                multiline
                maxRows={20}
                sx={{ width: "100%" }}
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
          </Grid>
        </Grid>
        <div>{display()}</div>
      </Stack>
    </Container>
  );
}
