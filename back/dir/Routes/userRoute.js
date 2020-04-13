"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../Controllers/userController");
class UserRoute {
    constructor() {
        this.userAPIController = new userController_1.UserController();
    }
    routes(app) {
        app.route('/userAPI/register').post(this.userAPIController.registerUser);
        app.route('/userAPI/login').post(this.userAPIController.checkLogin);
        app.route('/userAPI/rights').get(this.userAPIController.getUserRights);
        app.route('/userAPI/update').post(this.userAPIController.update);
        app.route('/userAPI/addMusic').post(this.userAPIController.addMusic);
        app.route('/userAPI/loadUserByTag').get(this.userAPIController.loadUserByTag);
    }
}
exports.UserRoute = UserRoute;
//# sourceMappingURL=userRoute.js.map