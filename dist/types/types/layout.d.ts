/**
 * Supported parsing strategies for different document formats.
 */
export type LayoutType = /** Standard paginated document (e.g., PDF, Word). */ 'document' | /** Single-image input (e.g., JPG, PNG). */ 'photo' | /** Audio file input for transcription or segmentation. */ 'audio' | /** Video file input for frame and audio-layout processing. */ 'video';
/**
 * [x, y, width, height] in pixels relative to the top-left corner of the page or image.
 */
export type LayoutPosition = [number, number, number, number];
/**
 * Base output for a parsed layout element.
 */
export interface DocumentLayoutOutput {
    /** Bounding box of the element. */
    position: LayoutPosition;
    /**
     * Element kind:
     * - `title`
     * - `subtitle`
     * - `list`
     * - `text`
     * - `table`
     * - `image`
     * - `csv`
     * - or any custom tag
     */
    type: 'title' | 'subtitle' | 'list' | 'text' | 'table' | 'image' | 'csv' | string;
    /** Raw text or data content of the element. */
    content: string;
}
/**
 * Parsed layout element with ordering and pagination metadata.
 */
export interface DocumentLayout extends DocumentLayoutOutput {
    /** Zero-based index of this element in the document flow. */
    index: number;
    /** One-based page number where this element appears. */
    page: number;
}
/**
 * Parsed segment from an audio file.
 */
export interface AudioLayout {
    /** Zero-based segment index. */
    index: number;
    /** Start time as ISO 8601 or `HH:MM:SS` format. */
    start: string;
    /** End time as ISO 8601 or `HH:MM:SS` format. */
    end: string;
    /** Speaker or narrator identifier. */
    narrator: string;
    /** Description or non-verbal context for the segment. */
    description: string;
    /** Transcribed text content of the audio segment. */
    content: string;
}
/**
 * Parsed region from a single image.
 */
export interface PhotoLayout {
    /** Bounding box of the region. */
    position: LayoutPosition;
    /** Description of the visual content (objects or scene). */
    description: string;
    /** Optional detected type or label for the region. */
    type: string;
}
/**
 * Parsed segment from a video file.
 */
export interface VideoLayout {
    /** Zero-based segment index. */
    index: number;
    /** Start time as ISO 8601 or `HH:MM:SS` format. */
    start: string;
    /** End time as ISO 8601 or `HH:MM:SS` format. */
    end: string;
    /** Transcribed or extracted audio content. */
    audio: string;
    /** Narration or descriptive text. */
    narration: string;
    /** Speaker or narrator identifier. */
    narrator: string;
    /** Visual regions detected within the video frame. */
    objects: PhotoLayout[];
}
/**
 * Layout for discrete feature annotations (e.g., points, key values).
 */
export interface FeatureLayout {
    /** Array of coordinates or numerical values relevant to the feature. */
    position: number[];
    /** Label identifying the feature. */
    label: string;
    /** Description or metadata about the feature. */
    description: string;
}
