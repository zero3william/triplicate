<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="6">
        <div class="mb">請選擇發票種類</div>
        <el-select v-model="invoiceType">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <div class="mb">請輸入公司名稱或統編號碼</div>
        <el-input v-model="buyerTaxId"></el-input>
      </el-col>
      <el-col :span="7">
        <div class="mb">請選擇想查詢的時間區間</div>
        <el-date-picker v-model="issueDay" type="month"></el-date-picker>
      </el-col>
    </el-row>

    <el-table :data="invoiceList" :height="tableHeight" stripe empty-text="查無資料">
      <el-table-column type="index" align="center" width="60"></el-table-column>
      <el-table-column
        v-for="col in columns"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :width="col.width"
        align="center"
      ></el-table-column>
      <el-table-column fixed="right" width="56" align="center">
        <template slot="header" slot-scope="scope">細節</template>
        <template slot-scope="scope">
          <i class="el-icon-zoom-in modalBtn" @click="modalDetail()"></i>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="70" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="deleteInvoice()" size="small">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: 540,
      columns: [
        { label: '建立時間', width: 160, id: 'issueDay' },
        { label: '發票種類', id: 'invoiceType' },
        { label: '公司名稱', id: 'buyerName' },
        { label: '內容', id: '' },
        { label: '總金額', id: 'totalAmount' }
      ],
      options: [
        {
          value: 2,
          label: '三聯式發票'
        },
        {
          value: 3,
          label: '二聯式發票'
        }
      ],
      invoiceType: 2,
      buyerTaxId: '',
      issueDay: '',
      invoiceList: []
    }
  },
  methods: {
    modalDetail() {
      console.log('detail')
    },
    deleteInvoice() {
      console.log('delete')
    }
  },
  mounted() {
    if (this.$store.state.userinfo) {
      this.$api
        .fetchInvoice({ id: this.$store.state.userinfo.id })
        .then(resp => {
          this.invoiceList = resp.data[0].invoiceSummary
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.mb {
  margin-bottom: 1rem;
}
.modalBtn {
  cursor: pointer;
  font-size: 20px;
  &:hover {
    color: #409eff;
  }
}
</style>
