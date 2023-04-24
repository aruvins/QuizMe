import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

export default function index({question, answer}) {


  return (

        <Accordion>
            <AccordionSummary
            sx={{
                userSelect: 'text'
            }}
            >
                <Typography>
                    {question}
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                <Typography>
                    {answer}
                </Typography>
            </AccordionDetails>
        </Accordion>
  );
}
