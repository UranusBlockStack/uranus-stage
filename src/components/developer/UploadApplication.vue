<template>
  <section class="upload">
    <el-row class="content-title">
      <el-col
        class="title"
        :span="12"
      >
        <h1>上传镜像</h1>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-col
        class="head"
        :span="24"
      >
        <h2>基本信息</h2>
      </el-col>
      <el-col :span="13">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="镜像名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="镜像简介">
            <el-input
              type="textarea"
              v-model="form.desc"
            ></el-input>
          </el-form-item>
          <el-form-item label="镜像版本">
            <el-select
              v-model="form.region"
              placeholder="请选择活动区域"
            >
              <el-option
                label="区域一"
                value="shanghai"
              ></el-option>
              <el-option
                label="区域二"
                value="beijing"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收费模式">
            <el-radio-group v-model="form.resource">
              <el-radio label="免费"></el-radio>
              <el-radio label="收费"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-col
        class="head"
        :span="24"
      >
        <h2>镜像包</h2>
      </el-col>
      <el-col :span="13">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="镜像logo">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="安装包">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="镜像分类">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="支持系统">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'UploadApplication',
  data() {
    return {
      form: {
        name: '',
        region: '',
        resource: '',
        desc: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  background: #000;
  border-radius: 2px;
  min-width: 1130px;
  width: 100%;
  .content-title {
    background: #161618;
    border-radius: 2px;
    height: 50px;
    margin: 2px 2px 0;
    h1 {
      font-family: Source-Sans-Pro-Bold;
      font-size: 16px;
      color: #727680;
      line-height: 50px;
      margin: 0;
      padding: 0;
      padding-left: 30px;
      i {
        font-size: 26px;
        margin-right: 10px;
      }
    }
  }
  .content {
    background: #161618;
    border-radius: 2px;
    margin: 2px 2px 0;
    padding-left: 30px;
    .head {
      height: 50px;
      h2 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #727680;
        line-height: 24px;
        text-align: left;
        margin: 0;
        padding: 0;
      }
    }
    .el-input /deep/ .el-input__inner {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #a2a6b0;
      opacity: 0.6;
    }
    .el-textarea /deep/ .el-textarea__inner {
      height: 150px;
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #a2a6b0;
      opacity: 0.6;
    }
    .el-select /deep/ .el-input__inner {
      background: #1d1e23;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #a2a6b0;
      font-weight: 400;
    }
  }
}
</style>

