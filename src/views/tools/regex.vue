<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="正则表达式">
                <el-input v-model="form.regex"/>
            </el-form-item>
            <el-form-item label="匹配字符串">
                <el-input type="textarea" :rows="5" v-model="form.pattern"/>
            </el-form-item>
            <el-form-item label="正则可视化">
                <div id="regexsvg"></div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
/* eslint-disable */
/* tslint:disable */
// @ts-ignore
import * as regulex from 'jetiny-regulex/dist/regulex.umd.js';

@Component
export default class Form extends Vue {
    form = {
        regex: "", // 正则表达式
        pattern: "" // 待匹配字符串
    };
    regex = {
        parse: regulex.parse,
        visualize: regulex.visualize,
        paper: null
    };
    getRegexFlags(re: RegExp) {
        let flags = "";
        flags += re.ignoreCase ? "i" : "";
        flags += re.global ? "g" : "";
        flags += re.multiline ? "m" : "";
        return flags;
    }

    @Watch("form.regex")
    watchRegex(newVal: string, oldVal: string) {
        this.repaintRegex();
    }
    //重新绘制正则表达式
    repaintRegex() {
        const re = new RegExp(this.form.regex, "");
        try {
            const tree = this.regex.parse(re.source);
            this.regex.visualize(tree, this.getRegexFlags(re), this.regex.paper);
        } catch (e) {
            if (e instanceof this.regex.parse.RegexSyntaxError) {
                // logError(re,e);
            } else {
                throw e;
            }
        }
    }

    mounted() {
        const regexSvg = document.getElementById("regexsvg");
        this.regex.paper = regulex.raphael(regexSvg, 0, 0);
    }
}
</script>

<style scoped>
#regexsvg {
    position: relative;
    left: -0.5px;
}
</style>

