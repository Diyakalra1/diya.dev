import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return (
    // <div className="w-full flex justify-center border-4 border-red-500">
      <div className="w-full max-w-[1320px] m-auto  ">
        {children}
      </div>
    
  );
}