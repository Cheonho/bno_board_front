interface ButtonProps {
  text: string;
  id?: string;
  classNames?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Input({text, id, classNames,  onClick}: ButtonProps) {
  return (
    <button id={id} className={classNames} onClick={onClick}>{text}</button>
  )
}