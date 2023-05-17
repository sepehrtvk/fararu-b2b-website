export interface IconProps {
  name: string;
  color: string;
  size: 1 | 2 | 3 | 4 | 5 | 6;
  margin?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  style?: React.CSSProperties;
}

const Icon = ({ name, size, color, style, margin }: IconProps) => {
  return (
    <div className={`mx-${margin}`}>
      <i
        className={`bi bi-${name} text-${color} fs-${size} d-flex`}
        style={style}></i>
    </div>
  );
};

export default Icon;
