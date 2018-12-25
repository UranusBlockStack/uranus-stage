<template>
  <section class="appRepository">
    <el-row class="repositoryHead">
      <el-col class="title" :span="12">
        <h1>我的应用仓库</h1>
      </el-col>
      <el-col class="record" :span="12">
        <p>部署应用记录></p>
      </el-col>
    </el-row>
    <el-dialog title="确认要删除该应用吗?" :visible.sync="dialogVisible" width="30%" top="20%">
      <span>删除后,我的应用仓库将没有该应用!</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="shop">
      <el-row>
        <el-col :span="8">
          <el-input placeholder="输入商店/应用名称" prefix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="success">搜索</el-button>
        </el-col>
      </el-row>
      <el-row class="shopBox" :gutter="20">
        <el-col :span="6" v-for="(app, index) in appList" :key="index" style="margin-bottom:40px">
          <el-card :body-style="{ padding: '0px', height:'360px'}" shadow="hover">
            <div class="resources">
              <div>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <span class="el-icon-arrow-down"></span>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <p @click="dialogVisible = true">删除</p>
                    </el-dropdown-item>
                    <el-dropdown-item>查看详情</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <img src="/static/img/uranus/developer/app.png" alt="img">
                <p class="name">Imagepuler</p>
                <p
                  class="detail"
                >DEPRECATED:This catalog item is deprecated and moved to rancher-catalog under pre-pull…</p>
                <el-row :gutter="20">
                  <el-col :span="6" :offset="2">
                    <p class="free">免费</p>
                  </el-col>
                  <el-col :span="10" :offset="6">
                    <p class="shops">{{app.shop}}</p>
                  </el-col>
                  <el-button type="success">查看详情</el-button>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="8">
          <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  name: "Applicationmarket",
  data() {
    return {
      dialogVisible: false,
      appList: [
        { id: "1", name: "Imagepuller", shop: "商店1" },
        { id: "2", name: "Imagepuller", shop: "商店2" },
        { id: "3", name: "Imagepuller", shop: "商店3" },
        { id: "4", name: "Imagepuller", shop: "商店4" },
        { id: "1", name: "Imagepuller", shop: "商店1" },
        { id: "2", name: "Imagepuller", shop: "商店2" },
        { id: "3", name: "Imagepuller", shop: "商店3" },
        { id: "4", name: "Imagepuller", shop: "商店4" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.appRepository {
  background: #f2f2f2;
  min-width: 1160px;
  .repositoryHead {
    background: #ffffff;
    height: 65px;
    .title {
      h1 {
        font-family: PingFang-SC-Bold;
        font-size: 20px;
        color: #252525;
        line-height: 24px;
        padding-left: 30px;
      }
    }
    .record {
      float: right;
      margin-right: 15px;
      margin-top: 4px;
      height: 60px;
      width: 125px;
      p {
        height: 60px;
        line-height: 60px;
        margin: 0;
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #8eb357;
      }
    }
  }
  .shop {
    background: #ffffff;
    width: 95%;
    min-width: 1130px;
    margin: 20px auto;
    padding: 15px;
    box-shadow: 0 1px 4px 0;
    .el-button {
      background: #8eb357;
      border: none;
    }
    p {
      height: 40px;
      font-family: PingFang-SC-Bold;
      font-size: 16px;
      color: #252525;
      line-height: 24px;
      text-align: left;
    }
    .shopBox {
      width: 100%;
      min-width: 1130px;
      margin-top: 15px;
      .resources {
        text-align: center;
        padding: 20px;
        div {
          cursor: default;
          .el-dropdown {
            float: right;
            .el-dropdown-item {
              background: #8eb357;
            }
          }
          .el-dropdown:hover {
            color: #8eb357;
          }
          img {
            width: 110px;
            height: 105px;
            display: inline-block;
          }
          .name {
            font-weight: 600;
            padding: 5px 0 10px;
            border-bottom: 2px solid #eee;
            font-family: PingFang-SC-Medium;
            font-size: 20px;
            color: #251e1c;
            text-align: center;
            line-height: 24px;
          }
          .detail {
            width: 220px;
            height: 66px;
            overflow: hidden;
            box-sizing: content-box;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.45);
            text-align: center;
            line-height: 22px;
            margin: 10px auto;
          }
          .free {
            font-weight: 600;
            padding: 10px 0;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #1890ff;
            letter-spacing: 0;
            line-height: 22px;
            text-align: left;
          }
          .shops {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #5d5d5d;
            letter-spacing: 0;
            text-align: center;
            line-height: 22px;
          }
          .el-button {
            background: #8eb357;
            border: none;
          }
        }
      }
    }
  }
}
</style>
