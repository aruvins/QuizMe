import { Button } from "@mui/material";

export default function CustomButton({setQuiz, quiz, setShowSave}){

    const handleClick = () =>{
        setQuiz(quiz);
        setShowSave(false);
    }

    return (
        <Button onClick={handleClick}>
            {quiz.name}
        </Button>
    );
}