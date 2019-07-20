import React, { useEffect, useState } from "react";
import firebase from "./auth/firebase";
import "@firebase/firestore";
import "@firebase/storage";
import { Statement } from "./domain/entity/Statement";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";

async function fff(doc: QueryDocumentSnapshot) {
  const data = doc.data() as Statement;
  data.id = doc.id;
  data.url = await getUrl(data.audioLink);
  return data;
}

async function getSentences() {
  const db = firebase.firestore();
  const sentences = db.collection("sentences");
  const snapshots = await sentences.get();
  let reads: Promise<Statement>[] = [];
  snapshots.forEach(doc => {
    reads.push(fff(doc));
  });
  return await Promise.all(reads);
}

async function getUrl(url: string) {
  const ref = firebase.storage().refFromURL(url);
  const audioURL = await ref.getDownloadURL();
  return audioURL as string;
}

const Sentences: React.FC = () => {
  const [sentences, setSentences] = useState<Statement[]>([]);

  const fetchMessages = async () => {
    setSentences(await getSentences());
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const sentenceItems = sentences.map(sentence => {
    return (
      <tr key={sentence.id}>
        <td>{sentence.id}</td>
        <td>{sentence.originalText}</td>
        <td>{sentence.pinyin}</td>
        <td>{sentence.translatedText}</td>
        <td>
          <div>
            <audio controls>
              <source src={sentence.url} type="audio/mpeg" />
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="Sentences">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>中国語</th>
            <th>ピンイン</th>
            <th>日本語</th>
            <th>音声</th>
          </tr>
        </thead>
        <tbody>{sentenceItems}</tbody>
      </table>
    </div>
  );
};

export default Sentences;
