"use strict";
/**
 * Content Moderation Service
 * Simple profanity and hate speech detection for user-generated content
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderateContent = moderateContent;
exports.shouldAutoReject = shouldAutoReject;
exports.shouldAutoApprove = shouldAutoApprove;
exports.containsFlaggedContent = containsFlaggedContent;
// Basic profanity word list (can be extended)
const PROFANITY_LIST = new Set([
    'fuck', 'shit', 'damn', 'bitch', 'ass', 'bastard', 'crap',
    'dick', 'piss', 'cock', 'pussy', 'cunt', 'whore', 'slut',
    // Add more words as needed
]);
// Hate speech patterns
const HATE_SPEECH_PATTERNS = [
    /\b(kill|murder|die)\s+(all\s+)?(jews?|blacks?|whites?|asians?|muslims?|christians?)/i,
    /\b(hate|despise)\s+(all\s+)?(jews?|blacks?|whites?|asians?|muslims?|christians?|gays?|lesbians?)/i,
    /\b(n[i1]gg[ae3]r?s?)\b/i,
    /\b(f[a4]gg?[o0]t?s?)\b/i,
    /\b(k[i1]k[e3]s?)\b/i,
    /\b(ch[i1]nk?s?)\b/i,
    /\b(sp[i1]c?s?)\b/i,
    /\b(w[e3]tb[a4]cks?)\b/i,
];
// Spam patterns
const SPAM_PATTERNS = [
    /(.)\1{5,}/i, // Repeated characters (e.g., "aaaaaaa")
    /\b(buy|sell|order|discount|free|click|subscribe|winner|congratulations|prize)\b.*\b(now|today|here|link)\b/i,
    /\b(http[s]?:\/\/|www\.)\S+/gi, // URLs (optional - might want to allow some)
];
/**
 * Analyze text content for inappropriate content
 */
function moderateContent(text) {
    const flagReasons = [];
    let toxicityScore = 0;
    let cleanedContent = text;
    // Normalize text for checking
    const normalizedText = text.toLowerCase();
    const words = normalizedText.split(/\s+/);
    // Check for profanity
    let profanityCount = 0;
    words.forEach((word) => {
        // Remove punctuation for matching
        const cleanWord = word.replace(/[^a-z]/g, '');
        if (PROFANITY_LIST.has(cleanWord)) {
            profanityCount++;
            // Mask profanity in cleaned content
            const regex = new RegExp(`\\b${cleanWord}\\b`, 'gi');
            cleanedContent = cleanedContent.replace(regex, '*'.repeat(cleanWord.length));
        }
    });
    if (profanityCount > 0) {
        flagReasons.push(`Profanity detected (${profanityCount} word${profanityCount > 1 ? 's' : ''})`);
        toxicityScore += Math.min(profanityCount * 0.15, 0.5);
    }
    // Check for hate speech
    for (const pattern of HATE_SPEECH_PATTERNS) {
        if (pattern.test(text)) {
            flagReasons.push('Potential hate speech detected');
            toxicityScore += 0.8;
            break;
        }
    }
    // Check for spam patterns
    for (const pattern of SPAM_PATTERNS) {
        if (pattern.test(text)) {
            flagReasons.push('Potential spam detected');
            toxicityScore += 0.3;
            break;
        }
    }
    // Cap toxicity score at 1
    toxicityScore = Math.min(toxicityScore, 1);
    return {
        isFlagged: toxicityScore >= 0.3,
        flagReasons,
        toxicityScore,
        cleanedContent,
    };
}
/**
 * Check if content should be auto-rejected (severe violations)
 */
function shouldAutoReject(result) {
    return result.toxicityScore >= 0.8;
}
/**
 * Check if content should be auto-approved (no issues)
 */
function shouldAutoApprove(result) {
    return result.toxicityScore === 0;
}
/**
 * Quick check if content contains any flagged content
 */
function containsFlaggedContent(text) {
    return moderateContent(text).isFlagged;
}
//# sourceMappingURL=moderation.service.js.map