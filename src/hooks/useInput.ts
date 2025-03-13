import {Dispatch, SetStateAction, SyntheticEvent, useState} from "react";

const useInput = <T>(initialValue: any, func?:any):[
  T,
  (e: SyntheticEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<T>>
] => {
  const [inputValue, setInputValue] = useState<T>(initialValue);

  const handleChange = (e: any) => {
    if (typeof func === 'function') {
      const value = func(e.target.value)
      setInputValue(value)
    } else {
      setInputValue(e.target.value);
    }
  };

  return [inputValue, handleChange, setInputValue];
};

export default useInput;