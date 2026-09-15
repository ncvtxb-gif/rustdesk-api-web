<template>
  <div class="user-page">
    <div class="page-toolbar">
      <div class="page-toolbar-search">
        <el-input v-model="listQuery.username" :placeholder="T('Username')" clearable class="search-input">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="handlerQuery">{{ T('Filter') }}</el-button>
      </div>
      <div class="page-toolbar-actions">
        <el-button @click="toExport">{{ T('Export') }}</el-button>
        <el-button type="danger" @click="toAdd">{{ T('Add') }}</el-button>
      </div>
    </div>
    <div class="page-table">
      <el-table :data="listRes.list" v-loading="listRes.loading" stripe>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="username" :label="T('Username')" align="center"/>
        <el-table-column prop="email" :label="T('Email')" align="center"/>
        <el-table-column prop="nickname" :label="T('Nickname')" align="center"/>
        <el-table-column :label="T('Group')" align="center">
          <template #default="{row}">
            <span v-if="row.group_id"> <el-tag size="small">{{ listRes.groups?.find(g => g.id === row.group_id)?.name }} </el-tag> </span>
            <span v-else> - </span>
          </template>
        </el-table-column>
        <el-table-column :label="T('Status')" align="center">
          <template #default="{row}">
            <el-switch v-model="row.status"
                       :active-value="ENABLE_STATUS"
                       :inactive-value="DISABLE_STATUS"
                       @change="changeStatus(row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="T('Remark')" align="center"/>
        <el-table-column prop="created_at" :label="T('CreatedAt')" align="center"/>
        <el-table-column prop="updated_at" :label="T('UpdatedAt')" align="center"/>
        <el-table-column :label="T('Actions')" align="center" width="420">
          <template #default="{row}">
            <el-button size="small" @click="toTag(row)">{{ T('UserTags') }}</el-button>
            <el-button size="small" @click="toAddressBook(row)">{{ T('UserAddressBook') }}</el-button>
            <el-button size="small" @click="toEdit(row)">{{ T('Edit') }}</el-button>
            <el-button size="small" type="warning" @click="changePass(row)">{{ T('ResetPassword') }}</el-button>
            <el-button size="small" type="danger" @click="remove(row)">{{ T('Delete') }}</el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty :description="T('NoData')" />
        </template>
      </el-table>
    </div>
    <div class="page-footer">
      <el-pagination background
                     layout="prev, pager, next, sizes, jumper"
                     :page-sizes="[10,20,50,100]"
                     v-model:page-size="listQuery.page_size"
                     v-model:current-page="listQuery.page"
                     :total="listRes.total">
      </el-pagination>
    </div>
  </div>
</template>

<script setup>
  import { useRepositories, useDel, useToEditOrAdd, useChangePwd } from '@/views/user/composables'
  import { T } from '@/utils/i18n'
  import { DISABLE_STATUS, ENABLE_STATUS } from '@/utils/common_options'
  import { update } from '@/api/user'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { onMounted, watch } from 'vue'
  import { Search } from '@element-plus/icons'
  //列表
  const {
    listRes,
    listQuery,
    handlerQuery,
    getList,
    getGroups,
    toExport,
  } = useRepositories()

  onMounted(getGroups)

  onMounted(getList)

  watch(() => listQuery.page, getList)
  watch(() => listQuery.page_size, handlerQuery)

  const { toEdit, toAdd, toAddressBook, toTag } = useToEditOrAdd()

  const { changePass } = useChangePwd()

  //删除
  const { del } = useDel()
  const remove = async (row) => {
    const res = await del(row.id)
    if (res) {
      getList(listQuery)
    }
  }

  const changeStatus = async (row) => {
    /*const confirm = await ElMessageBox.confirm(T('Confirm?', { param: T('Update') }), {
      confirmButtonText: T('Confirm'),
      cancelButtonText: T('Cancel'),
    }).catch(_ => false)
    if (!confirm) {
      return false
    }*/
    const res = await update(row).catch(_ => false)
    if (res) {
      ElMessage.success(T('OperationSuccess'))
      getList(listQuery)
    }
  }

</script>

<style scoped lang="scss">
.user-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.page-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 12px;
  padding: 16px 20px;

  .page-toolbar-search {
    display: flex;
    align-items: center;
    gap: 10px;

    .search-input {
      width: 240px;
    }
  }

  .page-toolbar-actions {
    display: flex;
    gap: 10px;
  }
}

.page-table {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.page-footer {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 900px) {
  .page-toolbar,
  .page-toolbar-search,
  .page-toolbar-actions {
    flex-wrap: wrap;
  }

  .page-toolbar {
    align-items: flex-start;
    gap: 12px;
  }

  .page-toolbar-search .search-input {
    width: min(240px, 100%);
  }

  .page-table {
    overflow-x: auto;
  }
}
</style>
