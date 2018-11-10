<template>
	<el-form :model="merchandise" label-width="120px"  ref="merchandise">
		<h4>基本信息</h4>
		<el-form-item label="商品名：" prop="name" :rules = "[{required: true, message: '请填写商品名称', trigger: 'blur'}]">
			<el-input v-model="merchandise['name']" style="width: 256px"></el-input>
		</el-form-item>
		<el-form-item label="商品简介：" prop="preview" style="margin-bottom: 12px;" :rules = "[{required: true, message: '请填写商品简介', trigger: 'blur'}]">
			<el-input placeholder = "微信分享给好友时会显示，建议255个字以内" style="width: 720px;" v-model="merchandise['preview']" :maxlength="255" type = "textarea" :rows = "5"></el-input>
		</el-form-item>
		<el-form-item label="商品图：" prop="images" :rules = "[{required: true, message: '上传商品图片', trigger: 'blur'}]">
			<el-upload
					class = "upload-image"
					action = ""
					name="merchandiseImage"
					:file-list="imageList"
					:http-request = "uploadImages"
					:on-success="uploadImagesSuccess"
					:on-remove="removeImages"
					:on-error="uploadImagesError"
					list-type="picture-card">
				<el-button plain size="small" type="text">+ 点击上传  </el-button>
				<div slot="tip" class="el-upload__tip">
					建议尺寸：800*800像素，你可以拖拽图片调整顺序，最多上传15张
				</div>
			</el-upload>
		</el-form-item>
		<el-form-item label="商品品类：" prop="categories" :rules = "[{required: true, message: '请选择商品品类', trigger: 'blur'}]">
			<el-select v-model="merchandise['categories']" multiple placeholder="请选择商品品类" size="small">
				<el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
			</el-select>
			<el-button type="text" size="small" @click="refreshCategories">刷新</el-button> |
			<el-button type="text" size="small" @click="createCategory">新建分组</el-button>
		</el-form-item>
		<el-form-item label="主图：" prop="main_image" :rules = "[{required: true, message: '上传商品主图', trigger: 'blur'}]">
			<el-upload
					class="upload-image avatar-uploader"
					name="mainImage"
					action = " "
					:on-remove="removeMainImage"
					:http-request = "uploadMainImage"
					:on-success="uploadMainImageSuccess"
					:on-error="uploadMainImageError"
					:multiple = "false"
					:show-file-list="false" >
				<img v-if="mainImage" :src="mainImage" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon">点击上传</i>
				<div slot="tip" class="el-upload__tip">
					建议尺寸：800*800像素，最多上传1张
				</div>
			</el-upload>
		</el-form-item>
		<h4>价格库存</h4>
		<el-form-item label="售价：" prop="sell_price" :rules = "[{required: true, message: '请填写商品销售价格', trigger: 'blur'}]">
			<el-input v-model.number="merchandise['sell_price']" style="width: 184px" type = "number">
				<template slot="prepend">￥</template>
				<template slot="append">元</template>
			</el-input>
		</el-form-item>
		<el-form-item label="原价：" prop="origin_price" :rules = "[{required: true, message: '请填写商品原价', trigger: 'blur'}]">
			<el-input v-model.number="merchandise['origin_price']" style="width: 184px" type = "number">
				<template slot="prepend">￥</template>
				<template slot="append">元</template>
			</el-input>
		</el-form-item>
		<el-form-item label="成本：" prop="cost_price">
			<el-input v-model.number="merchandise['cost_price']" style="width: 184px" type = "number">
				<template slot="prepend">￥</template>
				<template slot="append">元</template>
			</el-input>
		</el-form-item>
		<el-form-item label="工厂价：" prop="factory_price" style="margin-bottom: 0;">
			<el-input v-model.number="merchandise['factory_price']" style="width: 184px" type = "number">
				<template slot="prepend">￥</template>
				<template slot="append">元</template>
			</el-input>
		</el-form-item>
		<p class = "prompt">
			商品没有优惠的情况下，划线价在商品详情会以划线形式显示。
		</p>
		<el-form-item label="库存：" prop="stock_num" :rules = "[{required: true, message: '请输入商品库存数量', trigger: 'blur'}]">
			<el-input v-model.number="merchandise['stock_num']" style="width: 218px" type = "number">
				<template slot="append">个(件)</template>
			</el-input>
		</el-form-item>

		<el-form-item label = "会员折扣：" prop = "member_discount" style = "margin-bottom: 0;">
			<el-checkbox v-model = "merchandise['member_discount']" :disabled = "true">参加会员折扣</el-checkbox>
		</el-form-item>
		<p class="prompt">
			是否勾选不影响自定义会员价生效。
		</p>
		<h4>其他信息</h4>
		<el-form-item label="上下架：" prop="status" :rules = "[{required: true, message: '请选择商品是否上架', trigger: 'blur'}]">
			<el-radio-group v-model = "merchandise['status']">
				<el-radio :label="1">上架 </el-radio>
				<el-radio :label="0">下架</el-radio>
			</el-radio-group>
		</el-form-item>
	</el-form>
</template>
<script>
    import _ from 'underscore';
    export default {
        name: 'MerchandiseForm',
        props: {
            refreshCategories: {
                default: null,
                type: Function
            },
            value: {
                default: null,
                type: Object
            }
        },
        watch: {
            merchandise: {
                deep: true,
                handler() {
                    this.$emit('input', this.merchandise);
                }
            },
            value: {
                deep: true,
                handler: function (nv, ov) {
                    if (nv !== ov) {
                        this.merchandise = nv;
                        for (let k in this.merchandise['images']) {
                            this.imageList.push({
                                uid: k,
                                url: this.merchandise['images'][k]
                            });
                        }
                    }
                }
            }
        },
        data() {
            return {
                imageList: [],
                merchandise: {
                    name: null,
                    preview: null,
                    status: 1,
                    images: [],
                    categories: [],
                    main_image: null,
                    sell_price: null,
                    cost_price: null,
                    origin_price: null,
                    factory_price: null,
                    stock_num: null,
                    member_discount: false
                }
            };
        },
        created() {
            this.refreshCategories();
        },
        computed: {
            mainImage() {
                return this.merchandise['main_image'];
            },
            categories() {
                return this.$store.getters['categories/currentPage'];
            }
        },
        methods: {
            async uploadImages({ file }) {
                this.$command('UPLOAD_FILE', file, 'merchandiseImage', 'merchandiseImage', (result) => {
                    if(result) {
                        this.merchandise['images'].push(result.src);
                        this.imageList.push({
                            uid: file.uid,
                            url: result.src
                        });
                    }
                });
            },
            async uploadMainImage({ file }) {
                this.$command('UPLOAD_FILE', file, 'mainImage', 'merchandiseImage', (result) => {
                    if(result) {
                        this.merchandise['main_image'] = result.src;
                    }
                });
            },
            uploadImagesSuccess() {

            },
            removeImages: function (rfile) {
                _.map(this.imageList, (file, index) => {
                    if (file.uid === rfile.uid) {
                        this.imageList.splice(index, 1);
                        this.images.splice(index, 1);
                    }
                })
            },
            uploadImagesError() {
            },
            removeMainImage() {
            },
            uploadMainImageSuccess() {
            },
            uploadMainImageError() {
            },
            createCategory() {
                this.$emit('addCategory');
            }
        }
    }
</script>
<style scoped>
	.prompt{
		color:gray;
		font-size: 12px;
		margin-left: 120px;
		margin-top: 6px;
		margin-bottom: 6px;
	}
</style>
<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 18px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px !important;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
