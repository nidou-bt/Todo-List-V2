interface IButton {
  children: string,
  type: "button" | "submit" | "reset" | undefined,
  className?: string,
  disabled?: boolean,
  onClick?: () => void,
}

function Button({ children, type, disabled, className, onClick }: IButton): JSX.Element {
  return(
    <button type={type} className={className ? className : undefined} disabled={disabled || false} onClick={onClick || undefined} >
      {children}
    </button>
  );
}

export default Button;
