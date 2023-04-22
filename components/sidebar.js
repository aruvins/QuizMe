import {
  Stack,
  Container,
  Typography,
  Divider,
  Button,
  Box,
} from "@mui/material";

export default function Sidebar() {
  return (
    <Stack
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "15dvw",
        height: "100dvh",
        alignItems: "center",
        borderRight: "2px #d2b48c solid"
      }}
    >
      <Container sx={{ background: "1px black solid" }}>
        <Typography
          sx={{ width: "100%", background: "2px black solid" }}
          justifyContent="center"
          level="h4"
        >
          Saved Quizes
        </Typography>
      </Container>

      <Divider />
      <Box sx={{ height: "80%" }} />
      <Button >
        <Typography color="black" level="h5">
          Add New Quiz
        </Typography>
      </Button>

      <Button>
        <Typography color="black" level="h5">
          Logout
        </Typography>
      </Button>
    </Stack>
  );
}
