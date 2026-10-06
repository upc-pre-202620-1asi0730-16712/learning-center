import {User} from "@/iam/domain/user.entity.js";

export class UserAssembler {
    /*
    {
       "users":[
            {
                "id": 1,
                "username": "john_doe",
                "email": "
            },
            {
                "id": 2,
                "username": "john_doe",
                "email": "
            },
        ]
    }


     */
    static toEntityFromResource(resource) {
        return new User({...resource});
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ?
            response.data : response.data['users'];

        return resources.map(resources => this.toEntityFromResource(resources));
    }

}