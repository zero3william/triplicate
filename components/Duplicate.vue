<template>
  <div
    class="invoice-contaner"
    v-loading.fullscreen="loading"
    element-loading-text="處理中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-button type="info" plain @click="reset" style="float:right;">清空重填</el-button>

    <div class="title text-center">
      <span>統一發票</span>
      <span>(二聯式)</span>
    </div>
    <div class="subtitle text-center">
      <span>{{titleYear}}</span>
      年
      <span>{{titleMonth}}</span>
      月份
    </div>
    <table class="basic-info">
      <tr>
        <td>
          <div>
            <span>買</span>
            <span>受</span>
            <span>人</span>
          </div>
        </td>
        <td>
          <input type="text" v-model="buyer" style="width:210px;" />
        </td>
        <td>
          中華民國
          <input type="text" style="width:40px;" v-model="date.year" /> 年
          <input type="text" style="width:40px;" v-model="date.month" /> 月
          <input type="text" style="width:40px;" v-model="date.day" /> 日
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>

    <table id="form">
      <tbody>
        <tr>
          <td class="item-title">
            <span class="ls ls-7">品名</span>
          </td>
          <td class="quantity-title">
            <span class="ls ls-1">數量</span>
          </td>
          <td class="price-title">
            <span class="ls ls-1">單價</span>
          </td>
          <td class="money-title">
            <span class="ls ls-4">金額</span>
          </td>
          <td class="memo-title">
            <span class="ls ls-7">備註</span>
          </td>
        </tr>
        <tr class="thin-border">
          <td>
            <input v-model="item1.name" />
          </td>
          <td>
            <input v-model="item1.num" @keyup="changeItem($event,1,'num')" />
          </td>
          <td>
            <input v-model="item1.price" @keyup="changeItem($event,1,'price')" />
          </td>
          <td>
            <input v-model="item1.total" @keyup="changeItem($event,1,'total')" />
          </td>
          <td rowspan="2">
            <textarea v-model="comment"></textarea>
          </td>
        </tr>
        <tr class="thin-border">
          <td>
            <input v-model="item2.name" />
          </td>
          <td>
            <input v-model="item2.num" @keyup="changeItem($event,2,'num')" />
          </td>
          <td>
            <input v-model="item2.price" @keyup="changeItem($event,2,'price')" />
          </td>
          <td>
            <input v-model="item2.total" @keyup="changeItem($event,2,'total')" />
          </td>
        </tr>
        <tr class="thin-border">
          <td>
            <input v-model="item3.name" />
          </td>
          <td>
            <input v-model="item3.num" @keyup="changeItem($event,3,'num')" />
          </td>
          <td>
            <input v-model="item3.price" @keyup="changeItem($event,3,'price')" />
          </td>
          <td>
            <input v-model="item3.total" @keyup="changeItem($event,3,'total')" />
          </td>
          <td>營業人蓋用統一發票專用章</td>
        </tr>
        <tr class="thin-border">
          <td>
            <input v-model="item4.name" />
          </td>
          <td>
            <input v-model="item4.num" @keyup="changeItem($event,4,'num')" />
          </td>
          <td>
            <input v-model="item4.price" @keyup="changeItem($event,4,'price')" />
          </td>
          <td>
            <input v-model="item4.total" @keyup="changeItem($event,4,'total')" />
          </td>
          <td rowspan="6">
            <span id="stamp">(發票章)</span>
          </td>
        </tr>
        <tr class="thin-border">
          <td>
            <input v-model="item5.name" />
          </td>
          <td>
            <input v-model="item5.num" @keyup="changeItem($event,5,'num')" />
          </td>
          <td>
            <input v-model="item5.price" @keyup="changeItem($event,5,'price')" />
          </td>
          <td>
            <input v-model="item5.total" @keyup="changeItem($event,5,'total')" />
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <span class="ls ls-4">銷售額合計</span>
          </td>
          <td>
            <input v-model="writePrice" @keyup="totalChange()" />
          </td>
        </tr>
        <tr>
          <td colspan="3" id="options-td">
            <table id="options">
              <tbody>
                <tr>
                  <td
                    class="options-title no-border-left no-border-top no-border-bottom"
                    rowspan="2"
                  >
                    <span class="ls ls-2">營業稅</span>
                  </td>
                  <td class="option-title no-border-top">
                    <span class="ls ls-1">應稅</span>
                  </td>
                  <td class="option-title no-border-top">零稅率</td>
                  <td class="option-title no-border-top no-border-right">
                    <span class="ls ls-1">免稅</span>
                  </td>
                </tr>

                <tr>
                  <td class="option-field no-border-bottom">
                    <el-checkbox
                      id="taxType1"
                      v-model="taxType1"
                      @change="taxChange($event,'taxType1')"
                    ></el-checkbox>
                  </td>
                  <td class="option-field no-border-bottom">
                    <el-checkbox
                      id="taxType2"
                      v-model="taxType2"
                      @change="taxChange($event,'taxType2')"
                    ></el-checkbox>
                  </td>
                  <td class="option-field no-border-bottom no-border-right">
                    <el-checkbox
                      id="taxType3"
                      v-model="taxType3"
                      @change="taxChange($event,'taxType3')"
                    ></el-checkbox>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <span>{{writeTax}}</span>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <span class="ls ls-17">總計</span>
          </td>
          <td>
            <input v-model="writeTotal" @keyup="totalChange" />
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <div id="total-big">
              <div>總計新臺幣</div>
              <div>(中文大寫)</div>
            </div>
            <div id="total-big-field">
              <span>{{totalBig[8]}}</span>
              <i id="u9">億</i>
              <span>{{totalBig[7]}}</span>
              <i id="u8">仟</i>
              <span>{{totalBig[6]}}</span>
              <i id="u7">佰</i>
              <span>{{totalBig[5]}}</span>
              <i id="u6">拾</i>
              <span>{{totalBig[4]}}</span>
              <i id="u5">萬</i>
              <span>{{totalBig[3]}}</span>
              <i id="u4">仟</i>
              <span>{{totalBig[2]}}</span>
              <i id="u3">佰</i>
              <span>{{totalBig[1]}}</span>
              <i id="u2">拾</i>
              <span>{{totalBig[0]}}</span>
              <i id="u1">元</i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <el-row type="flex" justify="center">
      <el-button
        class="save-btn"
        v-if="$store.state.isLogin"
        type="success"
        round
        @click="saveInvoice"
      >儲存此張發票</el-button>
    </el-row>

    <el-dialog title="查詢結果" :visible.sync="dialogVisible" width="700px">
      <el-table :data="list" :height="tableHeight" stripe>
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
            <el-button @click="selectBuyer(scope.row)" type="text" size="small">複製</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Duplicate',
  methods: {
    saveInvoice() {
      this.loading = true
      const items = [this.item1, this.item2, this.item3, this.item4, this.item5]
        .filter(item => item.total !== '')
        .map(item => {
          return {
            itemName: item.name,
            quantity: item.num,
            price: item.price,
            amount: item.total
          }
        })
      let d = new Date(
        Date.UTC(this.date.year + 1911, this.date.month - 1, this.date.day)
      )

      let params = {
        buyerName: this.buyer,
        buyerTaxId: this.taxCode,
        issueDay: d.toISOString(),
        comment: this.comment,
        invoiceType: 2,
        taxType:
          this.taxType1 === true
            ? Math.round(this.$store.state.taxRate * 100)
            : 0,
        subTotal:
          typeof this.writePrice === Number
            ? this.writePrice
            : parseInt(this.writePrice),
        taxAmount: this.writeTax,
        totalAmount:
          typeof this.writeTotal === Number
            ? this.writeTotal
            : parseInt(this.writeTotal),
        userId: this.$store.state.userinfo.id,
        invoiceDetail: items
      }
      this.$api
        .addInvoice(params)
        .then(resp => {
          this.$message.success({
            dangerouslyUseHTMLString: true,
            message: '儲存成功!<br>可至歷程紀錄查看'
          })
          this.reset()
          this.loading = false
        })
        .catch(err => {
          this.$message.error({
            message: '儲存失敗'
          })
          this.loading = false
        })
    },
    changeItem(event, num, key) {
      if (event.key === 'Tab') {
        return
      }
      this[`item${num}`][key] = this[`item${num}`][key]
        ? parseInt(this[`item${num}`][key])
        : ''
      switch (key) {
        case 'num':
          if (this[`item${num}`]['price'] > 0) {
            this[`item${num}`]['total'] =
              this[`item${num}`]['num'] * this[`item${num}`]['price']
          }
          break
        case 'price':
          if (this[`item${num}`]['num'] > 0) {
            this[`item${num}`]['total'] =
              this[`item${num}`]['num'] * this[`item${num}`]['price']
          }
          break
        case 'total':
          this[`item${num}`]['num'] = 1
          this[`item${num}`]['price'] = this[`item${num}`]['total']
          break
      }
      this.writePrice =
        this.item1.total +
        this.item2.total +
        this.item3.total +
        this.item4.total +
        this.item5.total
    },
    toChineseNum(num) {
      switch (parseInt(num)) {
        case 1:
          return '壹'
        case 2:
          return '貳'
        case 3:
          return '參'
        case 4:
          return '肆'
        case 5:
          return '伍'
        case 6:
          return '陸'
        case 7:
          return '柒'
        case 8:
          return '捌'
        case 9:
          return '玖'
        case 0:
          return '零'
      }
    },
    toChineseNum2(num) {
      switch (parseInt(num)) {
        case 1:
          return '一'
        case 2:
          return '二'
        case 3:
          return '三'
        case 4:
          return '四'
        case 5:
          return '五'
        case 6:
          return '六'
        case 7:
          return '七'
        case 8:
          return '八'
        case 9:
          return '九'
        case 0:
          return '〇'
      }
    },
    toChineseNum3(num) {
      switch (parseInt(num)) {
        case 1:
        case 2:
          return '一、二'
        case 3:
        case 4:
          return '三、四'
        case 5:
        case 6:
          return '五、六'
        case 7:
        case 8:
          return '七、八'
        case 9:
        case 10:
          return '九、十'
        case 11:
        case 12:
          return '十一、十二'
      }
    },
    taxChange(checked, target) {
      if (checked) {
        this.taxType1 = false
        this.taxType2 = false
        this.taxType3 = false
      }
      this[target] = true

      if (this.taxType1) {
        this.writeTotal = this.writePrice + this.writeTax
      } else {
        this.writeTotal = this.writePrice
      }
    },
    totalChange(e) {
      this.clearItems()
      if (parseInt(this.writeTotal) < 0) {
        this.writeTotal = ''
        this.writePrice = ''
        return
      }
      if (parseInt(this.writeTotal) > 999999999) {
        this.writeTotal = 999999999
      }
      if (this.taxType1) {
        this.writePrice = Math.round(
          this.writeTotal / (1 + this.$store.state.taxRate)
        )
      } else {
        this.writePrice = this.writeTotal
      }
      this.setFirstItem()
    },
    clearItems() {
      this.item1 = { name: this.item1.name, num: '', price: '', total: '' }
      this.item2 = { name: '', num: '', price: '', total: '' }
      this.item3 = { name: '', num: '', price: '', total: '' }
      this.item4 = { name: '', num: '', price: '', total: '' }
      this.item5 = { name: '', num: '', price: '', total: '' }
    },
    setFirstItem() {
      this.item1 = {
        name: this.item1.name,
        num: 1,
        price: this.writePrice,
        total: this.writePrice
      }
    },
    reset() {
      this.buyer = ''
      this.taxCode = ''
      this.address = ''
      this.comment = ''
      this.taxType1 = true
      this.taxType2 = false
      this.taxType3 = false
      this.writePrice = ''
      this.item1 = { name: '', num: '', price: '', total: '' }
      this.item2 = { name: '', num: '', price: '', total: '' }
      this.item3 = { name: '', num: '', price: '', total: '' }
      this.item4 = { name: '', num: '', price: '', total: '' }
      this.item5 = { name: '', num: '', price: '', total: '' }
    }
  },
  computed: {
    writeTax() {
      if (this.taxType1) {
        return Math.round(this.writePrice * this.$store.state.taxRate)
      } else {
        return 0
      }
    },
    titleYear() {
      const strArr = this.date.year.toString().split('')
      for (let i = 0; i < strArr.length; i++) {
        strArr[i] = this.toChineseNum2(strArr[i])
      }
      return strArr.join('')
    },
    titleMonth() {
      return this.toChineseNum3(this.date.month)
    }
  },
  watch: {
    writePrice: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue && parseInt(newValue) > 0) {
          this.writeTotal = parseInt(newValue) + parseInt(this.writeTax)
        } else {
          this.clearItems()
          this.writePrice = ''
          this.writeTotal = 0
        }
      }
    },
    writeTotal: {
      immediate: true,
      handler(newValue, oldValue) {
        const strArr = newValue
          .toString()
          .split('')
          .reverse()
        this.totalBig = this.totalBig.map(item => '-')
        for (let i = 0; i < strArr.length; i++) {
          this.totalBig[i] = this.toChineseNum(strArr[i])
        }
      }
    }
  },
  data() {
    return {
      comment: '',
      buyer: '',
      taxCode: '',
      address: '',
      taxType1: true,
      taxType2: false,
      taxType3: false,
      writePrice: '',
      writeTotal: '',
      item1: { name: '', num: '', price: '', total: '' },
      item2: { name: '', num: '', price: '', total: '' },
      item3: { name: '', num: '', price: '', total: '' },
      item4: { name: '', num: '', price: '', total: '' },
      item5: { name: '', num: '', price: '', total: '' },
      totalBig: new Array(9).fill('-', 0),
      date: { year: '', month: '', day: '' },
      loading: false,
      dialogVisible: false,
      list: [],
      columns: [
        { label: '統一編號', width: 160, id: 'Business_Accounting_NO' },
        { label: '公司名稱', id: 'Company_Name' }
      ],
      tableHeight: 560
    }
  },
  mounted() {
    let d = new Date()
    this.date.year = d.getFullYear() - 1911
    this.date.month = d.getMonth() + 1
    this.date.day = d.getDate()
  }
}
</script>

<style lang="scss" scoped>
.save-btn {
  margin-top: 4rem;
  color: #fff !important;
  border: none !important;
  padding: 1rem 2rem !important;
  font-size: 1.8rem;
}
.invoice-contaner {
  font-family: '標楷體', DFKai-sb, BiauKai;
  font-size: 1.2rem;
  font-weight: bold;
  position: relative;
  padding: 1rem 2rem;
  max-width: 800px;
  min-width: 680px;
  margin: 0 auto;
  &:after {
    content: '';
    background-image: url('/invoice/invoiceBg.png');
    height: 430px;
    opacity: 0.1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    span {
      &:nth-child(1) {
        letter-spacing: 3.5rem;
        margin-right: -3rem;
      }
      &:nth-child(2) {
        letter-spacing: 0.5rem;
      }
    }
  }
  .subtitle {
    font-family: '微軟正黑體', '微软雅黑', 'メイリオ', '맑은 고딕', sans-serif;
    font-size: 1.2rem;
    letter-spacing: 3px;
    margin-bottom: 1rem;
  }
  .basic-info {
    width: 100%;
    td {
      line-height: 2.2rem;
      vertical-align: middle;
      &:first-child {
        width: 100px;
        padding-right: 26px;
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          &:after {
            content: '：';
            position: absolute;
            right: -20px;
            top: 2px;
          }
        }
      }
      &:nth-child(2) {
        width: auto;
      }
      &:nth-child(3) {
        padding-left: 20px;
      }
    }
  }
  input {
    position: relative;
    z-index: 1;
    height: 24px;
    text-align: center;
  }
  textarea {
    height: 45px;
    width: 100%;
    position: relative;
    resize: none;
    z-index: 1;
    top: 3px;
  }
  button {
    position: relative;
    z-index: 1;
    color: #000;
    border: 1px solid #999;
    padding: 5px 9px;
  }
}

#form,
#options {
  width: 100%;
  text-align: center;
  max-width: 100%;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
  input {
    width: 100%;
  }
}
#options-td {
  padding: 0;
}
#form td {
  border: 2px solid #4d4d00;
  line-height: 19px;
  height: 21px;
}
#form .thin-border td {
  border-top: 1px solid #4d4d00;
  border-bottom: 1px solid #4d4d00;
}
#form td .no-border-top {
  border-top-width: 0;
}
#form td .no-border-bottom {
  border-bottom-width: 0;
}
#form td .no-border-left {
  border-left-width: 0;
}
#form td .no-border-right {
  border-right-width: 0;
}
#form .option-field,
#form .option-title {
  font-size: 12px;
  line-height: 16px;
  height: 14px;
  padding: 0;
}

.item-title {
  width: 27%;
}
.quantity-title {
  width: 11%;
}
.price-title {
  width: 11%;
}
.money-title {
  width: 19%;
}
.memo-title {
  width: 30%;
}

#total-big {
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  display: inline-block;
  float: left;
}
#total-big-field span {
  display: inline-block;
  width: 16px;
  padding-top: 2px;
  font-weight: bold;
  font-size: 1.6rem;
  color: #1854d4;
}
#total-big-field i {
  font-style: normal;
}
#item-name,
#item-one,
#stamp {
  display: none;
}

.write-money {
  width: 82%;
  height: 10px !important;
  margin: 0;
  margin-bottom: 0 !important;
  text-align: center;
}
.strikeout {
  text-decoration: line-through;
}

.ls {
  display: inline-block;
}
.ls-17 {
  letter-spacing: 17em;
  margin-right: -17em;
}
.ls-7 {
  letter-spacing: 7em;
  margin-right: -7em;
}
.ls-6 {
  letter-spacing: 6em;
  margin-right: -6em;
}
.ls-4 {
  letter-spacing: 4em;
  margin-right: -4em;
}
.ls-3 {
  letter-spacing: 3em;
  margin-right: -3em;
}
.ls-2 {
  letter-spacing: 2em;
  margin-right: -2em;
}
.ls-1 {
  letter-spacing: 1em;
  margin-right: -1em;
}
.el-checkbox {
  padding-top: 3px;
}
</style>


