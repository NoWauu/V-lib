import React from 'react';

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return <h1 className="text-4xl font-bold text-center my-8 mt-12">{text}</h1>;
};

export default Title;