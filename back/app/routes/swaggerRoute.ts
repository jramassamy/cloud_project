import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from '../swagger.json'
export class SwaggerRoute {
    
    public routes(app): void {
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));  
    }
}