import Service from './Service';
export default class  DateService extends Service {
    constructor(application) {
        super(application);
        Date.prototype.format = function( format = null) {
            if(!format) {
                format = "yyyy-MM-dd hh:mm:ss";
            }
            let o = {
                "M+" : this.getMonth()+1, //month
                "d+" : this.getDate(), //day
                "h+" : this.getHours(), //hour
                "m+" : this.getMinutes(), //minute
                "s+" : this.getSeconds(), //second
                "q+" : Math.floor((this.getMonth()+3)/3), //quarter
                "S" : this.getMilliseconds() //millisecond
            };
            if(/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
            }
            for(let k in o) {
                if(new RegExp("("+ k +")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
                }
            }
            return format;
        }

        Date.prototype.addDays = function(number) {
            let  adjustDate = new Date(this.getTime() + 24 * 60 * 60 * 1000 * number)
            return adjustDate;
        }
    }

    format(time, format = null) {
        if(!format) {
            format = time;
            time = null;
        }
        let date = null;
        if(!time) {
            date = new Date(Date.now());
        }else {
            date = new Date(time);
        }
        return date.format(format);
    }

    now(format = null) {
        return (new Date(Date.now())).format(format);
    }

    addDays(time, days = null, format = null) {
        let date = null;
        if(!format && !days) {
            days = time;
            time = null;
        }
        if(!time) {
            date = new Date(Date.now());
        }else {
            date = new Date(time);
        }
        date = date.addDays(days);
        return date.format(format);
    }

    overDate() {

    }
}
