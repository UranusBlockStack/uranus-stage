<template>
  <section class="appRecord">
    <el-dialog  :close-on-click-modal='false' :visible.sync="dialogTableVisible" width='90%' :show-close='false' center >
        <div slot="title" class="dialog-title">
          <div class="title-left">
            <h2> <i class="icon icon-terminal"></i> 命令行: {{podName}}</h2>
            <!--<p class="protip"> 提示文本提示文本提示文本提示文本提示文本 </p>-->
          </div>
          <!--<div class="title-right"> 已连接 </div>-->
          <!--<span>{{$t('buyer.appState.shellTitle')}}-->
            <!--</span>-->
        </div>
        <div id="xterm" style="width:100%;"></div>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="closeConnect()">{{$t($t('buyer.appState.button'))}}</el-button>
  </span>
    </el-dialog>
    <el-row class="recordHead">
      <el-col class="title" :span="20">
        <h1 @click="$router.back(-1)">
          <i class="iconfont"></i>
          {{appName}}
        </h1>
      </el-col>
      <!-- <el-col :span="4">
        <p>{{$t('buyer.appState.rename')}}</p>
      </el-col>-->
    </el-row>
    <el-row class="recordBox">
      <el-col class="blue-box" :span="24">
        <el-table :data="workLoadList" style="width: 100%">
          <template slot="empty">
            <p class="empty-text">No Data</p>
          </template>
          <el-table-column prop="status" :label="$t('buyer.appState.status')">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-table-state"></i>
                {{$t('buyer.appState.status')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('buyer.appState.name')">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-table-name"></i>
                {{$t('buyer.appState.name')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.name }}</p>
              <div  v-html="scope.row.links"> {{scope.row.links}} </div>
            </template>
          </el-table-column>
          <el-table-column prop="image" width="320">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-table-image"></i>
                {{$t('buyer.appState.image')}}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="overflow">{{ scope.row.image }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="scale" :label="$t('buyer.appState.pod')">
            <template slot="header" slot-scope="scope" min-width="250">
              <p class="table-head">
                <i class="iconfont icon-table-scale"></i>
                {{$t('buyer.appState.pod')}}
              </p>
            </template>
          </el-table-column>
          <el-table-column width="120">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="iconfont icon-menu"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-show="workLoadList.status!='active'"
                    @click.native="workloadAction(scope.row.wid, scope.row.name, 'execute')"
                  >{{$t('buyer.appState.shell')}}</el-dropdown-item>
                  <el-dropdown-item v-show="workLoadList.status!='active'"
                    @click.native="workloadAction(scope.row.wid,scope.row.name, 'resume')"
                  >{{$t('buyer.appState.resume')}}</el-dropdown-item>
                  <el-dropdown-item v-show="workLoadList.status=='active'"
                    @click.native="workloadAction(scope.row.wid, scope.row.name,'pause')"
                  >{{$t('buyer.appState.pause')}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--<el-col :span="8" :offset="16" class="transaction-foot">-->
      <!--<el-pagination layout="prev, pager, next" :total="100"></el-pagination>-->
      <!--</el-col>-->
    </el-row>
  </section>
</template>

<script>
import * as auth from '../../services/AuthService'
import * as apps from '../../services/RancherService'
import * as shell from '../../services/RancherService'
import * as excluster from '../../services/ExClusterService'
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'

export default {
  name: 'AppRecord',
  data () {
    return {
      workLoadList: [],
      appId: this.$route.params.appId,
      appName: this.$route.params.appname,
      poolId: this.$route.params.projectId,
      podName: '',
      Base64: require('js-base64').Base64,
      DefaultCommand: [
        '/bin/sh',
        '-c',
        'TERM=xterm-256color; export TERM; [ -x /bin/bash ] && ([ -x /usr/bin/script ] && /usr/bin/script -q -c "/bin/bash" /dev/null || exec /bin/bash) || exec /bin/sh'
      ],
      dialogTableVisible: false,
      websocket: null
    }
  },
  methods: {
    getWorkLoads () {
      this.workLoadList = []
      apps
        .appInstanceWorkLoads(auth.getCurLang(), this.$route.params.appId)
        .then(respData => {
          let dataList = []
          if (respData.data.data) {
            dataList = respData.data.data.records
          }

          dataList.forEach((item, index) => {
            let object = {}
            object['wid'] = item.id
            object['status'] = item.state
            object['name'] = item.name
            JSON.parse(item.containers).forEach((item1, index) => {
              if (item1.hasOwnProperty('environment')) {
                object['image'] = item1.image
              }
            })

            const endpoints = JSON.parse(item.publicEndpoints)
            let links = ""
            if(endpoints){
              endpoints.map(epitem=>{
                links += `<a href='${epitem.addresses[0]}:${epitem.port}' title="${epitem.addresses[0]}:${epitem.port}"> ${epitem.port}/${epitem.protocol.toLowerCase()} </a>`
              })
            }
            object['links'] = links
            object['scale'] = item.scale
            this.workLoadList.push(object)
          })
        })
    },
    ConncetContainer (url) {
      this.websocket = new WebSocket(url, 'base64.channel.k8s.io')
      this.websocket.onopen = () => {
        Terminal.applyAddon(fit)
        var term = new Terminal({
          cursorBlink: true,
          useStyle: true,
          fontSize: 14
        })

        term.on('data', data => {
          this.websocket.send(`0${this.Base64.encode(data)}`)
        })

        term.open(document.getElementById('xterm'))

        term.fit()
        term.focus()

        this.websocket.onmessage = message => {
          const data = message.data.slice(1)

          switch (message.data[0]) {
            case '1':
            case '2':
            case '3':
              term.write(this.Base64.decode(data).toString())
              break
          }
        }
      }
    },
    closeConnect () {
      if (this.websocket) {
        this.websocket.close()
        this.websocket = null
      }
      this.dialogTableVisible = false
      document.getElementById('xterm').innerHTML = ''
    },
    innerBuildUrl (baseUrl) {
      this.DefaultCommand.forEach(c => {
        baseUrl += `&command=${encodeURIComponent(c)}`
      })
      return baseUrl
    },

    touchCluster () {
      let date = new Date()
      date.setTime(date.getTime() - 10000)
      document.cookie = 'CSRF = ; expires=' + date.toGMTString()

      // excluster.rancherLogin(this.rancherCode, loginInfo) // <--localtest ---
      shell.rancherLoginWorkload(auth.getCurLang(), this.poolId, this.appId)
        .then(respData => {
          const authdata = respData.data
          // if (1 === 1) { // <--localtest ---
          if (authdata.success) {
            // console.log(authdata)
            document.cookie = 'CSRF = '
            // document.cookie = 'R_SESS=' + authdata.token // <--localtest ---
            document.cookie = 'R_SESS=' + authdata.data.token
          } else {
            this.$message({
              showClose: true,
              message: authdata.errMsg,
              type: 'error'
            })
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: err,
            type: 'error',
            duration: 4000
          })
        })
    },
    workloadAction (wid, podName, type) {
      this.podName = podName
      shell.rancherWorkloadWebsocket(auth.getCurLang(), wid)
        .then(respData => {
          let data = respData.data
          if (data.success) {
            if (type === 'execute') {
              const wssproxy = this.$store.state.rancherWssProxyUrl

              // const baseUrl = wssproxy + this.rancherCode + podurl.slice(podurl.indexOf('/k8s'))
              const baseUrl = wssproxy + data.data /// 正式的地址

              let url = this.innerBuildUrl(baseUrl)
              this.dialogTableVisible = true
              this.ConncetContainer(url)
            } else {
              this.$message({
                showClose: true,
                message: 'Success.',
                type: 'success'
              })
              this.getWorkLoads()
            }
          } else {
            this.$message({
              showClose: true,
              message: data.errMsg,
              type: 'error'
            })
          }
        }).catch(err => {
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          })
        })
    },
    execPod (wid, type) {
      this.workloadAction(wid, type)
    }
  },
  created () {
    this.getWorkLoads()
    this.touchCluster()
  }
}
</script>

<style lang="scss" scoped>
.appRecord {
  height: 100%;
  min-width: 1130px;
  background: #000;
  border-radius: 2px;
  .title-left {
    /*width : 70%;*/
    float:left;
    h2{
      margin:0;
      font-size:20px;
    }
    .protip{
      color: #79c8ce;
    }
  }
  .title-rigth {
    width : 26%;
    float:right;
    text-align: right;
    padding-left:28px;
  }
  .el-dialog {
    background-color: #ccc !important;
  }
  #xterm{
    height: 550px;
    .terminal {
      height:650px;
    }
  }
  .xterm-screen{
    height: 567px;
  }
  .recordHead {
    background: #161618;
    border-radius: 2px;
    height: 50px;
    margin: 2px 2px 0;
    .title {
        height: 50px;
      h1 {
        font-family: Source-Sans-Pro-Bold;
        font-size: 16px;
        color: #A2A6B0;
        line-height: 50px;
        margin: 0;
        padding: 0;
        padding-left: 30px;
        cursor: pointer;
        i {
          font-size: 26px;
          margin-right: 10px;
        }
      }
    }
    // p {
    //   font-family: Source-Sans-Pro-Bold;
    //   font-size: 16px;
    //   color: #8eb357;
    //   text-align: center;
    //   line-height: 50px;
    // }
  }
  .recordBox {
    min-height: 630px;
    min-width: 1130px;
    margin: 2px;
    background: #161618;
    border-radius: 2px;
    overflow: hidden;
    padding: 30px;
    .table-head {
      color: #A2A6B0;
      font-weight: 500;
      font-size: 16px;
      margin: 0;
      padding: 0;
      i {
        font-size: 23px;
      }
    }
    .overflow {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
    // .el-col {
    //   display: flex;
    //   .el-button {
    //     background: #8eb357;
    //     border: none;
    //     margin: 0 20px;
    //   }
    //   .el-select {
    //     margin-left: 20px;
    //   }
    //   span {
    //     color: rgba(0, 0, 0, 0.25);
    //     line-height: 40px;
    //   }
    //   .time {
    //     font-size: 16px;
    //     color: rgba(0, 0, 0, 0.65);
    //     text-align: left;
    //     line-height: 40px;
    //     width: 180px;
    //     padding: 0 20px;
    //   }
    // }
    .blue-box {
      .el-table {
        color: #A2A6B0;
        background-color: rgba(101, 143, 247, 0);
      }
      .el-table /deep/ tr:hover td {
        background: rgba(176, 192, 255, 0.05) !important;
      }
      .el-table /deep/ th,
      .el-table /deep/ tr {
        background-color: rgba(101, 143, 247, 0);
        border: none;
      }
      .el-table /deep/ td {
        border: none;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
    .transaction-foot {
      margin-top: 30px;
      .el-pagination {
        height: 50px;
      }
    }
  }
}
</style>
