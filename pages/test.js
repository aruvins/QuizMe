import { Button, Stack } from "@mui/material";
import { useState } from "react";

export default function test() {
  const [data, setData] = useState(null);
  const handleClick = async () => {
    let response = await fetch("/api/test", {
      method: "GET",
    });
    let jsonData = await response.json();
    console.log(jsonData);
    setData(jsonData);
  };

  return (
    <Stack>
      <Button onClick={handleClick}>CLICK ME</Button>
      {data && JSON.stringify(data)}
    </Stack>
  );
}
