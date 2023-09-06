import React from "react";
import NavigationBar from "./NavigationBar";

function LearningMaterialSummary(this: any) {
  return (
    <div className="mt-10">
      <NavigationBar />

      <h1 className="mt-20 font-extrabold">
        <p className="flex items-center justify-center space-x-4 text-3xl mt-10">
          Learning Material Summary
        </p>
      </h1>
      <h2 className="mt-10 flex items-center justify-center space-x-4 text-xl font-bold underline decoration-violet-400 underline-offset-8">
        What dataset was Text Insights trained on?
      </h2>
      <div className="m-auto mt-10 max-w-screen-lg">
        <p className="mt-8">
          BERT, an acronym for Bidirectional Encoder Representations from
          Transformers, stands as a Machine Learning (ML) model designed for the
          purpose of natural language processing. Developed in 2018 by experts
          at Google AI Language, BERT serves as a versatile solution to more
          than 11 common language tasks, including tasks like determining
          sentiment in text and identifying named entities.
        </p>
        <p className="mt-8">
          Traditionally, enabling computers to truly 'comprehend' language has
          posed challenges. While computers can gather, store, and read textual
          information, they lack fundamental understanding of language nuances.
        </p>

        <p className="mt-8">
          This led to the emergence of Natural Language Processing (NLP): an
          artificial intelligence field that strives to empower computers to
          read, dissect, interpret, and extract meaning from written and spoken
          language. This discipline combines elements of linguistics,
          statistics, and Machine Learning to aid computers in achieving a level
          of 'comprehension' of human language.
        </p>
      </div>
      <h2 className="flex items-center justify-center space-x-4 text-xl font-bold underline decoration-violet-400 underline-offset-8 mt-20">
        How does BERT work?
      </h2>
      <div className="m-auto mt-10 max-w-screen-lg">
        <p className="mt-8">
          BERT's sustained success can be attributed to a colossal dataset of
          3.3 Billion words.
        </p>
        <p className="mt-8">
          BERT underwent specific training using Wikipedia (around 2.5 billion
          words) and Google's BooksCorpus (approximately 800 million words).
          These extensive repositories of information significantly enriched
          BERT's profound understanding of not only the English language but
          also our global reality! 🚀
        </p>
        <p className="mt-8">
          Training on such an extensive dataset demands considerable time
          investment. BERT's training became feasible owing to the innovative
          Transformer architecture, further accelerated by the utilisation of
          TPUs (Tensor Processing Units)—specialised circuits developed by
          Google explicitly for handling large-scale ML models. BERT's training,
          executed with 64 TPUs, was accomplished within a span of 4 days.
        </p>
        <p className="mt-8">
          It's worth noting that the need for more compact BERT models is
          growing, driven by the intention to incorporate BERT in smaller
          computational contexts like smartphones and personal computers. In
          March 2020, a collection of 23 scaled-down BERT models was introduced.
          DistilBERT, for instance, presents a lighter iteration of BERT that
          operates with a 60% speed boost while retaining over 95% of BERT's
          performance level.
        </p>
        <p className="mt-8">
          If you want to learn more about BERT, here are some links:
        </p>
        <p className="mt-8 ml-30 text-blue-600">
          https://huggingface.co/blog/bert-101#2-how-does-bert-work
        </p>
        <p className="mt-5 ml-30 text-blue-600">
          https://d2l.ai/chapter_natural-language-processing-pretraining/bert-dataset.html
        </p>
      </div>

      <div className="mt-20"></div>
    </div>
  );
}

export default LearningMaterialSummary;