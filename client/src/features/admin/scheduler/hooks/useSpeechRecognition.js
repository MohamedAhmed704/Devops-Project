import { useRef, useState } from "react";

export function useSpeechRecognition(onResult) {
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  const toggleListening = (lang) => {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (e) => {
      let text = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          text += e.results[i][0].transcript;
        }
      }
      if (text) onResult(text);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return { isListening, toggleListening };
}
