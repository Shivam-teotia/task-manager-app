import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { parseVoice } from "../redux/tasks/tasksThunks";

declare global {
    interface Window {
        SpeechRecognition?: unknown;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        webkitSpeechRecognition?: any;
    }
}

export default function VoiceInput() {
    const dispatch = useAppDispatch();
    const { voiceParsing } = useAppSelector((s) => s.tasks);
    const [listening, setListening] = useState(false);
    const [supported, setSupported] = useState(true);

    useEffect(() => {
        if (
            !(
                "webkitSpeechRecognition" in window ||
                "SpeechRecognition" in window
            )
        ) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSupported(false);
        }
    }, []);

    const handleClick = () => {
        if (!supported) return;

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setListening(true);
        recognition.onerror = () => setListening(false);
        recognition.onend = () => setListening(false);
        recognition.onresult = (event: {
            results: { transcript: string }[][];
        }) => {
            const transcript = event.results[0][0].transcript;
            dispatch(parseVoice(transcript));
        };

        recognition.start();
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={!supported || voiceParsing}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs ${
                listening
                    ? "border-rose-400 bg-rose-500/10 text-rose-300"
                    : "border-slate-600 hover:bg-slate-800"
            }`}
        >
            <span className="inline-block w-2 h-2 rounded-full bg-rose-500" />
            {supported
                ? listening
                    ? "Listening..."
                    : voiceParsing
                    ? "Parsing..."
                    : "Add via voice"
                : "Voice not supported"}
        </button>
    );
}
