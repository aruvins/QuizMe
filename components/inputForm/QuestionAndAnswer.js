import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

export default function index({ question, answer, setWikiText }) {
  const handleMouseUp = () => {
    setWikiText(window.getSelection().toString());
  };

  return (
    <Accordion>
      <AccordionSummary
        sx={{
          userSelect: "text",
        }}
      >
        <Typography>{question}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <div onMouseUp={handleMouseUp}>
          <Typography>{answer}</Typography>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
