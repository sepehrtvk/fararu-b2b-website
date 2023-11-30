export interface ButtonProps {
  label: string;
  className: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClickHandler?: () => void;
}
