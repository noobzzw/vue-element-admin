<template>
  <div id="app">
    <el-tag class="select-engine">选择查询引擎</el-tag>
    <el-select v-model="value">
      <el-option
        v-for="engine in executionEngine"
        :key="engine"
        :label="engine"
        :value="engine"
      />
    </el-select>
    <div class="sql-box">
      <SqlEditor
        ref="sqleditor"
        :value="basicInfoForm.sqlMain"
        @changeTextarea="changeTextarea($event)"
      />
    </div>
    <el-button
      type="primary"
      size="small"
      class="sql-btn"
      @click="formaterSql(basicInfoForm.sqlMain)"
    >格式化sql
    </el-button>
    <el-button
      type="primary"
      size="small"
      class="sql-btn"
      @click="submmitSql(basicInfoForm.sqlMain)"
    >提交sql
    </el-button>
  </div>
</template>

<script>
import sqlFormatter from 'sql-formatter'
import SqlEditor from '@/components/SqlEditor'

// const jsonData = '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]'
const sqlData = 'select * from t_table'
export default {
  name: 'SqlEditorDemo',
  components: { SqlEditor },
  data() {
    return {
      basicInfoForm: {
        sqlMain: sqlData
      },
      executionEngine: ['Spark Sql', 'Hive Sql'],
      value: ''
    }
  },
  methods: {
    changeTextarea(val) {
      this.$set(this.basicInfoForm, 'sqlMain', val)
    },
    formaterSql(val) {
      const dom = this.$refs.sqleditor
      dom.editor.setValue(sqlFormatter.format(dom.editor.getValue()))
    },
    // 提交sql至后端查询
    submmitSql(val) {
      const dom = this.$refs.sqleditor
      dom.editor.setValue(sqlFormatter.format(dom.editor.getValue()))
    }
  }
}
</script>

<style>
.sql-box {
  width:100%;
  border: 1px solid #ddd;
  font-size: 15px;
}
.sql-btn{
  margin-top: 20px;
}
.select-engine {
  margin-right: 20px;
}
</style>

