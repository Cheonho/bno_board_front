interface InputProps {
    type: string;
    id?: string;
    classNames?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({type, id, classNames, value, onChange}: InputProps) {
  return (
    <div>
      <input type={type} id={id} className={classNames} value={value} onChange={onChange} />
    </div>
  )
}
