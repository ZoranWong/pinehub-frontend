import Model from './Model';
import _ from 'underscore';
import ProjectTransformer from './transformers/Project';
export default class Projects extends Model {
  constructor(application) {
    super(application);
  }
  data() {
    return {
      	list:[],
      	pageCount: 0,
      	currentPage: 0,
				totalNum:0,
    };
  }
  computed() {
    return {
      getShopsBuyPage: (state) => (page) => {
        return state.orders[page -1];
      },
      currentPage: (state) =>  {
       console.log(state)
          return state.list[state.currentPage -1];
      }
    };
  }

  dispatchs() {
    return {
      	nextPage({commit}) {
        	commit('nextPage');
      	},
        setProjects({commit}, payload){

          commit('setProjects', payload);
        }
    };
  }

  listeners() {
    return {
      nextPage(state) {
        state.currentPage ++;
      },
      reset(state) {

      },
      setProjects: (state, payload) => {
        let projects = payload['projects'];
        let page = payload['currentPage'];
        let totalNum = payload['totalNum'];
        let totalPage = payload['totalPage'];
        console.log(this);
        state.currentPage = page;
        state.list[page - 1] =  this.transform(projects, ProjectTransformer);
        if(totalNum !== null)
          state.totalNum = totalNum;
        if(totalPage !== null)
          state.totalPage = totalPage;
      }
    };
  }
}
