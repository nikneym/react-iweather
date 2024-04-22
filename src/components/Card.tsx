import classNames from "classnames";
import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

export default function Card({ children, className }: Props) {
  return (
    <div
      className={classNames(
        "relative rounded-xl overflow-hidden bg-gray-800",
        className
      )}
    >
      {children}
    </div>
  );
}
