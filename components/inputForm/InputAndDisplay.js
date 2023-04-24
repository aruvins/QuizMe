import {
  Box,
  Button,
  CircularProgress,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import QuestionAndAnswer from "./QuestionAndAnswer";
import useSWR from "swr";


export default function InputAndDisplay({
  isLoading: isLoadingResults,
  isValidating: isValidatingResults,
  data: quizData,
  error: quizError,
  handleTextAreaChange,
  sendDocument,
  currentQuiz,
  showSave,
  userID,
  setMutateIt,
}) {
  const [name, setName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [wikiText, setWikiText] = useState("test");
  const [data, setData] = useState(null);
  const [definition, setDefinition] = useState(null);
  const [loadingDef, setLoadingDef] = useState(true);
  console.log(wikiText);
  const fetcher = async (url) => {
    setLoadingDef(true)
    let data = fetch(url, {
      method: "POST",
      body: JSON.stringify({ text: wikiText }),
    }).then((r) => r.json());
    console.log("Sending to backend", wikiText);
    return data;
  };

  useEffect(() => {
    fetcher("/api/get-wiki-text", wikiText).then((something) => {
      setData(something);
    });
  }, [wikiText]);

  useEffect(() => {setDefinition(data) 
    setLoadingDef(false)}, [data]);

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
    if (isLoadingResults) {
      return <CircularProgress />;
    }

    if (isValidatingResults) {
      return <CircularProgress />;
    }

    if (
      quizData === undefined ||
      currentQuiz === undefined ||
      currentQuiz === null
    ) {
      return <Box></Box>;
    }

    if (quizError) {
      return <div>{quizError}</div>;
    }

    return (
      <Stack
        direction={"column"}
        sx={{
          backgroundColor: "white",
          marginTop: "1em",
        }}
      >
        {currentQuiz.content.map((quizSegment) => (
          <QuestionAndAnswer
            setWikiText={setWikiText}
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
    <Box sx={{ width: "70%" }}>
      <Stack direction="column" sx={{ width: "100%" }}>
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
      <Typography>
        Highlight text to get a definition: {loadingDef ? "" : definition}
      </Typography>
      <div>{display()}</div>
    </Box>
  );
}
