<template>
  <div
    v-loading.fullscreen="loading"
    element-loading-text="查詢中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-input
      class="search-bar"
      placeholder="请输入公司名稱或統編號碼"
      v-model="input"
      @keyup.enter.native="search"
    >
      <template slot="append">
        <el-button type="primary" @click="search">搜尋</el-button>
      </template>
    </el-input>

    <el-table :data="list" :height="tableHeight" stripe empty-text="查無資料">
      <el-table-column type="index" align="center" width="80"></el-table-column>
      <el-table-column
        v-for="col in columns"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :width="col.width"
        align="center"
      ></el-table-column>
      <el-table-column fixed="right" width="160" align="center">
        <template slot-scope="scope">
          <el-button @click="toTriplicate(scope.row)" type="text" size="small">複製</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TaxCodeSeacher',
  methods: {
    toTriplicate(data) {
      this.$router.push({
        name: 'index',
        params: {
          taxCode: data.Business_Accounting_NO,
          buyer: data.Company_Name,
          address: data.Company_Location
        }
      })
    },
    search() {
      this.loading = true
      this.$api.getCompanyCodeList(this.input).then(resp => {
        if (resp.data && resp.data.length > 0) {
          this.list = resp.data
        } else {
          this.$message({
            message: '查無資料',
            type: 'warning'
          })
        }
        this.loading = false
      })
    }
  },
  computed: {},
  watch: {},
  data() {
    return {
      tableHeight: 540,
      loading: false,
      input: '',
      list: [],
      columns: [
        { label: '統一編號', width: 220, id: 'Business_Accounting_NO' },
        { label: '公司名稱', id: 'Company_Name' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  margin-bottom: 30px;
}
</style>


