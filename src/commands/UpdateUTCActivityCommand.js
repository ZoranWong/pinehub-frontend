import Command from './Command';
export default class UpdateUTCActivityCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(projectId, id, activity) {
        try{
            if( !activity ||  !activity['items'] || activity['items'].length === 0 ){
                this.$message({
                    message: '未添加支付礼包',
                    type: 'error'
                });
            }else{
                for(let i = 0; i < activity['items'].length; i++) {
                    let gift = activity['items'][i];
                    if(!gift['cost'] && !gift['discount'] && !gift['score'] && !gift['ticket_id']) {
                        this.$message({
                            message: '支付礼包没有选择填写礼包信息',
                            type: 'error'
                        });
                        return ;
                    }
                }
                let result = await this.$service('http.upToCutActivities').update(projectId, id, activity);
                if(result) {
                    this.$message({
                        message: '恭喜你，活动创建成功！',
                        type: 'success'
                    });
                    this.$router.push({
                        name: 'up-to-cut',
                        params: {
                            projectId: this.$requestInput('projectId')
                        }
                    });
                }
            }
        }catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'UPDATE_UTC_ACTIVITY';
    }
}
