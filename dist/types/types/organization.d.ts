import { Collection } from '../types/collection';
export type MembershipType = 'member' | 'admin';
export interface Member {
    id: string;
    accountId: string;
    organizationId: string;
    role: MembershipType;
    dateCreated: string;
    dateUpdated: string;
    account: {
        name: string;
        email: string;
    };
}
export interface Organization {
    id: string;
    name: string;
    description: string;
    members?: Member[];
    collections?: Collection[];
    dateCreated: Date;
    dateUpdated: Date;
}
export interface OrganizationMemberPayload {
    id: string;
    role: MembershipType;
}
