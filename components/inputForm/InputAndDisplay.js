import {
  Container,
  Stack,
  Grid,
  Input,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function InputAndDisplay({
  isLoading,
  isValidating,
  data,
  error,
  handleTextAreaChange,
  sendDocument,
  currentQuiz,
  showSave,
}) {
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
          <Button>
            <Typography>Save Quiz!</Typography>
          </Button>
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
              <Input
                size="large"
                sx={{ width: "90%" }}
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
