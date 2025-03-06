import {useState} from "react";

const useInput = (initialValue: string, func?:Function[]) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
    if(func?.length !== 0) {
      func?.map((_,index) => {
        func[index]()
      })
    }
  };

  return [inputValue, handleChange];
};

export default useInput;