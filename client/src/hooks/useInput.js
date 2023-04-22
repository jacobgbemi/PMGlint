import useLocalStorage from "./useLocalStorage";
// import { useState } from "react";

const useInput = (key, initValue) => {
    const [value, setValue] = useLocalStorage(key, initValue);
    // const [value, setValue] = useSate(initValue);

    const reset = () => setValue(initValue);

    const attributeObj = {
        value,
        onChange: (e) => setValue(e.target.value)
    }

    return [value, reset, attributeObj];
}

export default useInput 