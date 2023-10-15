import classNames from "classnames";

import styles from "./index.module.css";

interface ChipProps {
  label: string;
  filled: boolean;
  onCick: () => void;
}

export const Chip: React.FC<ChipProps> = (props) => {
  const className = classNames(styles.chip, props.filled && styles.filled);

  return (
    <div className={className} onClick={props.onCick}>
      {props.label}
    </div>
  );
};
