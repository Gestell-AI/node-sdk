import { GestellOptions } from '@gestell/index'
import {
  getOrganization,
  GetOrganizationResponse
} from '@gestell/organization/get'
import {
  getOrganizations,
  GetOrganizationsRequest,
  GetOrganizationsResponse
} from '@gestell/organization/list'
import {
  addMembers,
  AddMembersRequest,
  AddMembersResponse
} from '@gestell/organization/members/add'
import {
  removeMembers,
  RemoveMembersRequest,
  RemoveMembersResponse
} from '@gestell/organization/members/remove'
import {
  updateOrganization,
  UpdateOrganizationRequest,
  UpdateOrganizationResponse
} from '@gestell/organization/update'
import SetupClientOptions from '@gestell/service/client'

/**
 * The **organization services** for the Gestell SDK.
 *
 * @remarks
 * All helpers resolve to a strongly typed `{ status, message, … }` payload.
 * If the SDK is initialised with `debug: true`, verbose request / response logs
 * will be emitted to the console to aid troubleshooting.
 *
 * @example
 * ```ts
 * import Gestell from '@gestell/sdk'
 *
 * const gestell = new Gestell()
 * const { result } = await gestell.organization.get({
 *   organizationId: 'org_123'
 * })
 * console.log(result?.name)
 * ```
 *
 * @see https://gestell.ai/docs/reference#organization
 */
export interface OrganizationServiceApi {
  /**
   * Retrieves the details of an organization by its ID.
   *
   * @param payload - Organization request parameters including:
   * - `id`: The unique identifier of the organization to retrieve.
   * @returns A promise that resolves to the organization details, including:
   * - `result`: The organization record or null if not found.
   * - `status`: The request status.
   * - `message`: An optional explanatory message.
   */
  get(organizationId: string): Promise<GetOrganizationResponse>

  /**
   * Lists organizations with optional filtering and pagination.
   *
   * @param payload - Organization listing parameters including:
   * - `search?`: Optional search term to filter organizations by name.
   * - `take?`: Maximum number of organizations to return (default: 10).
   * - `skip?`: Number of organizations to skip for pagination (default: 0).
   * - `extended?`: Whether to include extended organization details (default: false).
   * @returns A promise that resolves to the organizations list response, including:
   * - `result`: Array of organization summary objects.
   * - `status`: The request status.
   * - `message`: An optional explanatory message.
   */
  list(payload?: GetOrganizationsRequest): Promise<GetOrganizationsResponse>

  /**
   * Updates an organization's details.
   *
   * @param payload - Organization update parameters including:
   * - `organizationId`: ID of the organization to update.
   * - `name`: New name for the organization.
   * - `description`: New description for the organization.
   * @returns A promise that resolves to the update response, including:
   * - `status`: The request status.
   * - `message`: An optional explanatory message.
   */
  update(
    payload: UpdateOrganizationRequest
  ): Promise<UpdateOrganizationResponse>

  /**
   * Adds one or more members to the organization.
   *
   * @param payload - Member addition parameters including:
   * - `organizationId`: ID of the organization to add members to.
   * - `members`: Array of member objects to add.
   * @returns A promise that resolves to the addition response, including:
   * - `status`: The request status.
   * - `message`: An optional explanatory message.
   */
  addMembers(payload: AddMembersRequest): Promise<AddMembersResponse>

  /**
   * Removes one or more members from the organization.
   *
   * @param payload - Member removal parameters including:
   * - `organizationId`: ID of the organization to remove members from.
   * - `members`: Array of member IDs to remove.
   * @returns A promise that resolves to the removal response, including:
   * - `status`: The request status.
   * - `message`: An optional explanatory message.
   */
  removeMembers(payload: RemoveMembersRequest): Promise<RemoveMembersResponse>
}

/**
 * Factory that returns helpers scoped to **organizations**.
 *
 * @param client - Global Gestell SDK configuration.
 * @returns Strongly typed helpers implementing {@link OrganizationServiceApi}.
 */
export default function OrganizationService(
  client: GestellOptions = {}
): OrganizationServiceApi {
  const options = SetupClientOptions(client)

  async function get(organizationId: string) {
    return getOrganization({ ...options, id: organizationId })
  }

  async function list(payload?: GetOrganizationsRequest) {
    return getOrganizations({ ...options, ...payload })
  }

  async function update(payload: UpdateOrganizationRequest) {
    return updateOrganization({ ...options, ...payload })
  }

  async function addMembersFn(payload: AddMembersRequest) {
    return addMembers({ ...options, ...payload })
  }

  async function removeMembersFn(payload: RemoveMembersRequest) {
    return removeMembers({ ...options, ...payload })
  }

  return {
    get,
    list,
    update,
    addMembers: addMembersFn,
    removeMembers: removeMembersFn
  }
}
