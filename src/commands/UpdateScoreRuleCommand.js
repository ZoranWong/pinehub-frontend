import Command from './ScoreRuleCommand';
export default class UpdateScoreRuleCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(id, rule) {
        try{

            if(rule['type'] === 'GENERAL') {
                rule = this.buildGeneralRule(rule);
            }else  {
                rule = this.buildSpecialRule(rule);
            }

            let result = await  this.http.scoreRules.update(this.$requestInput('projectId'), id, rule);
            if(result) {
                this.$message({
                    message: '通用积分修改成功！',
                    type: 'success'
                });

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

            }else{
                this.$message({
                    message: '通用积分修改失败！',
                    type: 'error'
                });
            }
        }catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'UPDATE_SCORE_RULE';
    }
}
