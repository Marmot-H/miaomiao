<template>
    <div class="msgbox">
        <h2>{{title}}</h2>
        <p>{{content}}</p>
        <div>
            <div @click="handleCancel">{{cancel}}</div>
            <div @click="handleOk">{{ok}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        name : "MessageBox"
    }
</script>
<style scoped>
.msgbox { width:200px;height:120px;position: absolute;left: 50%;top: 50%;border:1px #cccccc solid;
    box-shadow: 3px 3px 3px 3px #ccc;background: white;border-radius: 4px;margin:-60px 0 0 -100px;text-align: center}
.msgbox h2 { line-height: 40px; font-size: 18px;}
.msgbox p {line-height: 40px}
.msgbox > div {display: flex ;position: absolute; bottom: 0; width:100%; border-top:1px #ccc solid;}
.msgbox > div div{ flex:1; text-align: center; line-height: 30px; border-right:1px #ccc solid;}
.msgbox > div div:last-child{ border:none;}
</style>