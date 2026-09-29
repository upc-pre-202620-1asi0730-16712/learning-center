import {BaseApi} from "@/shared/infraestructure/base-api.js";
import {BaseEndpoint} from "@/shared/infraestructure/base-endpoint.js";

const categoriesEndpointPath = import.meta.env.VITE_CATEGORIES_ENDPOINT_PATH;
const tutorialsEndpointPath = import.meta.env.VITE_TUTORIALS_ENDPOINT_PATH;

/**
 * PublishingApi class provides methods to interact with the publishing API for categories and tutorials.
 * It extends the BaseApi class and uses BaseEndpoint instances for specific endpoints.
 *
 * @class PublishingApi
 * @extends BaseApi
 */
export class PublishingApi extends BaseApi {
    /**
     * @type {BaseEndpoint}
     * @private
     */
    #categoriesEndpoint;
    /**
     * @type {BaseEndpoint}
     * @private
     */
    #tutorialsEndpoint;

    /** Creates endpoints for categories and tutorials using the base API. */
    constructor() {
        super();
        this.#categoriesEndpoint = new BaseEndpoint(this, categoriesEndpointPath);
        this.#tutorialsEndpoint = new BaseEndpoint(this, tutorialsEndpointPath);
    }

    /**
     * Fetches all categories from the API.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the categories' data.
     */
    getCategories() {
        return this.#categoriesEndpoint.getAll();
    }

    /**
     * Fetches a category by its ID from the API.
     * @param {string} id - The ID of the category to fetch.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the category's data.
     */
    getCategoryById(id) {
        return this.#categoriesEndpoint.getById(id);
    }

    /**
     * Creates a new category using the API.
     * @param {Object} resource - The category data to create.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the created category's data.
     */
    createCategory(resource) {
        return this.#categoriesEndpoint.create(resource);
    }

    /**
     * Updates an existing category using the API.
     * @param {Object} resource - The category data to update.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the updated category's data.
     */
    updateCategory(resource) {
        return this.#categoriesEndpoint.update(resource.id, resource);
    }

    /**
     * Deletes a category from the API.
     * @param {string} id - The ID of the category to delete.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the deletion result.
     */
    deleteCategory(id) {
        return this.#categoriesEndpoint.delete(id);
    }

    /**
     * Fetches all tutorials from the API.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the tutorials' data.
     */
    getTutorials() {
        return this.#tutorialsEndpoint.getAll();
    }

    /**
     * Fetches a tutorial by its ID from the API.
     * @param {string} id - The ID of the tutorial to fetch.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the tutorial's data.
     */
    getTutorialById(id) {
        return this.#tutorialsEndpoint.getById(id);
    }

    /**
     * Creates a new tutorial using the API.
     * @param {Object} resource - The tutorial data to create.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the created tutorial's data.
     */
    createTutorial(resource) {
        return this.#tutorialsEndpoint.create(resource);
    }

    /**
     * Updates an existing tutorial using the API.
     * @param {Object} resource - The tutorial data to update.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the updated tutorial's data.
     */
    updateTutorial(resource) {
        return this.#tutorialsEndpoint.update(resource.id, resource);
    }

    /**
     * Deletes a tutorial from the API.
     * @param {string} id - The ID of the tutorial to delete.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the deletion result.
     */
    deleteTutorial(id) {
        return this.#tutorialsEndpoint.delete(id);
    }
}