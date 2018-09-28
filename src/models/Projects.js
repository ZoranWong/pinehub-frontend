import Model from './Model';
import _ from 'underscore';
import ProjectTransformer from './transformers/Project';
export default class Projects extends Model {
  constructor(application) {
    super(application);
    this.transformer = ProjectTransformer;
  }
}
