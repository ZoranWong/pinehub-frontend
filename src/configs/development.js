export default {
	API_SERVER_HOST: "api",
	AUTH_SERVER_HOST: "api.auth.pinehub",
	root: '',
	selectData: [],
	curPage: 1, //1列表页 2新增编辑页 3详情页
	saveType: 0, //保存类型 0新增 1编辑
	eformType: 0, //内嵌套弹框保存类型 0新增 1编辑
	totalNum: 0,
	tLoading: false, //表格加载
	fLoading: false, //表单加载
	bLoading: false, //按钮加载
	sels: [], //列表选中列
	formVisible: false, //新增编辑界面是否显示
	detailVisible: false, //详情界面是否显示
	advanced: false, //是否显示高级查询
	detailData: {},
	box: '',
	container: '',
	containerTop: '',
	scrollTop: '20px',
	provinceData: [],
	cityData: [],
	areaData: [],
	cxCityData: [],
	cxAreaData: []
}
