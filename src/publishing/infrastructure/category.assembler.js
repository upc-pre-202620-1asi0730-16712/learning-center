import {Category} from "@/publishing/domain/model/category.entity.js";

export class CategoryAssembler {

    /*
    {
        'categories': [
            {
                id: 1,
                name: 'Category 1',
            },
            {
                id: 2,
                name: 'Category 2',
            }
        ],
    }
     */

    static toEntityFromResource(resource) {
        return new Category({...resource});
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`Error fetching categories: ${response.status} - ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['categories'];

        return resources.map(resource => this.toEntityFromResource(resource));
    }

}