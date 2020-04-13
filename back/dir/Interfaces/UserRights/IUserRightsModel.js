"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initRights(_id) {
    return {
        _id: _id,
        UTILITAIRE: {
            UTILITAIRE_ACCESSADMIN_RIGHTS: false,
            UTILITAIRE_UPDATE_USER_ROLE: false,
            UTILITAIRE_UPDATE_USER_RIGHT: false,
            UTILITAIRE_CREATE_USER: false,
            UTILITAIRE_CONSULTATION_MESSAGE: false
        },
        FORUM: {
            FORUM_ACCESSADMIN_RIGHTS: false,
            FORUM_CREATE_SECTION: false,
            FORUM_DELETE_SECTION: false,
            FORUM_CREATE_TOPIC: true,
            FORUM_DELETE_TOPIC: false,
            FORUM_CREATE_MESSAGE: true,
            FORUM_MODERATE_MESSAGE: false
        },
        CHALLENGE: {
            CHALLENGE_ACCESSADMIN_RIGHTS: false,
            CHALLENGE_CREATE: false,
            CHALLENGE_UPDATE: false,
            CHALLENGE_PARTICIPATION: true,
            CHALLENGE_MODERATE_PARTICIPATION: false,
            CHALLENGE_MODERATE_MESSAGE: false
        },
        HONORED_BEATMAKER: {
            HONORED_BEATMAKER_ACCESSADMIN_RIGHTS: false,
            HONORED_BEATMAKER_UPDATE_CURRENT: false,
            HONORED_BEATMAKER_UPDATE_CONTENT: false
        }
    };
}
exports.initRights = initRights;
//# sourceMappingURL=IUserRightsModel.js.map