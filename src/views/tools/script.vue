<template>
    <div class="app-container">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="key" label="GUID" width="280"></el-table-column>
            <el-table-column prop="name" label="名称" width="180"></el-table-column>
            <el-table-column prop="scriptpath" label="脚本路径"></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ParamItem, ExcuteTemplate, ExcuteTemplateMgr } from '@/utils/excute.ts';
import { connect } from 'tls';

@Component
export default class Form extends Vue {
    tableData: Array<ExcuteTemplate> = [];

    onSubmit() {
        this.$message('submit!');
    }

    onCancel() {
        this.$message({
            message: 'cancel!',
            type: 'warning',
        });
    }

    mounted() {
        console.log('mounted');
        this.$socket.on('resp_get_script', (jsonScript: string) => {
            let obj: Array<object> = JSON.parse(jsonScript);
            obj.forEach((obj => {
                let script = new ExcuteTemplate();
                script.loadFromJson(obj);
                this.tableData.push(script);
            }));
            console.log(jsonScript);
        });
        this.$socket.emit('req_get_script');
    }
}
</script>

<style scoped>
.line {
    text-align: center;
}
</style>

