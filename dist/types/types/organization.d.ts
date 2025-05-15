/**
 * Available subscription tiers for an organization.
 */
export type OrganizationPlan = /** Evaluation tier with limited features. */ 'preview' | /** Individual developer tier for testing or hobby projects. */ 'developer' | /** Entry-level tier for small teams or startups. */ 'starter' | /** Scaled tier for growing teams with increased usage. */ 'scale' | /** Enterprise-grade tier with custom SLAs and support. */ 'enterprise';
/** List of all supported organization plans. */
export declare const OrganizationPlans: OrganizationPlan[];
/**
 * Roles that a user can hold within an organization.
 */
export type MembershipRole = 
/** Standard member with read/write access. */
'member' | /** Administrator with full management permissions. */ 'admin';
/** List of all supported membership roles. */
export declare const MembershipRoles: MembershipRole[];
/**
 * Result object for `organization.list()`, representing summary data.
 */
export interface OrganizationListResult {
    /** Organization unique identifier. */
    id: string;
    /** Display name of the organization. */
    name: string;
    /** Brief description of the organization. */
    description: string;
    /** Active subscription plan. */
    plan: OrganizationPlan;
    /** Operational status (e.g., "active", "suspended"). */
    status: string;
    /** Creation timestamp. */
    dateCreated: Date;
    /** Last update timestamp. */
    dateUpdated: Date;
    /**
     * Optional list of membership records for the organization.
     */
    members?: {
        /** Membership record identifier. */
        id: string;
        /** Associated account identifier. */
        accountId: string;
        /** Role assigned to the member. */
        role: MembershipRole;
        /** Snapshot of the parent organization details. */
        organization: {
            id: string;
            name: string;
            description: string;
            plan: OrganizationPlan;
        };
        /** Account metadata for the member. */
        account: {
            id: string;
            email: string;
            verified: boolean;
            dateCreated: Date;
            dateUpdated: Date;
        };
        /** Membership creation timestamp. */
        dateCreated: Date;
        /** Membership update timestamp. */
        dateUpdated: Date;
    }[];
}
/**
 * Detailed result object for `organization.get()`, including relations.
 */
export interface OrganizationResult {
    /** Organization unique identifier. */
    id: string;
    /** Display name of the organization. */
    name: string;
    /** Brief description of the organization. */
    description: string;
    /** Active subscription plan. */
    plan: OrganizationPlan;
    /** Operational status (e.g., "active", "suspended"). */
    status: string;
    /** Creation timestamp. */
    dateCreated: Date;
    /** Last update timestamp. */
    dateUpdated: Date;
    /** Full list of membership records with account info. */
    members: {
        /** Parent organization snapshot. */
        organization: {
            id: string;
            name: string;
            description: string;
            plan: OrganizationPlan;
        };
        /** Membership record identifier. */
        id: string;
        /** Membership creation timestamp. */
        dateCreated: Date;
        /** Membership update timestamp. */
        dateUpdated: Date;
        /** Associated account identifier. */
        accountId: string;
        /** Role assigned to the member. */
        role: MembershipRole;
        /** Core account details for the member. */
        account: {
            id: string;
            name: string;
            email: string;
        };
    }[];
    /** Collections owned by the organization. */
    collections: {
        /** Collection unique identifier. */
        id: string;
        /** Collection name. */
        name: string;
        /** Creation timestamp. */
        dateCreated: Date;
        /** Last update timestamp. */
        dateUpdated: Date;
    }[];
}
/**
 * Payload for inviting or updating a member in an organization.
 */
export interface OrganizationMemberRequest {
    /** UUID of the user or email address for invitation. */
    id: string;
    /** Role to assign: "admin" or "member". */
    role: MembershipRole;
}
