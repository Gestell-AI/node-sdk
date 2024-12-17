export type LayoutPosition = [number, number, number, number];
export interface DocumentLayoutOutput {
    position: LayoutPosition;
    type: 'title' | 'subtitle' | 'list' | 'text' | 'table' | 'image' | string;
    content: string;
}
export interface DocumentLayout extends DocumentLayoutOutput {
    index: number;
    page: number;
}
export interface AudioLayout {
    index: number;
    start: string;
    end: string;
    narrator: string;
    description: string;
    content: string;
}
export interface PhotoLayout {
    position: LayoutPosition;
    type: string;
    description: string;
}
export interface VideoLayout {
    index: number;
    start: string;
    end: string;
    audio: string;
    narration: string;
    narrator: string;
    objects: PhotoLayout[];
}
export type LayoutType = 'document' | 'photo' | 'audio' | 'video';
export interface FeatureLayout {
    position: number[];
    label: string;
    description: string;
}
//# sourceMappingURL=layout.d.ts.map