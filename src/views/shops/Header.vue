<template>
    <search-header @search = "search">
        <template slot="searchInput">
            <el-form-item prop="code">
                <el-input v-model="shopCode" size="small" placeholder="输入店铺编号" />
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="shopName" size="small" placeholder="输入店铺名称" />
            </el-form-item>
            <el-form-item prop="province">
                <el-select v-model="provinceId" size="small">
                    <el-option label="请选择省" value="" @click="cityId = '';countyId = ''" />
                    <el-option v-for="(province, index) in provinces" :key="index" :label="province.name" :value="province.id"
                               @click="cityId = '';countyId = ''" />
                </el-select>
            </el-form-item>
            <el-form-item prop="city">
                <el-select v-model="cityId" size="small">
                    <el-option label="请选择市" value="" @click="countyId = ''" />
                    <el-option v-for="(city, index) in cities" :key="index" :label="city.name" :value="city.id" @click="countyId = ''" />
                </el-select>
            </el-form-item>
            <el-form-item prop="area">
                <el-select v-model="countyId" size="small">
                    <el-option label="请选择区" value="" />
                    <el-option v-for="(county, index) in counties" :key="index" :label="county.name" :value="county.id" />
                </el-select>
            </el-form-item>
        </template>
        <template slot="opt">
            <div>
                <el-button size="small" type="primary" icon="el-icon-plus" @click="create">新增</el-button>
                <el-button size="small">导出</el-button>
            </div>
        </template>
    </search-header>
</template>

<script>
import SearchHeader from '@/components/SearchHeader';
export default {
    components: {
        'search-header': SearchHeader
    },
    props: {
        value: {
            default: null,
            type: Object
        }
    },
    data() {
        return {
            shopName: null,
            shopCode: null,
            provinceId: null,
            cityId: null,
            countyId: null
        };
    },
    computed: {
        provinces() {
            return [];
        },
        cities() {
            return [];
        },
        counties() {
            return [];
        }
    },
    watch: {
        value(search) {
            if(search) {
                this.shopName = search['name'];
                this.shopCode = search['code'];
                this.provinceId = search['province_id'];
                this.cityId = search['city_id'];
                this.countyId = search['county_id'];
            }
        }
    },
    created() {
        let search = this.value;
        if(search) {
            this.shopName = search['name'];
            this.shopCode = search['code'];
            this.provinceId = search['province_id'];
            this.cityId = search['city_id'];
            this.countyId = search['county_id'];
        }
    },
    methods: {
        search() {
            let search = this.value;
            console.log(search);
            if(!search) {
                return ;
            }
            if(this.shopCode) {
                search['code'] = this.shopCode;
            } else {
                delete search['code'];
            }

            if(this.shopName) {
                search['name'] = this.shopName;
            }else{
                delete search['name'];
            }

            if(this.provinceId) {
                if(this.cityId) {
                    if(this.countyId) {
                        search['county_id'] = this.countyId;
                    } else {
                        search['city_id'] = this.cityId;
                        delete search['county_id'];
                    }
                }else {
                    search['province_id'] = this.provinceId;
                    delete search['city_id'];
                }
            } else {
                delete search['province_id'];
            }
            this.$emit('search', search);
        },
        create() {
            let params = {};
            params['projectId'] = this.$requestInput('projectId');
            this.$router.push({name: 'shop-menuForm',  params: params});
        }
    }
}
</script>
