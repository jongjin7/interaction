import React, { useState } from "react";
import { Button } from "@headlessui/react";

const Count = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="card">
      <Button
        onClick={() => setCount((count) => count + 1)}
        className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
      >
        count is {count}
      </Button>
    </div>
  );
};

export default Count;
