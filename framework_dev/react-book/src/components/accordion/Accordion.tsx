/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import {
  accordionCardStyle,
  accordionContentStyle,
  openAccordionContentStyle,
} from "./Accordion.styles";

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div css={accordionCardStyle}>
      <div onClick={toggleAccordion}>
        <h3>{title}</h3>
      </div>

      <div css={[accordionContentStyle, isOpen && openAccordionContentStyle]}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
