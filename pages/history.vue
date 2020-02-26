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
        <el-date-picker v-model="issueDate" type="month" value-format="yyyy-MM"></el-date-picker>
      </el-col>
    </el-row>

    <br />

    <el-table :data="filterInvoiceList" :height="tableHeight" stripe empty-text="查無資料">
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
        <template slot="header">細節</template>
        <template slot-scope="scope">
          <i class="el-icon-zoom-in modalBtn" @click="modalDetail(scope.row)"></i>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="70" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="deleteInvoice(scope.row)" size="small">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="發票細節" :visible.sync="showDetail" width="900px">
      <InvoiceDetail v-if="showDetail" :detail="detailData" />
      <br />
    </el-dialog>
  </div>
</template>

<script>
import InvoiceDetail from '../components/InvoiceDetail'

export default {
  components: {
    InvoiceDetail
  },
  computed: {
    filterInvoiceList() {
      return this.invoiceList
        .filter(invoice =>
          this.invoiceType === 1
            ? true
            : invoice.invoiceType === this.invoiceType
        )
        .filter(invoice =>
          this.buyerTaxId === ''
            ? true
            : invoice.buyerTaxId.includes(this.buyerTaxId)
        )
        .filter(invoice =>
          this.issueDate === null
            ? true
            : invoice.issueDay.includes(this.issueDate)
        )
    }
  },
  data() {
    return {
      showDetail: false,
      detailData: null,
      tableHeight: 540,
      columns: [
        { label: '建立時間', width: 100, id: 'issueDate' },
        { label: '發票種類', width: 90, id: 'invoiceCategory' },
        { label: '公司名稱', id: 'buyerName' },
        { label: '內容', id: 'content' },
        { label: '總金額', width: 100, id: 'totalAmount' }
      ],
      options: [
        {
          value: 1,
          label: '全部種類'
        },
        {
          value: 3,
          label: '三聯式發票'
        },
        {
          value: 2,
          label: '二聯式發票'
        }
      ],
      invoiceType: 1,
      buyerTaxId: '',
      issueDate: '',
      invoiceList: []
    }
  },
  methods: {
    modalDetail(detail) {
      this.detailData = detail
      this.showDetail = true
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
          this.invoiceList = resp.data[0].invoiceSummary.map(invoice => {
            return {
              ...invoice,
              issueDate: invoice.issueDay.split(' ')[0],
              invoiceCategory: invoice.invoiceType === 2 ? '二聯式' : '三聯式',
              content: invoice.invoiceDetail
                .map(item => item.itemName)
                .join(' , ')
            }
          })
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
