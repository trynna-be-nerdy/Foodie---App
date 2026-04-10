/**
 * Content Moderation Service
 * Simple profanity and hate speech detection for user-generated content
 */
export interface ModerationResult {
    isFlagged: boolean;
    flagReasons: string[];
    toxicityScore: number;
    cleanedContent: string;
}
/**
 * Analyze text content for inappropriate content
 */
export declare function moderateContent(text: string): ModerationResult;
/**
 * Check if content should be auto-rejected (severe violations)
 */
export declare function shouldAutoReject(result: ModerationResult): boolean;
/**
 * Check if content should be auto-approved (no issues)
 */
export declare function shouldAutoApprove(result: ModerationResult): boolean;
/**
 * Quick check if content contains any flagged content
 */
export declare function containsFlaggedContent(text: string): boolean;
//# sourceMappingURL=moderation.service.d.ts.map