import { Job } from 'types/job';
import { AudioLayout, DocumentLayout, PhotoLayout, VideoLayout } from 'types/layout';
export interface Document {
    id: string;
    collectionId: string;
    path: string;
    name: string;
    type: string;
    layoutType: string;
    layoutNodes: number;
    instructions: string;
    job?: Job;
    layout?: DocumentLayout[] | PhotoLayout[] | VideoLayout[] | AudioLayout[];
    dateCreated: string;
    dateUpdated: string;
}
