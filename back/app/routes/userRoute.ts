import { UserController } from "../Controllers/userController";
export class UserRoute {
    public userAPIController: UserController = new UserController();
    public routes(app): void {
        app.route('/userAPI/register').post(this.userAPIController.registerUser);
        app.route('/userAPI/login').post(this.userAPIController.checkLogin);
        app.route('/userAPI/rights').get(this.userAPIController.getUserRights);
        app.route('/userAPI/update').post(this.userAPIController.update);
        app.route('/userAPI/addMusic').post(this.userAPIController.addMusic);
        app.route('/userAPI/loadUserByTag').get(this.userAPIController.loadUserByTag);
    }
}