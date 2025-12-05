import { TaskPriority, TaskStatus } from "../models/Task";
import * as chrono from "chrono-node";
import nlp from "compromise";

export interface ParsedVoiceTask {
    transcript: string;
    title: string;
    dueDate: Date | null;
    priority: TaskPriority;
    status: TaskStatus;
}

const detectPriority = (text: string): TaskPriority => {
    const t = text.toLowerCase();
    if (t.includes("critical")) return "CRITICAL";
    if (
        t.includes("urgent") ||
        t.includes("high priority") ||
        t.includes("high-priority")
    )
        return "HIGH";
    if (
        t.includes("low priority") ||
        t.includes("low-priority") ||
        t.includes("low")
    )
        return "LOW";
    return "MEDIUM";
};

const detectStatus = (text: string): TaskStatus => {
    const t = text.toLowerCase();
    if (t.includes("in progress") || t.includes("working on"))
        return "IN_PROGRESS";
    if (t.includes("done") || t.includes("completed") || t.includes("finished"))
        return "DONE";
    return "TODO";
};

const extractDueDate = (text: string): Date | null => {
    if (!text) return null;

    // 1. Try direct Chrono parse
    let result = chrono?.parseDate(text, new Date(), { forwardDate: true });
    if (result) return result;

    // 2. PRECISE DATE REGEX EXTRACTION (25th of November, 25 November, 25th November)
    const dateRegex =
        /(\d{1,2}(st|nd|rd|th)?\s+(of\s+)?(january|february|march|april|may|june|july|august|september|october|november|december))/i;

    const match = text.match(dateRegex);

    if (match) {
        const dateStr = match[0]; // e.g. "25th of November"
        const cleanStr = dateStr.replace(/of\s+/i, " "); // Convert "25th of November" → "25th November"
        result = chrono.parseDate(cleanStr, new Date(), { forwardDate: true });
        if (result) return result;
    }

    // 3. No date detected
    return null;
};

const cleanTitle = (text: string): string => {
    // Remove common prefixes like "create a task to", "remind me to", etc.
    if (!text) return "";

    const original = text;

    let t = text.toLowerCase();

    // -----------------------------------
    // 1. Remove noise words (before NLP)
    // -----------------------------------
    t = t.replace(
        /(create( a)?( new)?( task)?( to)? )|(remind me to )|(please )|(i want to )/g,
        ""
    );

    t = t.replace(
        /(status should be|set status to|mark it as|should be (done|completed))/g,
        ""
    );

    t = t.replace(/(high|medium|low|critical|urgent)( priority)?/g, "");

    // Remove date-ish parts (Chrono handles date separately)
    t = t.replace(/\bby\b.*$/, "");
    t = t.replace(/\bdue date.*$/, "");
    t = t.replace(/\bend date.*$/, "");

    // -----------------------------------
    // 2. NLP parsing using compromise
    // -----------------------------------
    const doc = nlp(t);

    // Extract main verb (action)
    const verb = doc.verbs().toInfinitive().out("array")[0];

    // Extract noun phrases
    const objects = doc.nouns().out("array");

    // Build final title
    let title = "";

    if (verb) title += verb + " ";
    if (objects.length) title += objects.join(" ");

    title = title.trim();

    // If NLP fails, fallback to cleaned text
    if (!title) {
        title = t.trim() || original.trim();
    }

    // Capitalize first letter
    return title.charAt(0).toUpperCase() + title.slice(1);
};

export const parseVoiceTask = (transcript: string): ParsedVoiceTask => {
    const priority = detectPriority(transcript);
    const status = detectStatus(transcript);
    const dueDate = extractDueDate(transcript);
    const title = cleanTitle(transcript);

    return { transcript, priority, status, dueDate, title };
};
