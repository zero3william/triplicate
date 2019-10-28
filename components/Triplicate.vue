<template>
  <div class="invoice-contaner">
    <div class="title text-center">
      <span>統一發票</span>
      <span>(三聯式)</span>
    </div>
    <div class="subtitle text-center">一〇八年九、十月份</div>
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
          <input type="text" v-model="name" />
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <div>
            <span>統</span>
            <span>一</span>
            <span>編</span>
            <span>號</span>
          </div>
        </td>
        <td>
          <el-button icon="el-icon-search" type="info" plain size="mini"></el-button>
        </td>
        <td>中華民國 xxx 年 x 月 xx 日</td>
      </tr>
      <tr>
        <td>
          <div>
            <span>地</span>
            <span>址</span>
          </div>
        </td>
        <td>台北市信義區忠孝東路4段331巷</td>
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
            <input v-model="item1.num" @keyup="changeItem(1,'num')" />
          </td>
          <td>
            <input v-model="item1.price" @keyup="changeItem(1,'price')" />
          </td>
          <td>
            <input v-model="item1.total" @keyup="changeItem(1,'total')" />
          </td>
          <td rowspan="2"></td>
        </tr>
        <tr class="thin-border">
          <td>
            <input v-model="item2.name" />
          </td>
          <td>
            <input v-model="item2.num" @keyup="changeItem(2,'num')" />
          </td>
          <td>
            <input v-model="item2.price" @keyup="changeItem(2,'price')" />
          </td>
          <td>
            <input v-model="item2.total" @keyup="changeItem(2,'total')" />
          </td>
        </tr>
        <tr class="thin-border">
          <td>
            <input v-model="item3.name" />
          </td>
          <td>
            <input v-model="item3.num" @keyup="changeItem(3,'num')" />
          </td>
          <td>
            <input v-model="item3.price" @keyup="changeItem(3,'price')" />
          </td>
          <td>
            <input v-model="item3.total" @keyup="changeItem(3,'total')" />
          </td>
          <td>營業人蓋用統一發票專用章</td>
        </tr>
        <tr class="thin-border">
          <td>
            <input v-model="item4.name" />
          </td>
          <td>
            <input v-model="item4.num" @keyup="changeItem(4,'num')" />
          </td>
          <td>
            <input v-model="item4.price" @keyup="changeItem(4,'price')" />
          </td>
          <td>
            <input v-model="item4.total" @keyup="changeItem(4,'total')" />
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
            <input v-model="item5.num" @keyup="changeItem(5,'num')" />
          </td>
          <td>
            <input v-model="item5.price" @keyup="changeItem(5,'price')" />
          </td>
          <td>
            <input v-model="item5.total" @keyup="changeItem(5,'total')" />
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
  </div>
</template>

<script>
export default {
  name: 'LinkBtn',
  props: {
    to: String,
    text: String
  },
  methods: {
    changeItem(num, key) {
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
          if (this[`item${num}`]['num'] > 0) {
            this[`item${num}`]['price'] =
              this[`item${num}`]['total'] / this[`item${num}`]['num']
          } else {
            this[`item${num}`]['num'] = 1
            this[`item${num}`]['price'] = this[`item${num}`]['total']
          }
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
    }
  },
  computed: {
    writeTax() {
      if (this.taxType1) {
        return Math.round(this.writePrice * this.$store.state.taxRate)
      } else {
        return 0
      }
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
        // this.totalBig = this.totalBig.map(item => '----')
        console.log(this.totalBig)
        for (let i = 0; i < strArr.length; i++) {
          this.totalBig[i] = this.toChineseNum(strArr[i])
        }
      }
    }
  },
  data() {
    return {
      name: '123',
      taxCode: '',
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
      totalBig: new Array(9).fill('-', 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-contaner {
  font-family: '標楷體', DFKai-sb, BiauKai;
  font-size: 1.2rem;
  font-weight: bold;
  position: relative;
  padding: 1rem;
  max-width: 720px;
  min-width: 680px;
  margin: 0 auto;
  &:after {
    content: '';
    background-image: url('/tw-bg.png');
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


