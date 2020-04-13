export interface UserRightsInterface {
  UTILITAIRE: {
    UTILITAIRE_ACCESSADMIN_RIGHTS: Boolean;
    UTILITAIRE_UPDATE_USER_ROLE: Boolean;
    UTILITAIRE_UPDATE_USER_RIGHT: Boolean;
    UTILITAIRE_CREATE_USER: Boolean;
    UTILITAIRE_CONSULTATION_MESSAGE: Boolean;
  };
  FORUM: {
    FORUM_ACCESSADMIN_RIGHTS: Boolean;
    FORUM_CREATE_SECTION: Boolean;
    FORUM_DELETE_SECTION: Boolean;
    FORUM_CREATE_TOPIC: Boolean;
    FORUM_DELETE_TOPIC: Boolean;
    FORUM_CREATE_MESSAGE: Boolean;
    FORUM_MODERATE_MESSAGE: Boolean;
  };
  CHALLENGE: {
    CHALLENGE_ACCESSADMIN_RIGHTS: Boolean;
    CHALLENGE_CREATE: Boolean;
    CHALLENGE_UPDATE: Boolean;
    CHALLENGE_PARTICIPATION: Boolean;
    CHALLENGE_MODERATE_PARTICIPATION: Boolean;
    CHALLENGE_MODERATE_MESSAGE: Boolean;
  };
  HONORED_BEATMAKER: {
    HONORED_BEATMAKER_ACCESSADMIN_RIGHTS: Boolean;
    HONORED_BEATMAKER_UPDATE_CURRENT: Boolean;
    HONORED_BEATMAKER_UPDATE_CONTENT: Boolean;
  };
  /*Initialise l'utilisateur de base*/
}
