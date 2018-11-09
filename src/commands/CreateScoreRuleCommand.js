import Command from './ScoreRuleCommand';
export default class CreateScoreRuleCommand extends Command {
    constructor(app) {
        super(app);

    }

    async handle(rule) {
        try{
            if(rule['type'] === 'GENERAL') {
               rule = this.buildGeneralRule(rule);
            }else  {
                rule = this.buildSpecialRule(rule);
            }

            let result = await  this.http.scoreRules.create(this.$requestInput('projectId'), rule);

            if(rule['type'] === 'GENERAL') {
                this.close(result);
            }else{
                this.$router.push({
                    name: 'scores',
                    params: {
                        projectId: this.$requestInput('projectId')
                    }
                });
            }
        }catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'CREATE_SCORE_RULE';
    }
}
