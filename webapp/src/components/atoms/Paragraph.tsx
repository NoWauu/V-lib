import React from 'react';

interface ParagraphProps {
  text: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ text }) => {
  return <p className="text-lg text-center my-2">{text}</p>;
};

export default Paragraph;