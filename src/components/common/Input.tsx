interface InputProps {
    type: string;
    id?: string;
    classNames?: string;
    value?: string;
    disabled?: boolean;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({type, id, classNames, value, onChange, disabled, placeholder}: InputProps) {
  return (
    <div>
      <input 
        type={type} 
        id={id} 
        className={classNames} 
        value={value} 
        disabled={disabled} 
        placeholder={placeholder}
        onChange={onChange} 
      />
    </div>
  )
}
