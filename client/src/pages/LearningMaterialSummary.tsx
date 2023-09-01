import React from "react";
import NavigationBar from "./NavigationBar";

function LearningMaterialSummary(this: any) {
  return (
    <div style={{ fontFamily: "Times New Roman", marginTop: "20px" }}>
      <NavigationBar/>

      <h1 className="mt-48 font-extrabold" style={{ marginTop: "20px" }}>
        <p
          className="flex items-center justify-center space-x-4 text-3xl"
          style={{ marginTop: "20px" }}
        >
          Learning Material Summary
        </p>
      </h1>
      <h2
        className="flex items-center justify-center space-x-4 text-xl font-bold underline decoration-violet-400 underline-offset-8"
        style={{ marginTop: "20px" }}
      >
        What dataset was Text Insights trained on?
      </h2>
      <div style={{ maxWidth: "1000px", margin: "auto", marginTop: "20px" }}>
        <p style={{ marginTop: "10px" }}>
          BERT, an acronym for Bidirectional Encoder Representations from
          Transformers, stands as a Machine Learning (ML) model designed for the
          purpose of natural language processing. Developed in 2018 by experts
          at Google AI Language, BERT serves as a versatile solution to more
          than 11 common language tasks, including tasks like determining
          sentiment in text and identifying named entities.
        </p>
        <p style={{ marginTop: "10px" }}>
          Traditionally, enabling computers to truly 'comprehend' language has
          posed challenges. While computers can gather, store, and read textual
          information, they lack fundamental understanding of language nuances.
        </p>

        <p style={{ marginTop: "10px" }}>
          This led to the emergence of Natural Language Processing (NLP): an
          artificial intelligence field that strives to empower computers to
          read, dissect, interpret, and extract meaning from written and spoken
          language. This discipline combines elements of linguistics,
          statistics, and Machine Learning to aid computers in achieving a level
          of 'comprehension' of human language.
        </p>
      </div>
      <h2
        className="flex items-center justify-center space-x-4 text-xl font-bold underline decoration-violet-400 underline-offset-8 "
        style={{ marginTop: "40px" }}
      >
        How does BERT work?
      </h2>
      <div style={{ maxWidth: "1000px", margin: "auto", marginTop: "20px" }}>
        <p style={{ marginTop: "10px" }}>
          BERT's sustained success can be attributed to a colossal dataset of
          3.3 Billion words.
        </p>
        <p style={{ marginTop: "10px" }}>
          BERT underwent specific training using Wikipedia (around 2.5 billion
          words) and Google's BooksCorpus (approximately 800 million words).
          These extensive repositories of information significantly enriched
          BERT's profound understanding of not only the English language but
          also our global reality! 🚀
        </p>
        <p style={{ marginTop: "10px" }}>
          Training on such an extensive dataset demands considerable time
          investment. BERT's training became feasible owing to the innovative
          Transformer architecture, further accelerated by the utilisation of
          TPUs (Tensor Processing Units)—specialised circuits developed by
          Google explicitly for handling large-scale ML models. BERT's training,
          executed with 64 TPUs, was accomplished within a span of 4 days.
        </p>
        <p style={{ marginTop: "10px" }}>
          It's worth noting that the need for more compact BERT models is
          growing, driven by the intention to incorporate BERT in smaller
          computational contexts like smartphones and personal computers. In
          March 2020, a collection of 23 scaled-down BERT models was introduced.
          DistilBERT, for instance, presents a lighter iteration of BERT that
          operates with a 60% speed boost while retaining over 95% of BERT's
          performance level.
        </p>
        <p style={{ marginTop: "10px" }}>
          If you want to learn more about BERT, here are some links:
        </p>
        <p
          style={{
            marginTop: "10px",
            WebkitTextFillColor: "blue",
            marginLeft: "30px",
          }}
        >
          https://huggingface.co/blog/bert-101#2-how-does-bert-work
        </p>
        <p
          style={{
            marginTop: "10px",
            WebkitTextFillColor: "blue",
            marginLeft: "30px",
          }}
        >
          https://d2l.ai/chapter_natural-language-processing-pretraining/bert-dataset.html
        </p>
      </div>

      {/* <div className="flex justify-center gap-5 p-10">
        <Button variant="active" onClick={goHome}>
           Go Back To Home Page
        </Button>
      </div> */}
    </div>
  );
}

export default LearningMaterialSummary;
