<template>
  <el-form :model="merchandise" label-width="120px"  ref="merchandise">
		<h4>基本信息</h4>
		<el-form-item label="商品名：" prop="name" :rules = "[{required: true, message: '请填写商品名称', trigger: 'blur'}]">
			<el-input v-model="merchandise['name']" style="width: 256px"></el-input>
		</el-form-item>
		<el-form-item label="商品简介：" prop="preview" style="margin-bottom: 0;"
    :rules = "[{required: true, message: '请填写商品简介', trigger: 'blur'}]">
			<el-input placeholder = "微信分享给好友时会显示，建议255个字以内" v-model="merchandise['preview']" :maxlength="255" type = "textarea" :rows = "5"></el-input>
		</el-form-item>
		<el-form-item label="商品图：" prop="images" :rules = "[{required: true, message: '上传商品图片', trigger: 'blur'}]">
			<el-upload class = "upload-image"
      name="merchandiseImage"
      :file-list="imagesList"
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
		  <el-button type="text" size="small" @click="refreshCategory()">刷新</el-button> |
		  <el-button type="text" size="small" @click="createCategory()">新建分组</el-button>
		</el-form-item>
		<el-form-item label="主图：" prop="main_image" :rules = "[{required: true, message: '上传商品主图', trigger: 'blur'}]">
			<el-upload class="upload-image"
      name="main_image"
      :on-remove="removeMainImage"
      :file-list="mainImageList"
      :http-request = "uploadMainImage"
      :on-success="uploadMainImageSuccess"
      :on-error="uploadMainImageError"
      list-type="picture-card">
			  	<el-button plain size="small" type="text">+点击上传 </el-button>
			  	<div slot="tip" class="el-upload__tip">
            建议尺寸：800*800像素，最多上传1张
          </div>
			</el-upload>
		</el-form-item>
		<h4>价格库存</h4>
		<el-form-item label="售价：" prop="sell_price" :rules = "[{required: true, message: '请填写商品销售价格', trigger: 'blur'}]">
			<el-input v-model.number="merchandise['sell_price']" style="width: 164px" type = "number">
        <template slot="prepend">￥</template>
        <template slot="append">元</template>
      </el-input>
		</el-form-item>
		<el-form-item label="原价：" prop="origin_price" :rules = "[{required: true, message: '请填写商品原价', trigger: 'blur'}]">
			<el-input v-model.number="merchandise['origin_price']" style="width: 164px" type = "number">
        <template slot="prepend">￥</template>
        <template slot="append">元</template>
      </el-input>
		</el-form-item>
		<el-form-item label="成本：" prop="cost_price">
			<el-input v-model.number="merchandise['cost_price']" style="width: 164px" type = "number">
        <template slot="prepend">￥</template>
        <template slot="append">元</template>
      </el-input>
		</el-form-item>
		<el-form-item label="工厂价：" prop="factory_price" style="margin-bottom: 0;">
			<el-input v-model.number="merchandise['factory_price']" style="width: 164px" type = "number">
        <template slot="prepend">￥</template>
        <template slot="append">元</template>
      </el-input>
		</el-form-item>
		<p class = "prompt">
      商品没有优惠的情况下，划线价在商品详情会以划线形式显示。
    </p>
		<el-form-item label="库存：" prop="stock_num" :rules = "[{required: true, message: '请输入商品库存数量', trigger: 'blur'}]">
			<el-input v-model.number="merchandise['stock_num']" style="width: 136px" type = "number">
        <template slot="append">个(件)</template>
      </el-input>
		</el-form-item>

		<el-form-item label = "会员折扣：" prop = "member_discount" style = "margin-bottom: 0;">
			<el-checkbox v-model = "merchandise['member_discount']" disabled = "true">参加会员折扣</el-checkbox>
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
export default {
  name: 'MechandiseForm',
  data() {
    return {
      merchandise: {
        name: null,
        preview: null,
        status: null,
        images: [],
        categories: [],
        main_image: null,
        sell_price: null,
        cost_price: null,
        origin_price: null,
        focatory_price: null,
        stock_num: null,
        member_discount: false
      }
    }
  },
  computed: {
    mainImageList() {
      return [];
    },
    imagesList() {
      return [];
    }
  },
  methods: {
    uploadImages() {

    },
    uploadImagesSuccess() {

    },
    removeImages() {

    },
    uploadImagesError() {

    },
    removeMainImage() {

    },
    uploadMainImageSuccess() {

    },
    uploadMainImageError() {

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
