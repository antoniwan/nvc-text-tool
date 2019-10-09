import React, { useState, useEffect } from "react";
import uuid from "uuid/v1";
import Head from "next/head";
import styled from "styled-components";

const StyledHome = styled.div`
  padding: 15px;

  textarea {
    background: pink;
    height: 100px;
    max-width: 100%;
    border: 2px solid black;
    border-radius: 5px;
    padding: 2rem;
  }

  .lp {
    display: flex;
  }
`;

const defaultEditorText = `Type something here and press 'Analyze' when you are ready to go.`;

const Home = () => {
  const extractWordsFromText = text => {
    if (text === "") return [];
    return text.match(/("[^"]+"|[^"\s]+)/g);
  };

  const extractSentencesFromText = text => {
    if (text === "") return [];
    return text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
  };

  const [editorText, setEditorText] = useState(defaultEditorText);
  const [words, setWords] = useState(extractWordsFromText(defaultEditorText));
  const [sentences, setSentences] = useState(
    extractSentencesFromText(defaultEditorText)
  );
  const handleEditorFocus = () => {
    if (editorText !== defaultEditorText) return;
    setEditorText("");
    setWords([]);
    setSentences([]);
  };

  const handleEditorChange = e => {
    if (editorText === defaultEditorText) return;
    console.log("test");
    setEditorText(e.target.value);
  };

  useEffect(() => {
    setWords(extractWordsFromText(editorText));
    setSentences(extractSentencesFromText(editorText));
  }, [editorText]);
  return (
    <StyledHome>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Language Processing Tool</h1>

      <textarea
        className="editable-content"
        onFocus={handleEditorFocus}
        onChange={handleEditorChange}
        value={editorText}
      />

      <h3>Caveats</h3>
      <ul>
        <li>Does not support emoji.</li>
      </ul>

      <h2>Language Processing</h2>

      <div className="lp">
        <div>
          <h2>Words</h2>
          <ol>{!!words && words.map(w => <li key={uuid()}>{w}</li>)}</ol>
        </div>
        <div>
          <h2>Sentences</h2>
          <ol>
            {!!sentences && sentences.map(s => <li key={uuid()}>{s}</li>)}
          </ol>
        </div>
      </div>
    </StyledHome>
  );
};

export default Home;
