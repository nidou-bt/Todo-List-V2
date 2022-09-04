import { ButtonHTMLAttributes } from 'react';

type IButton = ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: IButton): JSX.Element {
  return(
    <button {...props}>
      {props.children}
    </button>
  );
}

export default Button;
