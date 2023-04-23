import {
  Stack,
  Container,
  Typography,
  Divider,
  Button,
  Box,
} from "@mui/material";

import useSWR from "swr";

import CustomButton from "./customButton";

const fetcher = (url, userID) => {
  let data = fetch(url, {
    method: "POST",
    body: JSON.stringify({ userID: userID }),
  }).then((r) => r.json());
  return data;
};

export default function Sidebar({ setCurrentQuiz, userID, setShowSave }) {
  const { data, error, isLoading, isValidating } = useSWR(
    "/api/retrieve-quiz",
    (url) => fetcher(url, userID)
  );

  function Display() {
    if (error) {
      return <></>;
    }

    if (isLoading) {
      return <></>;
    }

    if (isValidating) {
      return <></>;
    }

    if (data === undefined) {
      return <></>;
    }

    return data.map((quiz) => (
      <>
      <CustomButton key={quiz} quiz={quiz} setQuiz={setCurrentQuiz} setShowSave={setShowSave} />
      <Divider />
      </>
    ));
  }

  return (
    <Stack
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "15dvw",
        height: "100dvh",
        alignItems: "center",
        backgroundColor: "#dddddd",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minWidth="100%"
        marginTop="2em"
      >
        <Box>
          <Typography
            sx={{ width: "100%", background: "2px black solid" }}
            justifyContent="center"
            variant="h5"
          >
            Saved Quizes
          </Typography>
        </Box>
      </Box>

      <Stack
      >
        {Display()}
      </Stack>

      <Divider />
      <Box sx={{ height: "80%" }} />

      <Button variant="outlined">LOGOUT</Button>
    </Stack>
  );
}
