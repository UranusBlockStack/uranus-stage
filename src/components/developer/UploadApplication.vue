<template>
  <section class="upload">
    <el-row class="content-title">
      <el-col
        class="title"
        :span="12"
      >
        <h1>{{$t('developer.uploadApplication.upload')}}</h1>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-col
        class="head"
        :span="24"
      >
        <h2>{{$t('developer.uploadApplication.information')}}</h2>
      </el-col>
      <el-col :span="13">
        <el-form
          ref="form"
          :model="form"
          label-width="180px"
        >
          <el-form-item :label="this.$t('developer.uploadApplication.name')">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item :label="this.$t('developer.uploadApplication.mode')">
            <el-radio
              v-model="radio"
              label="1"
              @change="setPrice()"
            >{{$t('developer.uploadApplication.free')}}</el-radio>
            <br/>
            <el-radio
              v-model="radio"
              label="2"
            >{{$t('developer.uploadApplication.change')}}</el-radio>
          </el-form-item>
          <el-form-item v-if="this.radio == '2'" :label="this.$t('developer.uploadApplication.price')">
              <el-input class="el-price" v-model="form.price" :placeholder="this.$t('developer.uploadApplication.priceIn')" min="0" type="number"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-col
        class="head"
        :span="24"
      >
        <h2>{{$t('developer.uploadApplication.package')}}</h2>
      </el-col>
      <el-col :span="13">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item :label="this.$t('developer.uploadApplication.archive')">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">{{$t('developer.uploadApplication.here')}}<em>{{$t('developer.uploadApplication.click')}}</em></div>
              <div
                class="el-upload__tip"
                slot="tip"
              >{{$t('developer.uploadApplication.requires')}}</div>
            </el-upload>
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
      radio: '1',
      form: {
        name: '',
        price: '0',
        projectName: 'urnaus-cloud'
      }
    }
  },
  methods: {
    setPrice() {
      if (this.radio == '1') {
        this.form.price = '0'
      } else {
        this.price
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
    .el-form /deep/ .el-form-item__label {
      text-align: left;
    }
    .el-radio {
      color: #A2A6B0;
    }
    .el-radio /deep/ .el-radio__input.is-checked+.el-radio__label {
        color: #627100;
    }
    .el-radio /deep/ .el-radio__input.is-checked .el-radio__inner {
        color: #627100;
        background: #627100;
        border-color: #627100;
    }
    .el-radio /deep/ .el-radio__inner:hover {
        border-color: #627100;
    }
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
    .el-price /deep/ .el-input__inner {
      width: 150px;
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
    .upload-demo /deep/ .el-upload-dragger {
      background: transparent;
      border-color: rgba(255, 255, 255, 0.1);
    }
    .upload-demo /deep/ .el-upload-dragger:hover {
      border-color: #627100;
    }
    .upload-demo /deep/ input {
      display: none;
    }
    .upload-demo /deep/ .el-upload-dragger .el-upload__text em {
      color: #627100;
    }
  }
}
</style>

