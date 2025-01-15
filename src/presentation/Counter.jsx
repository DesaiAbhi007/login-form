import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setCount(count);
    alert(`Count is change ${count}`)
  },[count]);

  return (
    <div>
      <Stack p={3}>
        <Typography>Set your number {count}</Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <Button
            variant={`${active ? "contained" : "outlined"}`}
            color="secondary"
            onClick={() => {
              setCount(count + 1);
              setActive(!active);
            }}
          >
            +
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setCount(count - 1);
            }}
            disabled={count === 0}
          >
            -
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default Counter;
