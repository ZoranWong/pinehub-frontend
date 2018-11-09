import Model from './Model'
import ScoreRuleTranformer from './transformers/ScoreRule';
import _ from 'underscore';
export default class ScoreRules extends Model{
    constructor(application) {
        super(application);
        this.transformer = ScoreRuleTranformer;
    }
    computed() {
        return _.extend(super.computed(), {
            scoreRule() {
                let list = _.flatten(this.list);
                return (id) => {
                    return _.findWhere(list, {id: id})
                }
            }
        });
    }

    data() {
        return _.extend(super.data(), {

        });
    }
}
