import { useState } from 'react';
import styled from 'styled-components';
import StructuredData, { FAQItem } from './StructuredData';

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = 'Frequently Asked Questions' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <StructuredData type="FAQPage" data={items} />
      <Wrapper>
        {title && <Title>{title}</Title>}
        <FAQList>
          {items.map((item, index) => (
            <FAQItem key={index}>
              <QuestionButton
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <QuestionText>{item.question}</QuestionText>
                <Icon aria-hidden="true">{openIndex === index ? '−' : '+'}</Icon>
              </QuestionButton>
              {openIndex === index && (
                <Answer>
                  <AnswerText>{item.answer}</AnswerText>
                </Answer>
              )}
            </FAQItem>
          ))}
        </FAQList>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  border: 1px solid rgb(var(--border));
  border-radius: 0.5rem;
  overflow: hidden;
`;

const QuestionButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background: rgb(var(--cardBackground));
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;

  &:hover {
    background: rgba(var(--primary), 0.05);
  }

  &[aria-expanded='true'] {
    background: rgba(var(--primary), 0.1);
  }
`;

const QuestionText = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  color: rgb(var(--text));
  flex: 1;
`;

const Icon = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: rgb(var(--primary));
  margin-left: 2rem;
`;

const Answer = styled.div`
  padding: 0 2rem 2rem 2rem;
  background: rgb(var(--cardBackground));
`;

const AnswerText = styled.p`
  font-size: 1.5rem;
  line-height: 1.8;
  color: rgb(var(--text));
  margin: 0;
`;
