import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="flex flex-col items-center justify-center min-h-screen p-4">{children}</div>;
};

export default Container;