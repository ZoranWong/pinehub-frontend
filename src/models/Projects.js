import Model from './Model';
import _ from 'underscore';
import ProjectTransformer from './transformers/Project';
export default class Projects extends Model {
    constructor(application) {
        super(application);
        this.transformer = ProjectTransformer;
    }

    data() {
        super.data();
        this.dataMap = _.extend(this.dataMap, {
            currentProject: {}
        });
        return this.dataMap;
    }

    computed() {
        return _.extend(super.computed(), {
            currentProject() {
                return this.currentProject;
            }
        });
    }

    listeners() {
        super.listeners();
        this.addEventListener('setCurrentProject', function({project}) {
            this.currentProject = new ProjectTransformer(project);
        });
    }
}
