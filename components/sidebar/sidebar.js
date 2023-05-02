import {
  Box,
  Button,
  Divider,
  Stack,
  Typography
} from "@mui/material";

import useSWR from "swr";

import CustomButton from "./customButton";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

const fetcher = (url, userEmail) => {
  let data = fetch(url, {
    method: "POST",
    body: JSON.stringify({ userEmail: userEmail }),
  }).then((r) => r.json());
  return data;
};

export default function Sidebar({
  setCurrentQuiz,
  userEmail,
  setShowSave,
  mutateIt
}) {

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    userEmail ? "/api/retrieve-quiz" : null,
    (url) => fetcher(url, userEmail)
  );

  useEffect(() => {
    mutate()
  }, [mutateIt])

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
        <CustomButton
          key={quiz}
          quiz={quiz}
          setQuiz={setCurrentQuiz}
          setShowSave={setShowSave}
        />
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
        marginBottom="2em"
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

      <Stack>{Display()}</Stack>

      <Box sx={{ height: "100%" }} />

      <Button
        sx={{marginBottom: '2em'}}
        variant="outlined"
        onClick={() => signOut({callbackUrl: `${window.location.origin}/login`})}>
        LOGOUT
      </Button>
    </Stack>
  );
}
