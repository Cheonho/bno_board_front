interface ButtonProps {
  text: string;
  id?: string;
  classNames?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Input({text, id, type, classNames,  onClick}: ButtonProps) {
  return (
    <button 
      type={type ? type : "button"}
      id={id} 
      className={classNames ? classNames : `btn-pr`} 
      onClick={onClick}>
      {text}
    </button>
  )
}