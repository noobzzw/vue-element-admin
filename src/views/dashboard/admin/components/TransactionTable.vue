<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="任务名称" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.job_context | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="任务类型" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.job_type }}
      </template>
    </el-table-column>
    <el-table-column label="调度时间" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.etl_date }}
      </template>
    </el-table-column>
    <el-table-column label="进度" width="195" align="center">
      <template slot-scope="scope">
        <el-progress :percentage="parseInt(scope.row.process)" />
      </template>
    </el-table-column>
    <el-table-column label="当前状态" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        finish: 'success',
        error: 'danger',
        killed: 'warning',
        etl: 'info'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList().then(response => {
        // this.list = response.data.items.slice(0, 8)
        this.list = response.data
      })
    }
  }
}
</script>
