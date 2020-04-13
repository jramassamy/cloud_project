import { ChallengeController } from "../Controllers/challengeController";
export class ChallengeRoute {
    public challengeAPIController: ChallengeController = new ChallengeController();
    public routes(app): void {
        app.route('/challengeAPI/createChallenge').post(this.challengeAPIController.createChallenge);
        app.route('/challengeAPI/updateChallenge').post(this.challengeAPIController.updateChallenge);
        app.route('/challengeAPI/getNextChallenge').get(this.challengeAPIController.getNextChallenge);
        app.route('/challengeAPI/getCurrentChallenge').get(this.challengeAPIController.getCurrentChallenge);
        app.route('/challengeAPI/addParticipant').post(this.challengeAPIController.addParticipant);
        app.route('/challengeAPI/getAllChallenge').get(this.challengeAPIController.getAllChallenge);
        app.route('/challengeAPI/updateMusicState').post(this.challengeAPIController.updateMusicState);
        app.route('/challengeAPI/postVote').post(this.challengeAPIController.postVote);
        app.route('/challengeAPI/getSoundCloudMusic').get(this.challengeAPIController.getSoundCloudMusic);
        app.route('/challengeAPI/getAllFinishedChallenge').get(this.challengeAPIController.getAllFinishedChallenge);
        app.route('/challengeAPI/getLastFinishedChallenge').get(this.challengeAPIController.getLastFinishedChallenge);
    }
}