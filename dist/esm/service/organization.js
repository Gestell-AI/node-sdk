"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrganizationService;
const get_1 = require("../organization/get");
const list_1 = require("../organization/list");
const add_1 = require("../organization/members/add");
const remove_1 = require("../organization/members/remove");
const update_1 = require("../organization/update");
const client_1 = __importDefault(require("../service/client"));
/**
 * Factory that returns helpers scoped to **organizations**.
 *
 * @param client - Global Gestell SDK configuration.
 * @returns Strongly typed helpers implementing {@link OrganizationServiceApi}.
 */
function OrganizationService(client = {}) {
    const options = (0, client_1.default)(client);
    async function get(organizationId) {
        return (0, get_1.getOrganization)({ ...options, id: organizationId });
    }
    async function list(payload) {
        return (0, list_1.getOrganizations)({ ...options, ...payload });
    }
    async function update(payload) {
        return (0, update_1.updateOrganization)({ ...options, ...payload });
    }
    async function addMembersFn(payload) {
        return (0, add_1.addMembers)({ ...options, ...payload });
    }
    async function removeMembersFn(payload) {
        return (0, remove_1.removeMembers)({ ...options, ...payload });
    }
    return {
        get,
        list,
        update,
        addMembers: addMembersFn,
        removeMembers: removeMembersFn
    };
}
