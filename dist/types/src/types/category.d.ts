export type CategoryType = 'content' | 'concepts' | 'features' | 'table';
export interface Category {
    id: string;
    collectionId: string;
    name: string;
    type: CategoryType;
    instructions: string;
    strategy: string;
    dateCreated: string;
    dateUpdated: string;
}
export interface CreateCategoryPayload {
    name: string;
    type: CategoryType;
    instructions: string;
}
